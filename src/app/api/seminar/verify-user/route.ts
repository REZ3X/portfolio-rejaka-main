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
        const { email, pin } = await request.json(); // Changed from name to email

        if (!email || !pin) {
            return NextResponse.json(
                { success: false, message: "Email and PIN are required" },
                { status: 400 }
            );
        }

        const result = await withRetry(async (db: Db) => {
            const collection = db.collection<RegistrationData>("seminar_registrations");

            // Search by email and PIN (both normalized)
            const user = await collection.findOne({
                email: email.trim().toLowerCase(), // Normalize email for search
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