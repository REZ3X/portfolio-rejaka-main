import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const cookies = request.cookies;
    const userCookie = cookies.get("guestbook_user");

    if (!userCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = JSON.parse(userCookie.value);
    const { getDatabase } = await import("@/lib/mongodb");
    const db = await getDatabase();

    const existingLike = await db.collection("blog_likes").findOne({
      slug,
      userId: user.userId,
    });

    if (existingLike) {
      return NextResponse.json({ error: "Already liked" }, { status: 400 });
    }

    await db.collection("blog_likes").insertOne({
      slug,
      userId: user.userId,
      username: user.username,
      createdAt: new Date(),
    });

    const likeCount = await db
      .collection("blog_likes")
      .countDocuments({ slug });

    return NextResponse.json({ success: true, likeCount });
  } catch (error) {
    console.error("Error adding like:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const cookies = request.cookies;
    const userCookie = cookies.get("guestbook_user");

    if (!userCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = JSON.parse(userCookie.value);
    const { getDatabase } = await import("@/lib/mongodb");
    const db = await getDatabase();

    const result = await db.collection("blog_likes").deleteOne({
      slug,
      userId: user.userId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Like not found" }, { status: 404 });
    }

    const likeCount = await db
      .collection("blog_likes")
      .countDocuments({ slug });

    return NextResponse.json({ success: true, likeCount });
  } catch (error) {
    console.error("Error removing like:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { getDatabase } = await import("@/lib/mongodb");
    const db = await getDatabase();

    const likeCount = await db
      .collection("blog_likes")
      .countDocuments({ slug });

    const cookies = request.cookies;
    const userCookie = cookies.get("guestbook_user");
    let userLiked = false;

    if (userCookie) {
      const user = JSON.parse(userCookie.value);
      const existingLike = await db.collection("blog_likes").findOne({
        slug,
        userId: user.userId,
      });
      userLiked = !!existingLike;
    }

    return NextResponse.json({ likeCount, userLiked });
  } catch (error) {
    console.error("Error getting likes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
