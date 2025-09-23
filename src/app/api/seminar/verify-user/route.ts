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
}

export async function POST(request: Request) {
    try {
        const { name, pin } = await request.json();

        if (!name || !pin) {
            return NextResponse.json(
                { success: false, message: "Name and PIN are required" },
                { status: 400 }
            );
        }

        const result = await withRetry(async (db: Db) => {
            const collection = db.collection<RegistrationData>("seminar_registrations");

            const user = await collection.findOne({
                name: name.trim().toLowerCase(),
                pin: pin
            });

            if (!user) {
                return {
                    success: false,
                    message: "Data not found or PIN is incorrect"
                };
            }

            return {
                success: true,
                code: user.code,
                message: "Verifikasi berhasil"
            };
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}