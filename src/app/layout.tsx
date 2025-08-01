import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Quicksand,
  Inter,
  Playfair_Display,
  Merriweather,
  Crimson_Text,
} from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import { UserProvider } from "@/context/UserContext";
import CustomCursorWrapper from "@/components/shared/CustomCursorWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rejaka.me"),
  title: {
    template: "%s | Rejaka Abimanyu | Web Developer",
    default: "Rejaka Abimanyu Susanto | Website Developer Portfolio",
  },
  description:
    "Explore the portfolio of Rejaka Abimanyu Susanto, a web developer and author showcasing creative projects and technical expertise.",
  keywords: [
    "Rejaka",
    "Rejaka Abimanyu",
    "Full Stack Developer",
    "Web Development",
    "Game Maker",
    "Author",
    "Portfolio",
    "Database Engineer",
    "Rejaka Abimanyu Susanto",
    "rez3x",
    "abim",
    "xiannyaa",
  ],
  authors: [{ name: "Rejaka Abimanyu Susanto", url: "https://rejaka.me" }],
  creator: "Rejaka Abimanyu Susanto",
  publisher: "Rejaka Abimanyu Susanto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Rejaka Abimanyu | Full Stack Developer, Game Maker & Author",
    description:
      "Explore the portfolio of Rejaka Abimanyu Susanto, a full stack web developer, database engineer, game maker, and author showcasing creative projects and technical expertise.",
    url: "https://rejaka.me",
    siteName: "Rejaka Abimanyu Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/profile/rez3x.webp",
        width: 800,
        height: 600,
        alt: "Rejaka Abimanyu's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rejaka Abimanyu | Full Stack Developer, Game Maker & Author",
    description:
      "Explore the portfolio of Rejaka Abimanyu Susanto, a full stack web developer, database engineer, game maker, and author showcasing creative projects and technical expertise.",
    creator: "@rejaka",
    images: ["/assets/images/profile/rez3x.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#e39fc2",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://rejaka.me",
    languages: {
      "en-US": "https://rejaka.me",
    },
  },
  applicationName: "Rejaka Portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060a10" },
    { media: "(prefers-color-scheme: light)", color: "#2e1e2e" },
  ],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {GA_ID && process.env.NODE_ENV === "production" && (
          <>
<Script defer src="https://u.zxn.my.id/script.js" data-website-id="e3ef0132-7b9a-4654-8895-92239c28cb03"/>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3181855213430938"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rejaka Abimanyu Susanto",
              url: "https://rejaka.me",
              image: "https://rejaka.me/assets/images/profile/rez3x.webp",
              sameAs: [
                "https://github.com/REZ3X",
                "https://linkedin.com/in/rejaka-abimanyu-susanto-6713482b6",
              ],
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Independent",
              },
              description:
                "Full stack web developer, database engineer, game maker, and author.",
              knowsAbout: [
                "Web Development",
                "Database Engineering",
                "Game Development",
                "Creative Writing",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} ${inter.variable} ${playfairDisplay.variable} ${merriweather.variable} ${crimsonText.variable} antialiased`}
      >
        <UserProvider>
          {children}
          <CustomCursorWrapper />
        </UserProvider>
      </body>
    </html>
  );
}
