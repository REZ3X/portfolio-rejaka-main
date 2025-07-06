import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { GuestbookEntry } from "@/types/guestbook";

export async function GET() {
  try {
    const db = await getDatabase();
    const entries = await db
      .collection<GuestbookEntry>("guestbook")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, user } = await request.json();

    if (!message || !user) {
      return NextResponse.json(
        { error: "Message and user are required" },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message too long (max 500 characters)" },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    const existingEntry = await db
      .collection<GuestbookEntry>("guestbook")
      .findOne({ userId: user.userId });

    if (existingEntry) {
      const result = await db.collection<GuestbookEntry>("guestbook").updateOne(
        { userId: user.userId },
        {
          $set: {
            message,
            updatedAt: new Date(),
          },
        }
      );

      if (result.modifiedCount === 0) {
        return NextResponse.json(
          { error: "Failed to update entry" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, action: "updated" });
    } else {
      const newEntry: GuestbookEntry = {
        userId: user.userId,
        username: user.username,
        avatar: user.avatar,
        provider: user.provider,
        message,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await db
        .collection<GuestbookEntry>("guestbook")
        .insertOne(newEntry);

      if (!result.insertedId) {
        return NextResponse.json(
          { error: "Failed to create entry" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, action: "created" });
    }
  } catch (error) {
    console.error("Error creating/updating guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db
      .collection<GuestbookEntry>("guestbook")
      .deleteOne({ userId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}
