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

function generateCode(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `EMW${year}${month}${day}`;
}

export async function POST(request: Request) {
    try {
        const { name, email, pin } = await request.json();

        if (!name || !email || !pin) {
            return NextResponse.json(
                { success: false, message: "Semua field harus diisi" },
                { status: 400 }
            );
        }

        if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
            return NextResponse.json(
                { success: false, message: "PIN harus berupa 4 digit angka" },
                { status: 400 }
            );
        }

        const result = await withRetry(async (db: Db) => {
            const collection = db.collection<RegistrationData>("seminar_registrations");

            const existingUser = await collection.findOne({
                email: email.trim().toLowerCase()
            });

            if (existingUser) {
                return {
                    success: false,
                    existing: true,
                    message: "Email sudah terdaftar. Gunakan opsi 'Unduh Ulang Ticket' jika Anda sudah pernah mendaftar."
                };
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const todayCount = await collection.countDocuments({
                registeredAt: {
                    $gte: today,
                    $lt: tomorrow
                }
            });

            const baseCode = generateCode();
            const incrementalNumber = String(todayCount + 1).padStart(3, '0');
            const code = `${baseCode}${incrementalNumber}`;

            const newRegistration: RegistrationData = {
                name: name.trim(),
                email: email.trim().toLowerCase(), 
                pin: pin,
                code: code,
                attendeeStatus: "registered",
                registeredAt: new Date()
            };

            const insertResult = await collection.insertOne(newRegistration);

            if (insertResult.insertedId) {
                return {
                    success: true,
                    code: code,
                    message: "Registrasi berhasil"
                };
            } else {
                throw new Error("Failed to insert registration");
            }
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}