import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { message } = await request.json();
    const cookies = request.cookies;
    const userCookie = cookies.get("guestbook_user");

    if (!userCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment cannot be empty" },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Comment too long (max 500 characters)" },
        { status: 400 }
      );
    }

    const user = JSON.parse(userCookie.value);
    const { getDatabase } = await import("@/lib/mongodb");
    const db = await getDatabase();

    const existingComment = await db.collection("blog_comments").findOne({
      slug,
      userId: user.userId,
    });

    if (existingComment) {
      return NextResponse.json(
        { error: "You can only comment once per post" },
        { status: 400 }
      );
    }

    const bannedWordsEnglish =
      process.env.NEXT_PUBLIC_BANNED_WORDS_ENGLISH?.split(",") || [];
    const bannedWordsIndonesian =
      process.env.NEXT_PUBLIC_BANNED_WORDS_INDONESIAN?.split(",") || [];
    const bannedWordsVariations =
      process.env.NEXT_PUBLIC_BANNED_WORDS_VARIATIONS?.split(",") || [];
    const bannedWordsSpaces =
      process.env.NEXT_PUBLIC_BANNED_WORDS_SPACES?.split(",") || [];
    const bannedWordsMisspellings =
      process.env.NEXT_PUBLIC_BANNED_WORDS_MISSPELLINGS?.split(",") || [];
    const bannedWordsSexual =
      process.env.NEXT_PUBLIC_BANNED_WORDS_SEXUAL?.split(",") || [];
    const bannedWordsViolence =
      process.env.NEXT_PUBLIC_BANNED_WORDS_VIOLENCE?.split(",") || [];
    const bannedWordsDrugs =
      process.env.NEXT_PUBLIC_BANNED_WORDS_DRUGS?.split(",") || [];
    const bannedWordsInsults =
      process.env.NEXT_PUBLIC_BANNED_WORDS_INSULTS?.split(",") || [];

    const allBannedWords = [
      ...bannedWordsEnglish,
      ...bannedWordsIndonesian,
      ...bannedWordsVariations,
      ...bannedWordsSpaces,
      ...bannedWordsMisspellings,
      ...bannedWordsSexual,
      ...bannedWordsViolence,
      ...bannedWordsDrugs,
      ...bannedWordsInsults,
    ].filter((word: string) => word && word.trim());
    const messageWords = message.toLowerCase().split(/\s+/);
    const messageText = message.toLowerCase().replace(/[^a-z0-9\s]/gi, " ");

    for (const bannedWord of allBannedWords) {
      if (
        messageText.includes(bannedWord.toLowerCase()) ||
        messageWords.some((word: string) => word === bannedWord.toLowerCase())
      ) {
        return NextResponse.json(
          {
            error:
              "Your comment contains inappropriate content. Please keep it respectful.",
          },
          { status: 400 }
        );
      }
    }

    const comment = {
      slug,
      userId: user.userId,
      username: user.username,
      avatar: user.avatar,
      provider: user.provider,
      message: message.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("blog_comments").insertOne(comment);

    return NextResponse.json({
      success: true,
      comment: { ...comment, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Error adding comment:", error);
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

    const comments = await db
      .collection("blog_comments")
      .find({ slug })
      .sort({ createdAt: -1 })
      .toArray();

    console.log("Comments from database:", JSON.stringify(comments, null, 2));
    comments.forEach((comment, index) => {
      console.log(`Comment ${index}:`, {
        userId: comment.userId,
        username: comment.username,
        avatar: comment.avatar,
        provider: comment.provider,
        hasAvatar: !!comment.avatar,
        avatarLength: comment.avatar?.length,
      });
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Error getting comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { message, commentId } = await request.json();
    const cookies = request.cookies;
    const userCookie = cookies.get("guestbook_user");

    if (!userCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment cannot be empty" },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Comment too long (max 500 characters)" },
        { status: 400 }
      );
    }

    const user = JSON.parse(userCookie.value);
    const { getDatabase } = await import("@/lib/mongodb");
    const db = await getDatabase();

    const bannedWordsEnglish =
      process.env.NEXT_PUBLIC_BANNED_WORDS_ENGLISH?.split(",") || [];
    const bannedWordsIndonesian =
      process.env.NEXT_PUBLIC_BANNED_WORDS_INDONESIAN?.split(",") || [];
    const bannedWordsVariations =
      process.env.NEXT_PUBLIC_BANNED_WORDS_VARIATIONS?.split(",") || [];
    const bannedWordsSpaces =
      process.env.NEXT_PUBLIC_BANNED_WORDS_SPACES?.split(",") || [];
    const bannedWordsMisspellings =
      process.env.NEXT_PUBLIC_BANNED_WORDS_MISSPELLINGS?.split(",") || [];
    const bannedWordsSexual =
      process.env.NEXT_PUBLIC_BANNED_WORDS_SEXUAL?.split(",") || [];
    const bannedWordsViolence =
      process.env.NEXT_PUBLIC_BANNED_WORDS_VIOLENCE?.split(",") || [];
    const bannedWordsDrugs =
      process.env.NEXT_PUBLIC_BANNED_WORDS_DRUGS?.split(",") || [];
    const bannedWordsInsults =
      process.env.NEXT_PUBLIC_BANNED_WORDS_INSULTS?.split(",") || [];

    const allBannedWords = [
      ...bannedWordsEnglish,
      ...bannedWordsIndonesian,
      ...bannedWordsVariations,
      ...bannedWordsSpaces,
      ...bannedWordsMisspellings,
      ...bannedWordsSexual,
      ...bannedWordsViolence,
      ...bannedWordsDrugs,
      ...bannedWordsInsults,
    ].filter((word: string) => word && word.trim());
    const messageWords = message.toLowerCase().split(/\s+/);
    const messageText = message.toLowerCase().replace(/[^a-z0-9\s]/gi, " ");

    for (const bannedWord of allBannedWords) {
      if (
        messageText.includes(bannedWord.toLowerCase()) ||
        messageWords.some((word: string) => word === bannedWord.toLowerCase())
      ) {
        return NextResponse.json(
          {
            error:
              "Your comment contains inappropriate content. Please keep it respectful.",
          },
          { status: 400 }
        );
      }
    }

    const { ObjectId } = await import("mongodb");
    const result = await db.collection("blog_comments").updateOne(
      {
        _id: new ObjectId(commentId),
        userId: user.userId,
        slug,
      },
      {
        $set: {
          message: message.trim(),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Comment not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating comment:", error);
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
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("commentId");
    const cookies = request.cookies;
    const userCookie = cookies.get("guestbook_user");

    if (!userCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID required" },
        { status: 400 }
      );
    }

    const user = JSON.parse(userCookie.value);
    const { getDatabase } = await import("@/lib/mongodb");
    const db = await getDatabase();

    const { ObjectId } = await import("mongodb");
    const result = await db.collection("blog_comments").deleteOne({
      _id: new ObjectId(commentId),
      userId: user.userId,
      slug,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Comment not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
