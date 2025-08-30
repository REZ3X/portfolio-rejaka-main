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
  metadataBase: new URL("https://rejaka.id"),
  title: {
    template: "%s | Rejaka Abimanyu Susanto | Web Developer & Tech Innovator",
    default:
      "Rejaka Abimanyu Susanto | Full-Stack Web Developer, Database Engineer & Tech Innovator Portfolio",
  },
  description:
    "Explore the comprehensive portfolio of Rejaka Abimanyu Susanto, an award-winning full-stack web developer, database engineer, and tech innovator from Yogyakarta, Indonesia. Specializing in Next.js, TypeScript, React, MongoDB, and modern web technologies. View projects, read technical blog posts, and discover cutting-edge web development solutions.",
  keywords: [
    "Rejaka Abimanyu Susanto",
    "Full Stack Web Developer Indonesia",
    "Next.js Developer Yogyakarta",
    "TypeScript React Developer",
    "MongoDB Database Engineer",

    "Next.js 14 App Router",
    "React TypeScript Developer",
    "MongoDB Atlas Integration",
    "API Development Specialist",
    "Server-Side Rendering Expert",
    "Frontend Backend Developer",
    "JavaScript ES6+ Developer",
    "Node.js Backend Engineer",
    "Tailwind CSS Expert",
    "Responsive Web Design",
    "Progressive Web Apps",
    "JAMstack Architecture",

    "Web Developer Yogyakarta",
    "Indonesia Software Engineer",
    "SMKN 2 Depok Sleman Graduate",
    "Yogyakarta Tech Professional",
    "Indonesian Full Stack Developer",

    "Web Development Portfolio",
    "Modern Web Technologies",
    "E-commerce Development",
    "SaaS Application Development",
    "Database Design Optimization",
    "Performance Optimization",
    "SEO Web Development",
    "Mobile-First Development",
    "Cross-Platform Solutions",

    "Programming Competition Winner",
    "Hackathon Participant",
    "Digital Innovation Award",
    "Web Development Competition",
    "Tech Competition Finalist",

    "Slaviors Team Lead",
    "Open Source Contributor",
    "Tech Community Leader",
    "Freelance Web Developer",
    "Project Management",

    "Tech Blog Writer",
    "Programming Tutorial Creator",
    "Web Development Articles",
    "Technical Documentation",
    "Developer Community Content",

    "rez3x developer",
    "abim tech",
    "xiannyaa portfolio",
    "rejaka.id",

    "how to build modern web applications",
    "Next.js tutorial Indonesia",
    "database optimization techniques",
    "full stack development guide",
    "web performance best practices",
    "React component architecture",
    "TypeScript development patterns",
    "MongoDB schema design",
    "API security implementation",
    "responsive design principles",
  ],
    other: {
    "ads-loading-strategy": "content-first",
    "content-type": "portfolio",
    "content-status": "complete"
  },
  authors: [
    {
      name: "Rejaka Abimanyu Susanto",
      url: "https://rejaka.id",
    },
  ],
  creator: "Rejaka Abimanyu Susanto",
  publisher: "Rejaka Abimanyu Susanto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Technology",
  classification: "Portfolio Website",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "Rejaka Abimanyu Susanto | Award-Winning Full-Stack Developer & Tech Innovator",
    description:
      "Portfolio of Rejaka Abimanyu Susanto - Full-stack web developer, database engineer, and tech innovator from Yogyakarta, Indonesia. Specializing in Next.js, React, TypeScript, and MongoDB. Winner of multiple programming competitions and leader of the Slaviors development team.",
    url: "https://rejaka.id",
    siteName: "Rejaka Abimanyu Susanto - Web Developer Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/profile/rez3x.webp",
        width: 1200,
        height: 630,
        alt: "Rejaka Abimanyu Susanto - Full-Stack Web Developer Portfolio",
        type: "image/webp",
      },
      {
        url: "/assets/images/profile/rez3x.webp",
        width: 800,
        height: 600,
        alt: "Rejaka Abimanyu - Tech Innovator and Database Engineer",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rejaka",
    creator: "@rejaka",
    title: "Rejaka Abimanyu Susanto | Full-Stack Developer & Tech Innovator",
    description:
      "Award-winning full-stack web developer from Yogyakarta, Indonesia. Specializing in Next.js, React, TypeScript, MongoDB. Leader of Slaviors development team. View portfolio and technical blog.",
    images: {
      url: "/assets/images/profile/rez3x.webp",
      alt: "Rejaka Abimanyu Susanto Portfolio Preview",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
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
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      me: ["mailto:abim@rejaka.id", "https://rejaka.id"],
    },
  },
  alternates: {
    canonical: "https://rejaka.id",
    languages: {
      "en-US": "https://rejaka.id",
    },
    types: {
      "application/rss+xml": "https://rejaka.id/rss.xml",
    },
  },
  applicationName: "Rejaka Portfolio",
  referrer: "origin-when-cross-origin",
  appLinks: {
    web: {
      url: "https://rejaka.id",
      should_fallback: true,
    },
  },
  archives: ["https://rejaka.id/blog"],
  bookmarks: ["https://rejaka.id/?modal=projects&project=all"],
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#e39fc2",
    "msapplication-tap-highlight": "no",
    "theme-color": "#2e1e2e",
    "color-scheme": "dark light",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060a10" },
    { media: "(prefers-color-scheme: light)", color: "#2e1e2e" },
  ],
  colorScheme: "dark light",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {GA_ID && process.env.NODE_ENV === "production" && (
          <>
            <Script
              defer
              src="https://u.zxn.my.id/script.js"
              data-website-id="e3ef0132-7b9a-4654-8895-92239c28cb03"
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  content_group1: 'Portfolio',
                });
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
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://rejaka.id/#person",
                  name: "Rejaka Abimanyu Susanto",
                  alternateName: ["rez3x", "abim", "xiannyaa"],
                  url: "https://rejaka.id",
                  image: {
                    "@type": "ImageObject",
                    url: "https://rejaka.id/assets/images/profile/rez3x.webp",
                    width: 800,
                    height: 600,
                    caption:
                      "Rejaka Abimanyu Susanto - Full-Stack Web Developer",
                  },
                  sameAs: [
                    "https://github.com/REZ3X",
                    "https://linkedin.com/in/rejaka-me",
                    "https://twitter.com/rejaka",
                  ],
                  jobTitle: "Full-Stack Web Developer",
                  description:
                    "Award-winning full-stack web developer, database engineer, and tech innovator specializing in modern web technologies",
                  worksFor: {
                    "@type": "Organization",
                    name: "Slaviors Development Team",
                    url: "https://rejaka.id/projects",
                  },
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "SMKN 2 Depok Sleman",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Sleman",
                      addressRegion: "Yogyakarta",
                      addressCountry: "Indonesia",
                    },
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Yogyakarta",
                    addressRegion: "Special Region of Yogyakarta",
                    addressCountry: "Indonesia",
                  },
                  knowsAbout: [
                    "Web Development",
                    "Full-Stack Development",
                    "Next.js",
                    "React",
                    "TypeScript",
                    "MongoDB",
                    "Database Engineering",
                    "API Development",
                    "Frontend Development",
                    "Backend Development",
                    "Node.js",
                    "JavaScript",
                    "Tailwind CSS",
                    "Progressive Web Apps",
                    "SEO Optimization",
                    "Performance Optimization",
                  ],
                  hasOccupation: {
                    "@type": "Occupation",
                    name: "Full-Stack Web Developer",
                    occupationLocation: {
                      "@type": "City",
                      name: "Yogyakarta, Indonesia",
                    },
                    skills: [
                      "Next.js Development",
                      "React Development",
                      "TypeScript Programming",
                      "MongoDB Database Design",
                      "API Development",
                      "Frontend Development",
                      "Backend Development",
                    ],
                  },
                  award: [
                    "1st Place National Digital Hero Competition 2024",
                    "Finalist Sagasitas Web Building Competition 2024",
                    "Top 10 ByProject Student Web Dev Competition 2025",
                    "Finalist Silogy Expo Web Development Competition 2025",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://rejaka.id/#website",
                  url: "https://rejaka.id",
                  name: "Rejaka Abimanyu Susanto Portfolio",
                  description:
                    "Professional portfolio of Rejaka Abimanyu Susanto - Full-stack web developer and tech innovator",
                  publisher: {
                    "@id": "https://rejaka.id/#person",
                  },
                  potentialAction: [
                    {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate:
                          "https://rejaka.id/blog?search={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  ],
                  inLanguage: "en-US",
                },
                {
                  "@type": "Organization",
                  "@id": "https://rejaka.id/#organization",
                  name: "Slaviors Development Team",
                  url: "https://rejaka.id",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://rejaka.id/assets/images/profile/rez3x.webp",
                  },
                  founder: {
                    "@id": "https://rejaka.id/#person",
                  },
                  member: {
                    "@id": "https://rejaka.id/#person",
                  },
                  description:
                    "Professional web development team specializing in modern web technologies and innovative solutions",
                },
              ],
            }),
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        <link
          rel="alternate"
          type="application/rss+xml"
          title="Rejaka Abimanyu Susanto - Tech Blog RSS Feed"
          href="https://rejaka.id/api/rss"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title="Rejaka Abimanyu Susanto - Tech Blog JSON Feed"
          href="https://rejaka.id/api/feed"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Rejaka Abimanyu Susanto - Tech Blog Atom Feed"
          href="https://rejaka.id/api/rss"
        />
        <link
          rel="preload"
          href="/assets/images/profile/rez3x.webp"
          as="image"
          type="image/webp"
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
