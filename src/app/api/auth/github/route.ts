import { NextRequest, NextResponse } from "next/server";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://rejaka.me/api/auth/github"
    : "http://localhost:3000/api/auth/github";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectParam = searchParams.get("redirect");

  if (!code) {
    const state = redirectParam ? encodeURIComponent(redirectParam) : "";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=user:email${state ? `&state=${state}` : ""}`;
    return NextResponse.redirect(githubAuthUrl);
  }

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    if (!tokenResponse.ok) {
      console.error("GitHub token exchange failed:", tokenResponse.status);
      return NextResponse.redirect(
        new URL("/?error=token_exchange_failed", request.url)
      );
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("GitHub OAuth: No access token received", tokenData);
      return NextResponse.redirect(
        new URL("/?error=no_access_token", request.url)
      );
    }

    const userResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userResponse.ok) {
      console.error("GitHub user data fetch failed:", userResponse.status);
      return NextResponse.redirect(
        new URL("/?error=user_data_failed", request.url)
      );
    }

    const userData = await userResponse.json();

    if (!userData.id) {
      console.error("GitHub OAuth: Invalid user data", userData);
      return NextResponse.redirect(
        new URL("/?error=invalid_user_data", request.url)
      );
    }

    const user = {
      userId: userData.id.toString(),
      username: userData.name || userData.login,
      email: userData.email,
      avatar: userData.avatar_url,
      provider: "github" as const,
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

    if (redirectParam) {
      try {
        redirectUrl = decodeURIComponent(redirectParam);
      } catch (e) {
        console.error("Error decoding redirect parameter:", e);
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
    console.error("GitHub OAuth error:", error);
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
  }
}
