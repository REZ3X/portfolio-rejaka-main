import { NextResponse } from "next/server";
import { withRetry } from "@/lib/mongodb";
import { Db } from "mongodb";

interface SnaploveUptimeRecord {
  status: "UP" | "DOWN" | "ERROR";
  httpStatus?: number;
  responseTime?: number;
  message?: string;
  timestamp: Date;
  checkedAt: string;
}

interface SnaploveStats {
  currentStatus: "UP" | "DOWN" | "ERROR";
  uptime: number;
  avgResponseTime: number;
  totalChecks: number;
  upChecks: number;
  downChecks: number;
  errorChecks: number;
  lastCheck: SnaploveUptimeRecord;
  lastStatusChange: Date;
  statusChanges: number;
  history: SnaploveUptimeRecord[];
}

async function checkSnaploveHealth(): Promise<SnaploveUptimeRecord> {
  const SNAPLOVE_API = process.env.SNAPLOVE_BACKEND_API;

  if (!SNAPLOVE_API) {
    return {
      status: "ERROR",
      message: "SNAPLOVE_BACKEND_API not configured",
      timestamp: new Date(),
      checkedAt: new Date().toISOString(),
    };
  }

  const start = Date.now();

  try {
    const response = await fetch(SNAPLOVE_API, {
      method: "GET",
      headers: {
        "User-Agent": "Rejaka-Uptime-Monitor/1.0",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    const responseTime = Date.now() - start;

    return {
      status: response.ok ? "UP" : "DOWN",
      httpStatus: response.status,
      responseTime,
      timestamp: new Date(),
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    const responseTime = Date.now() - start;

    return {
      status: "ERROR",
      responseTime,
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date(),
      checkedAt: new Date().toISOString(),
    };
  }
}

async function getLastStoredStatus(
  db: Db
): Promise<SnaploveUptimeRecord | null> {
  try {
    const collection = db.collection("snaplove_uptime");
    const lastRecord = await collection.findOne(
      {},
      { sort: { timestamp: -1 } }
    );

    return lastRecord as SnaploveUptimeRecord | null;
  } catch (error) {
    console.error("Error getting last stored status:", error);
    return null;
  }
}

async function shouldStoreRecord(
  currentCheck: SnaploveUptimeRecord,
  lastStored: SnaploveUptimeRecord | null
): Promise<boolean> {
  if (!lastStored) {
    return true;
  }

  if (currentCheck.status !== lastStored.status) {
    return true;
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  if (lastStored.timestamp < oneHourAgo) {
    return true;
  }

  return false;
}

async function storeUptimeRecord(
  db: Db,
  record: SnaploveUptimeRecord
): Promise<void> {
  try {
    const collection = db.collection("snaplove_uptime");
    await collection.insertOne(record);

    const totalRecords = await collection.countDocuments();
    if (totalRecords > 100) {
      const recordsToDelete = totalRecords - 100;
      const oldRecords = await collection
        .find({})
        .sort({ timestamp: 1 })
        .limit(recordsToDelete)
        .toArray();

      const idsToDelete = oldRecords.map((r) => r._id);
      await collection.deleteMany({ _id: { $in: idsToDelete } });
    }
  } catch (error) {
    console.error("Error storing uptime record:", error);
    throw error;
  }
}

async function calculateStats(db: Db): Promise<SnaploveStats | null> {
  try {
    const collection = db.collection("snaplove_uptime");

    const allRecords = (await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray()) as SnaploveUptimeRecord[];

    if (allRecords.length === 0) {
      return null;
    }

    const lastCheck = allRecords[0];
    const totalChecks = allRecords.length;
    const upChecks = allRecords.filter((r) => r.status === "UP").length;
    const downChecks = allRecords.filter((r) => r.status === "DOWN").length;
    const errorChecks = allRecords.filter((r) => r.status === "ERROR").length;

    const uptime = totalChecks > 0 ? (upChecks / totalChecks) * 100 : 0;

    const successfulChecks = allRecords.filter(
      (r) => r.responseTime && r.status === "UP"
    );
    const avgResponseTime =
      successfulChecks.length > 0
        ? successfulChecks.reduce((sum, r) => sum + (r.responseTime || 0), 0) /
          successfulChecks.length
        : 0;

    let statusChanges = 0;
    for (let i = 1; i < allRecords.length; i++) {
      if (allRecords[i].status !== allRecords[i - 1].status) {
        statusChanges++;
      }
    }

    let lastStatusChange = lastCheck.timestamp;
    for (let i = 1; i < allRecords.length; i++) {
      if (allRecords[i].status !== lastCheck.status) {
        lastStatusChange = allRecords[i - 1].timestamp;
        break;
      }
    }

    return {
      currentStatus: lastCheck.status,
      uptime,
      avgResponseTime,
      totalChecks,
      upChecks,
      downChecks,
      errorChecks,
      lastCheck,
      lastStatusChange,
      statusChanges,
      history: allRecords.slice(0, 50), 
    };
  } catch (error) {
    console.error("Error calculating stats:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const stats = await withRetry(async (db: Db) => {
      return await calculateStats(db);
    });

    if (!stats) {
      return NextResponse.json({
        success: true,
        data: null,
        message: "No data available yet. Triggering initial collection...",
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error getting Snaplove uptime stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get uptime stats",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await withRetry(async (db: Db) => {
      const currentCheck = await checkSnaploveHealth();

      const lastStored = await getLastStoredStatus(db);

      const shouldStore = await shouldStoreRecord(currentCheck, lastStored);

      let stored = false;
      if (shouldStore) {
        await storeUptimeRecord(db, currentCheck);
        stored = true;
      }

      const stats = await calculateStats(db);

      return {
        currentCheck,
        stats,
        stored,
        reason: !lastStored
          ? "First record"
          : currentCheck.status !== lastStored.status
          ? "Status changed"
          : shouldStore
          ? "Heartbeat storage"
          : "No change, not stored",
      };
    });

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error checking Snaplove uptime:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check uptime",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function PUT() {
  try {
    const result = await withRetry(async (db: Db) => {
      const currentCheck = await checkSnaploveHealth();
      const lastStored = await getLastStoredStatus(db);
      const shouldStore = await shouldStoreRecord(currentCheck, lastStored);

      if (shouldStore) {
        await storeUptimeRecord(db, currentCheck);
        return {
          action: "stored",
          status: currentCheck.status,
          reason: !lastStored
            ? "First record"
            : currentCheck.status !== lastStored.status
            ? "Status changed"
            : "Heartbeat storage",
        };
      }

      return {
        action: "skipped",
        status: currentCheck.status,
        reason: "No change detected",
      };
    });

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in automated Snaplove check:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed automated check",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}