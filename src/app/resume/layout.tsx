import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume - Rejaka Abimanyu Susanto | Full-Stack Developer",
  description:
    "Professional resume of Rejaka Abimanyu Susanto - Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Download PDF version available.",
  keywords: [
    "Rejaka Abimanyu Susanto resume",
    "Full-Stack Developer CV",
    "React developer resume",
    "Next.js developer",
    "TypeScript developer",
    "Web developer portfolio",
    "Software engineer resume",
    "Frontend developer",
    "Backend developer",
    "JavaScript developer",
  ],
  authors: [{ name: "Rejaka Abimanyu Susanto" }],
  creator: "Rejaka Abimanyu Susanto",
  publisher: "Rejaka Abimanyu Susanto",
  openGraph: {
    title: "Resume - Rejaka Abimanyu Susanto | Full-Stack Developer",
    description:
      "Professional resume of Rejaka Abimanyu Susanto - Full-Stack Developer with expertise in modern web technologies.",
    url: "https://rejaka.id/resume",
    siteName: "Rejaka Abimanyu Portfolio",
    images: [
      {
        url: "/assets/images/profile/rez3x.webp",
        width: 1200,
        height: 630,
        alt: "Rejaka Abimanyu Resume Preview",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume - Rejaka Abimanyu Susanto | Full-Stack Developer",
    description:
      "Professional resume of Rejaka Abimanyu Susanto - Full-Stack Developer with expertise in modern web technologies.",
    images: ["/assets/images/profile/rez3x.webp"],
    creator: "@rejaka",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://rejaka.id/resume",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
