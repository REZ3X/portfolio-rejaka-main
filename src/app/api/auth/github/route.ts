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

  if (!code) {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`;
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

    const tokenData = await tokenResponse.json();

    const userResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userData = await userResponse.json();

    const user = {
      userId: userData.id.toString(),
      username: userData.name || userData.login,
      email: userData.email,
      avatar: userData.avatar_url,
      provider: "github" as const,
    };

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
    console.error("GitHub OAuth error:", error);
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
  }
}
