import { NextRequest, NextResponse } from "next/server";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://rejaka.me/api/auth/google"
    : "http://localhost:3000/api/auth/google";

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 30000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=openid profile email&access_type=offline&prompt=consent`;
    return NextResponse.redirect(googleAuthUrl);
  }

  try {
    console.log("Starting Google OAuth token exchange...");

    const tokenResponse = await fetchWithTimeout("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "rejaka-portfolio/1.0"
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID!,
        client_secret: GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    }, 30000);

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Google token exchange failed:", tokenResponse.status, errorText);
      return NextResponse.redirect(new URL("/?error=token_exchange_failed", request.url));
    }

    const tokenData = await tokenResponse.json();
    console.log("Token exchange successful");

    if (!tokenData.access_token) {
      console.error("Google OAuth: No access token received", tokenData);
      return NextResponse.redirect(new URL("/?error=no_access_token", request.url));
    }

    const userResponse = await fetchWithTimeout(
      `https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: "application/json",
          "User-Agent": "rejaka-portfolio/1.0"
        },
      },
      30000
    );

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("Google user data fetch failed:", userResponse.status, errorText);
      return NextResponse.redirect(new URL("/?error=user_data_failed", request.url));
    }

    const userData = await userResponse.json();
    console.log("User data fetch successful");
    
    if (!userData.resourceName) {
      console.error("Google OAuth: Invalid user data", userData);
      return NextResponse.redirect(new URL("/?error=invalid_user_data", request.url));
    }

    const userId = userData.resourceName.replace("people/", "");
    const name = userData.names?.[0]?.displayName || "Unknown User";
    const email = userData.emailAddresses?.[0]?.value || "";
    const avatar =
      userData.photos?.[0]?.url ||
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

    const user = {
      userId,
      username: name,
      email,
      avatar,
      provider: "google" as const,
    };

    console.log("Processed Google user:", user.username);
    
    try {
      const { getDatabase } = await import("@/lib/mongodb");
      const db = await getDatabase();
      await db
        .collection("users")
        .updateOne(
          { userId: user.userId },
          { $set: { ...user, createdAt: new Date() } },
          { upsert: true }
        );
      console.log("User saved to database");
    } catch (dbError) {
      console.error("Database error:", dbError);
    }

    const response = NextResponse.redirect(
      new URL("/?modal=guestbook", request.url)
    );
    response.cookies.set("guestbook_user", JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google OAuth error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      cause: error instanceof Error ? error.cause : undefined,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        return NextResponse.redirect(new URL("/?error=connection_timeout", request.url));
      }
      if (error.message.includes('SSL') || error.message.includes('TLS')) {
        return NextResponse.redirect(new URL("/?error=ssl_error", request.url));
      }
    }
    
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
  }
}