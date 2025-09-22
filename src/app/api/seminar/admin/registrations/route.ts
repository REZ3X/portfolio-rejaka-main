import { NextResponse } from "next/server";
import { withRetry } from "@/lib/mongodb";
import { Db } from "mongodb";

interface RegistrationData {
    _id: string;
    name: string;
    email: string;
    pin: string;
    code: string;
    attendeeStatus: "registered" | "attended";
    registeredAt: Date;
}

export async function GET() {
    try {
        const result = await withRetry(async (db: Db) => {
            const collection = db.collection<RegistrationData>("seminar_registrations");

            const registrations = await collection
                .find({}, { projection: { pin: 0 } })                 .sort({ registeredAt: -1 })
                .toArray();

            const stats = {
                total: registrations.length,
                registered: registrations.filter(r => r.attendeeStatus === 'registered').length,
                attended: registrations.filter(r => r.attendeeStatus === 'attended').length
            };

            return {
                success: true,
                registrations,
                stats
            };
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Admin fetch error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch registrations" },
            { status: 500 }
        );
    }
}