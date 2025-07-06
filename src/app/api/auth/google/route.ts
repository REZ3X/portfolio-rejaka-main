import { NextRequest, NextResponse } from "next/server";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://rejaka.me/api/auth/google"
    : "http://localhost:3000/api/auth/google";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid profile email`;
    return NextResponse.redirect(googleAuthUrl);
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID!,
        client_secret: GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("Google OAuth: No access token received", tokenData);
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
    }

    const userResponse = await fetch(
      `https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: "application/json",
        },
      }
    );

    const userData = await userResponse.json();
    console.log("Google user data:", userData);
    if (!userData.resourceName) {
      console.error("Google OAuth: Invalid user data", userData);
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
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

    console.log("Processed Google user:", user);
    const { getDatabase } = await import("@/lib/mongodb");
    const db = await getDatabase();
    await db
      .collection("users")
      .updateOne(
        { userId: user.userId },
        { $set: { ...user, createdAt: new Date() } },
        { upsert: true }
      );

    const response = NextResponse.redirect(
      new URL("/?modal=guestbook", request.url)
    );
    response.cookies.set("guestbook_user", JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
  }
}
