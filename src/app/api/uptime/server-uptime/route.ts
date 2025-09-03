import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint") || "latest";
  const server = searchParams.get("server");

  try {
    let url = "https://server-uptime.rejaka.id/latest";
    
    if (endpoint === "history" && server) {
      url = `https://server-uptime.rejaka.id/history/${encodeURIComponent(server)}`;
    } else if (endpoint === "force") {
      url = "https://server-uptime.rejaka.id/force";
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Error fetching uptime data:", error);
    return NextResponse.json(
      { error: "Failed to fetch uptime data" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const response = await fetch("https://server-uptime.rejaka.id/force", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error forcing uptime check:", error);
    return NextResponse.json(
      { error: "Failed to force uptime check" },
      { status: 500 }
    );
  }
}