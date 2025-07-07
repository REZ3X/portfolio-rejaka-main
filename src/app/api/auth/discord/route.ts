import { NextRequest, NextResponse } from "next/server";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://rejaka.me/api/auth/discord"
    : "http://localhost:3000/api/auth/discord";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectParam = searchParams.get("redirect");

  if (!code) {
    const state = redirectParam ? encodeURIComponent(redirectParam) : "";
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code&scope=identify email${
      state ? `&state=${state}` : ""
    }`;
    return NextResponse.redirect(discordAuthUrl);
  }

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Discord token exchange failed:", tokenResponse.status);
      return NextResponse.redirect(
        new URL("/?error=token_exchange_failed", request.url)
      );
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("Discord OAuth: No access token received", tokenData);
      return NextResponse.redirect(
        new URL("/?error=no_access_token", request.url)
      );
    }

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userResponse.ok) {
      console.error("Discord user data fetch failed:", userResponse.status);
      return NextResponse.redirect(
        new URL("/?error=user_data_failed", request.url)
      );
    }

    const userData = await userResponse.json();

    if (!userData.id) {
      console.error("Discord OAuth: Invalid user data", userData);
      return NextResponse.redirect(
        new URL("/?error=invalid_user_data", request.url)
      );
    }

    const user = {
      userId: userData.id,
      username: userData.global_name || userData.username,
      email: userData.email,
      avatar: userData.avatar
        ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${
            parseInt(userData.discriminator) % 5
          }.png`,
      provider: "discord" as const,
    };

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

    let redirectUrl = "/?modal=guestbook";
    const state = searchParams.get("state");
    if (state) {
      try {
        redirectUrl = decodeURIComponent(state);
      } catch (e) {
        console.error("Error decoding state parameter:", e);
      }
    }

    if (
      !redirectUrl.startsWith("/") &&
      !redirectUrl.includes(request.url.split("/")[2])
    ) {
      console.log("Invalid redirect URL, using fallback:", redirectUrl);
      redirectUrl = "/?modal=guestbook";
    } else if (
      redirectUrl.startsWith("http") &&
      !redirectUrl.includes(request.url.split("/")[2])
    ) {
      console.log("External redirect blocked, using fallback:", redirectUrl);
      redirectUrl = "/?modal=guestbook";
    }

    if (!redirectUrl.startsWith("/")) {
      redirectUrl = "/?modal=guestbook";
    }

    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    response.cookies.set("guestbook_user", JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Discord OAuth error:", error);
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
  }
}
