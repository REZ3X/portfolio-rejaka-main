import { NextResponse } from "next/server";
import { withRetry } from "@/lib/mongodb";
import { Db } from "mongodb";

interface RegistrationData {
    name: string;
    email: string;
    pin: string;
    code: string;
    attendeeStatus: "registered" | "attended";
    registeredAt: Date;
    checkedInAt?: Date;
}

export async function POST(request: Request) {
    try {
        const { code } = await request.json();

        if (!code) {
            return NextResponse.json(
                { success: false, message: "Registration code is required" },
                { status: 400 }
            );
        }

        const result = await withRetry(async (db: Db) => {
            const collection = db.collection<RegistrationData>("seminar_registrations");

            const registration = await collection.findOne({ code });

            if (!registration) {
                return {
                    success: false,
                    message: "Registration code not found"
                };
            }

            if (registration.attendeeStatus === 'attended') {
                return {
                    success: false,
                    message: "Already checked in",
                    name: registration.name
                };
            }

            const updateResult = await collection.updateOne(
                { code },
                {
                    $set: {
                        attendeeStatus: 'attended',
                        checkedInAt: new Date()
                    }
                }
            );

            if (updateResult.modifiedCount === 1) {
                return {
                    success: true,
                    message: "Check-in successful",
                    name: registration.name
                };
            } else {
                throw new Error("Failed to update check-in status");
            }
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Check-in error:", error);
        return NextResponse.json(
            { success: false, message: "Check-in failed" },
            { status: 500 }
        );
    }
}