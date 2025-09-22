import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

        const adminUser = process.env.SEMINAR_ADMIN_USER || "admin";
    const adminPassword = process.env.SEMINAR_ADMIN_PASSWORD || "test123";

    console.log("Auth attempt:", { 
      providedUsername: username,
      expectedUsername: adminUser,
      providedPassword: password ? "***PROVIDED***" : "***MISSING***",
      expectedPassword: adminPassword ? "***CONFIGURED***" : "***MISSING***"
    });

        if (username === adminUser && password === adminPassword) {
      console.log("Authentication successful");
      
            const sessionToken = {
        authenticated: true,
        username: adminUser,
        expires: Date.now() + 24 * 60 * 60 * 1000,         timestamp: Date.now(),
      };

      return NextResponse.json({
        success: true,
        token: sessionToken,
        message: "Authentication successful"
      });
    } else {
      console.log("Authentication failed - credentials mismatch");
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}