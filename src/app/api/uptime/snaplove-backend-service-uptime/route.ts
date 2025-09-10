import { NextResponse } from "next/server";
import { withRetry } from "@/lib/mongodb";
import { Db, WithId, Document } from "mongodb";

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

interface SnaploveUptimeDocument extends Document {
  status: "UP" | "DOWN" | "ERROR";
  httpStatus?: number;
  responseTime?: number;
  message?: string;
  timestamp: Date;
  checkedAt: string;
}

interface DiscordNotificationData {
  lastNotifiedStatus: "UP" | "DOWN" | "ERROR" | null;
  lastNotificationTime: Date;
}

interface DiscordNotificationDocument extends Document {
  service: string;
  lastNotifiedStatus: "UP" | "DOWN" | "ERROR" | null;
  lastNotificationTime: Date;
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
    const collection = db.collection<SnaploveUptimeDocument>("snaplove_uptime");
    const lastRecord = await collection.findOne(
      {},
      { sort: { timestamp: -1 } }
    );

    if (!lastRecord) return null;

    return {
      status: lastRecord.status,
      httpStatus: lastRecord.httpStatus,
      responseTime: lastRecord.responseTime,
      message: lastRecord.message,
      timestamp: lastRecord.timestamp,
      checkedAt: lastRecord.checkedAt,
    };
  } catch (error) {
    console.error("Error getting last stored status:", error);
    return null;
  }
}

async function getLastNotificationData(
  db: Db
): Promise<DiscordNotificationData | null> {
  try {
    const collection = db.collection<DiscordNotificationDocument>("discord_notifications");
    const lastNotification = await collection.findOne({
      service: "snaplove_backend"
    });

    if (!lastNotification) return null;

    return {
      lastNotifiedStatus: lastNotification.lastNotifiedStatus,
      lastNotificationTime: lastNotification.lastNotificationTime,
    };
  } catch (error) {
    console.error("Error getting last notification data:", error);
    return null;
  }
}

async function updateNotificationData(
  db: Db,
  status: "UP" | "DOWN" | "ERROR",
  timestamp: Date
): Promise<void> {
  try {
    const collection = db.collection<DiscordNotificationDocument>("discord_notifications");
    await collection.updateOne(
      { service: "snaplove_backend" },
      {
        $set: {
          service: "snaplove_backend",
          lastNotifiedStatus: status,
          lastNotificationTime: timestamp,
        }
      },
      { upsert: true }
    );
  } catch (error) {
    console.error("Error updating notification data:", error);
    throw error;
  }
}

async function shouldSendDiscordNotification(
  currentCheck: SnaploveUptimeRecord,
  lastNotification: DiscordNotificationData | null
): Promise<boolean> {
  if (!lastNotification) {
    return true;
  }

  if (currentCheck.status !== lastNotification.lastNotifiedStatus) {
    return true;
  }

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  if (
    lastNotification.lastNotificationTime < twentyFourHoursAgo &&
    (currentCheck.status === "DOWN" || currentCheck.status === "ERROR")
  ) {
    return true;
  }

  return false;
}

function getStatusEmoji(status: "UP" | "DOWN" | "ERROR"): string {
  switch (status) {
    case "UP":
      return "✅";
    case "DOWN":
      return "❌";
    case "ERROR":
      return "⚠️";
    default:
      return "❓";
  }
}

function getStatusColor(status: "UP" | "DOWN" | "ERROR"): number {
  switch (status) {
    case "UP":
      return 0x00ff00; 
    case "DOWN":
      return 0xff0000;
    case "ERROR":
      return 0xff8800; 
    default:
      return 0x808080; 
  }
}

function getNotificationReason(
  currentStatus: "UP" | "DOWN" | "ERROR",
  lastNotifiedStatus: "UP" | "DOWN" | "ERROR" | null,
  isHeartbeat: boolean
): string {
  if (!lastNotifiedStatus) {
    return "Initial monitoring notification";
  }
  
  if (isHeartbeat) {
    return "24-hour persistence notification";
  }
  
  return `Status changed: ${lastNotifiedStatus} → ${currentStatus}`;
}

async function sendDiscordNotification(
  check: SnaploveUptimeRecord,
  lastNotifiedStatus: "UP" | "DOWN" | "ERROR" | null,
  isHeartbeat: boolean = false
): Promise<boolean> {
  const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
  
  if (!WEBHOOK_URL) {
    console.log("Discord webhook URL not configured, skipping notification");
    return false;
  }

  try {
    const emoji = getStatusEmoji(check.status);
    const color = getStatusColor(check.status);
    const reason = getNotificationReason(check.status, lastNotifiedStatus, isHeartbeat);

    const shouldTagEveryone = check.status === "DOWN" || check.status === "ERROR";
    
    const embed = {
      title: `${emoji} Snaplove Backend API - ${check.status}`,
      description: reason,
      color: color,
      fields: [
        {
          name: "🌐 Service",
          value: "Snaplove Backend API",
          inline: true,
        },
        {
          name: "📊 Status",
          value: `**${check.status}**`,
          inline: true,
        },
        {
          name: "⏱️ Timestamp",
          value: `<t:${Math.floor(check.timestamp.getTime() / 1000)}:F>`,
          inline: true,
        },
      ],
      footer: {
        text: "Rejaka.id Infrastructure Monitoring",
        icon_url: "https://rejaka.id/favicon-32x32.png",
      },
      timestamp: check.timestamp.toISOString(),
    };

    if (check.responseTime) {
      embed.fields.push({
        name: "⚡ Response Time",
        value: `${check.responseTime}ms`,
        inline: true,
      });
    }

    if (check.httpStatus) {
      embed.fields.push({
        name: "🔢 HTTP Status",
        value: `${check.httpStatus}`,
        inline: true,
      });
    }

    if (check.message) {
      embed.fields.push({
        name: "📝 Details",
        value: `\`\`\`${check.message}\`\`\``,
        inline: false,
      });
    }

    embed.fields.push({
      name: "🔗 Quick Actions",
      value: `• [View Dashboard](https://rejaka.id/uptime)\n• [API Endpoint](${process.env.SNAPLOVE_BACKEND_API})\n• [Portfolio](https://rejaka.id)`,
      inline: false,
    });

    const payload = {
      content: shouldTagEveryone ? "@everyone" : undefined,
      embeds: [embed],
      username: "Rejaka Infrastructure Monitor",
      avatar_url: "https://rejaka.id/favicon-32x32.png",
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord webhook failed:", response.status, errorText);
      return false;
    }

    console.log(`Discord notification sent successfully for ${check.status} status`);
    return true;
  } catch (error) {
    console.error("Failed to send Discord notification:", error);
    return false;
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
    const collection = db.collection<SnaploveUptimeDocument>("snaplove_uptime");
    
    const document: SnaploveUptimeDocument = {
      status: record.status,
      httpStatus: record.httpStatus,
      responseTime: record.responseTime,
      message: record.message,
      timestamp: record.timestamp,
      checkedAt: record.checkedAt,
    };
    
    await collection.insertOne(document);

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

function convertToUptimeRecord(doc: WithId<SnaploveUptimeDocument>): SnaploveUptimeRecord {
  return {
    status: doc.status,
    httpStatus: doc.httpStatus,
    responseTime: doc.responseTime,
    message: doc.message,
    timestamp: doc.timestamp,
    checkedAt: doc.checkedAt,
  };
}

async function calculateStats(db: Db): Promise<SnaploveStats | null> {
  try {
    const collection = db.collection<SnaploveUptimeDocument>("snaplove_uptime");

    const allDocuments = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    if (allDocuments.length === 0) {
      return null;
    }

    const allRecords = allDocuments.map(convertToUptimeRecord);

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

      const lastNotification = await getLastNotificationData(db);

      const shouldStore = await shouldStoreRecord(currentCheck, lastStored);

      const shouldNotify = await shouldSendDiscordNotification(
        currentCheck, 
        lastNotification
      );

      let stored = false;
      let notified = false;

      if (shouldStore) {
        await storeUptimeRecord(db, currentCheck);
        stored = true;
      }

      if (shouldNotify) {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const isHeartbeat = lastNotification && 
          lastNotification.lastNotificationTime < twentyFourHoursAgo &&
          currentCheck.status === lastNotification.lastNotifiedStatus;

        const discordSuccess = await sendDiscordNotification(
          currentCheck,
          lastNotification?.lastNotifiedStatus || null,
          isHeartbeat
        );

        if (discordSuccess) {
          await updateNotificationData(db, currentCheck.status, currentCheck.timestamp);
          notified = true;
        }
      }

      const stats = await calculateStats(db);

      return {
        currentCheck,
        stats,
        stored,
        notified,
        reasons: {
          storage: !lastStored 
            ? "First record" 
            : currentCheck.status !== lastStored.status 
              ? "Status changed" 
              : shouldStore 
                ? "Heartbeat storage" 
                : "No change, not stored",
          notification: !lastNotification
            ? "First notification"
            : currentCheck.status !== lastNotification.lastNotifiedStatus
              ? "Status changed"
              : shouldNotify
                ? "24-hour heartbeat"
                : "No notification needed"
        }
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
      const lastNotification = await getLastNotificationData(db);
      
      const shouldStore = await shouldStoreRecord(currentCheck, lastStored);
      const shouldNotify = await shouldSendDiscordNotification(
        currentCheck, 
        lastNotification
      );

      const actions = [];

      if (shouldStore) {
        await storeUptimeRecord(db, currentCheck);
        actions.push("stored");
      }

      if (shouldNotify) {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const isHeartbeat = lastNotification && 
          lastNotification.lastNotificationTime < twentyFourHoursAgo &&
          currentCheck.status === lastNotification.lastNotifiedStatus;

        const discordSuccess = await sendDiscordNotification(
          currentCheck,
          lastNotification?.lastNotifiedStatus || null,
          isHeartbeat
        );

        if (discordSuccess) {
          await updateNotificationData(db, currentCheck.status, currentCheck.timestamp);
          actions.push("notified");
        }
      }

      return {
        actions,
        status: currentCheck.status,
        reason: !lastStored
          ? "First record"
          : currentCheck.status !== lastStored.status
          ? "Status changed"
          : actions.length > 0
          ? "Heartbeat actions"
          : "No changes detected",
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