import { NextResponse } from "next/server";
import { reconnectMongoDB, getConnectionStatus } from "@/lib/mongodb";

export async function POST() {
  try {
    const result = await reconnectMongoDB();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Database reconnection error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Reconnection failed: ${error}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const status = await getConnectionStatus();

    return NextResponse.json({
      connected: status.connected,
      message: status.message,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database status check error:", error);
    return NextResponse.json(
      {
        connected: false,
        message: `Status check failed: ${error}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
