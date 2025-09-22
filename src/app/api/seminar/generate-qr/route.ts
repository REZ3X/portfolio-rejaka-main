import { NextResponse } from "next/server";
import { withRetry } from "@/lib/mongodb";
import { Db } from "mongodb";
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';

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
        const { code } = await request.json();

        if (!code) {
            return NextResponse.json(
                { success: false, message: "Code is required" },
                { status: 400 }
            );
        }

        const result = await withRetry(async (db: Db) => {
            const collection = db.collection<RegistrationData>("seminar_registrations");

            const registration = await collection.findOne({ code });

            if (!registration) {
                throw new Error("Registration not found");
            }

            const qrDataURL = await QRCode.toDataURL(code, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            pdf.setFontSize(22);
            pdf.setTextColor(0, 173, 180); 
            pdf.text('ENGLISH MINI SEMINAR', 105, 25, { align: 'center' });

            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            pdf.text('Professionalism in Software Engineering:', 105, 35, { align: 'center' });
            pdf.text('SDLC and Git Standards', 105, 42, { align: 'center' });

            pdf.setFontSize(16);
            pdf.setTextColor(0, 173, 180);
            pdf.text('E-TICKET', 105, 55, { align: 'center' });

            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text('EVENT DETAILS', 20, 75);
 
            pdf.setDrawColor(0, 173, 180);
            pdf.setLineWidth(0.5);
            pdf.line(20, 77, 190, 77);

            pdf.setFontSize(10);
            pdf.text('Date:', 25, 87);
            pdf.text('Friday, September 26, 2025', 50, 87);
            
            pdf.text('Time:', 25, 95);
            pdf.text('09:30 - 11:30 AM WIB', 50, 95);
            
            pdf.text('Venue:', 25, 103);
            pdf.text('Yudhistira Room, SMK Negeri 2 Depok', 50, 103);
            
            pdf.text('Fee:', 25, 111);
            pdf.setTextColor(0, 255, 136); 
            pdf.text('FREE', 50, 111);

            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text('SPEAKERS', 20, 125);
            
            pdf.setDrawColor(0, 173, 180);
            pdf.line(20, 127, 190, 127);

            pdf.setFontSize(10);
            pdf.text('• Rizky Fauzan H.', 25, 137);
            pdf.setFontSize(8);
            pdf.setTextColor(100, 100, 100);
            pdf.text('Network Engineer (MTCNA & MTCTCE)', 27, 143);

            pdf.setFontSize(10);
            pdf.setTextColor(0, 0, 0);
            pdf.text('• Rejaka Abimanyu S.', 25, 151);
            pdf.setFontSize(8);
            pdf.setTextColor(100, 100, 100);
            pdf.text('CITO of Slaviors, Web Developer', 27, 157);

            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text('PARTICIPANT INFORMATION', 20, 175);
            
            pdf.setDrawColor(0, 173, 180);
            pdf.line(20, 177, 190, 177);

            pdf.setFontSize(10);
            pdf.text(`Name: ${registration.name}`, 25, 187);
            pdf.text(`Email: ${registration.email}`, 25, 195);
            pdf.text(`Registration Code: ${registration.code}`, 25, 203);
            pdf.text(`Registered: ${registration.registeredAt.toLocaleDateString('id-ID')}`, 25, 211);

            pdf.addImage(qrDataURL, 'PNG', 75, 220, 60, 60);

            pdf.setFontSize(10);
            pdf.setTextColor(0, 173, 180);
            pdf.text('Scan QR Code for Check-in', 105, 290, { align: 'center' });

            pdf.setFontSize(8);
            pdf.setTextColor(100, 100, 100);
            pdf.text('Please bring this ticket (printed or digital) to the event.', 105, 300, { align: 'center' });
            pdf.text('Contact: +62 895 2577 7781 for assistance.', 105, 307, { align: 'center' });

            pdf.setFontSize(8);
            pdf.setTextColor(0, 173, 180);
            pdf.text('Powered by rejaka.id • https://rejaka.id/seminar/register', 105, 320, { align: 'center' });

            pdf.setFontSize(7);
            pdf.setTextColor(100, 100, 100);
            pdf.text('12 SIJA B PROUDLY PRESENT', 105, 330, { align: 'center' });

            const pdfBuffer = pdf.output('arraybuffer');

            return new Response(pdfBuffer, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="EMW-Ticket-${code}.pdf"`
                }
            });
        });

        return result;
    } catch (error) {
        console.error("QR generation error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to generate QR code" },
            { status: 500 }
        );
    }
}