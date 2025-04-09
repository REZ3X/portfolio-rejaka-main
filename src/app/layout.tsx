import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Quicksand } from "next/font/google";
import "../styles/globals.css";
import { UserProvider } from "@/context/UserContext";
import CustomCursorWrapper from "@/components/shared/CustomCursorWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "A personal developer portfolio showcasing my skills and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} antialiased`}
      >
        <UserProvider>
          {children}
          <CustomCursorWrapper />
        </UserProvider>
      </body>
    </html>
  );
}