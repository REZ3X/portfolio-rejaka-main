import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "English Mini Seminar Registration - SDLC & Git Standards | Free Workshop",
  description:
    "Register for the English Mini Seminar: 'Professionalism in Software Engineering: SDLC and Git Standards' at SMK Negeri 2 Depok. Free workshop on September 26, 2025, featuring industry experts Rizky Fauzan H. (Network Engineer) and Rejaka Abimanyu S. (Web Developer). Learn professional development workflow, Git best practices, and industry standards implementation. Download your QR code ticket instantly.",
  keywords: [
    "English Mini Seminar registration",
    "SDLC seminar Indonesia",
    "Git standards workshop",
    "Software development seminar",
    "Professional programming workshop",
    "SMK Negeri 2 Depok seminar",
    "Free programming workshop",
    "Software engineering seminar",
    "Development workflow training",
    "Git best practices seminar",

    "Rizky Fauzan H network engineer",
    "Rejaka Abimanyu Susanto speaker",
    "MTCNA MTCTCE certified",
    "Slaviors CITO speaker",
    "Industry expert seminar",
    "Professional developer workshop",

    "Software Development Life Cycle",
    "Git version control training",
    "Professional development workflow",
    "Industry standards implementation",
    "Programming best practices",
    "Code management seminar",
    "Version control workshop",
    "SDLC methodology training",

    "September 26 2025 seminar",
    "Arjuna Room SMK Negeri 2 Depok",
    "Free tech seminar Yogyakarta",
    "Programming workshop Sleman",
    "Software development event",
    "Tech seminar registration",

    "QR code ticket download",
    "Instant registration confirmation",
    "Free seminar ticket",
    "Digital workshop registration",
    "Online seminar booking",

    "Programming student workshop",
    "Vocational school seminar",
    "Technical education event",
    "Software engineering education",
    "Professional development training",
    "Career preparation seminar",

    "register programming seminar",
    "free software development workshop",
    "Git training registration",
    "SDLC seminar booking",
    "professional programming event",
    "industry standards workshop registration",
  ],
  authors: [
    {
      name: "Rejaka Abimanyu Susanto",
      url: "https://rejaka.id",
    },
  ],
  creator: "Rejaka Abimanyu Susanto",
  publisher: "SMK Negeri 2 Depok Sleman",
  category: "Education",
  classification: "Seminar Registration",
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
      "English Mini Seminar Registration - SDLC & Git Standards | Free Workshop",
    description:
      "Register for the English Mini Seminar on Software Engineering Professionalism. Free workshop on September 26, 2025, at SMK Negeri 2 Depok. Learn SDLC methodology and Git standards from industry experts. Instant QR code ticket download.",
    url: "https://rejaka.id/seminar/register",
    siteName: "English Mini Seminar - Professional Software Development",
    images: [
      {
        url: "/assets/images/seminar/poster.png",
        width: 1200,
        height: 630,
        alt: "English Mini Seminar: SDLC & Git Standards Workshop Poster",
        type: "image/png",
      },
      {
        url: "/assets/images/seminar/event-preview.webp",
        width: 800,
        height: 600,
        alt: "English Mini Seminar Event Details",
        type: "image/webp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rejaka",
    creator: "@rejaka",
    title: "English Mini Seminar Registration - Free SDLC & Git Workshop",
    description:
      "Register now! Free seminar on Software Engineering Professionalism: SDLC & Git Standards. September 26, 2025, at SMK Negeri 2 Depok. Industry experts speaking. Instant QR ticket download.",
    images: ["/assets/images/seminar/poster.png"],
  },
  alternates: {
    canonical: "https://rejaka.id/seminar/register",
    languages: {
      "en-US": "https://rejaka.id/seminar/register",
      "id-ID": "https://rejaka.id/seminar/register?lang=id",
    },
  },
  other: {
    "event:start_time": "2025-09-26T09:30:00+07:00",
    "event:end_time": "2025-09-26T11:30:00+07:00",
    "event:location": "Arjuna Room, SMK Negeri 2 Depok, Sleman, Yogyakarta",
    "event:price": "Free",
    "event:category": "Education",
    "event:type": "Workshop",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "registration-required": "true",
    "instant-confirmation": "true",
    "qr-ticket": "true",
  },
};

export default function SeminarRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Event",
                "@id": "https://rejaka.id/seminar/register#event",
                name: "English Mini Seminar: Professionalism in Software Engineering - SDLC and Git Standards",
                description:
                  "Free workshop covering Software Development Life Cycle (SDLC) methodology and Git standards for professional software development. Learn industry best practices from certified experts.",
                url: "https://rejaka.id/seminar/register",
                image: {
                  "@type": "ImageObject",
                  url: "https://rejaka.id/assets/images/seminar/poster.png",
                  width: 400,
                  height: 600,
                  caption: "English Mini Seminar Event Poster",
                },
                startDate: "2025-09-26T09:30:00+07:00",
                endDate: "2025-09-26T11:30:00+07:00",
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode:
                  "https://schema.org/OfflineEventAttendanceMode",
                location: {
                  "@type": "Place",
                  name: "Arjuna Room, SMK Negeri 2 Depok",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "SMK Negeri 2 Depok",
                    addressLocality: "Sleman",
                    addressRegion: "Yogyakarta",
                    addressCountry: "Indonesia",
                  },
                },
                organizer: [
                  {
                    "@type": "Organization",
                    name: "SMK Negeri 2 Depok Sleman",
                    url: "https://smkn2depoksleman.sch.id",
                  },
                  {
                    "@type": "Person",
                    name: "Rejaka Abimanyu Susanto",
                    url: "https://rejaka.id",
                    jobTitle: "CITO of Slaviors, Web Developer",
                  },
                ],
                performer: [
                  {
                    "@type": "Person",
                    name: "Rizky Fauzan H.",
                    description: "Network Engineer (MTCNA & MTCTCE Certified)",
                    sameAs: ["https://linkedin.com/in/rizkyfauzanh"],
                  },
                  {
                    "@type": "Person",
                    name: "Rejaka Abimanyu Susanto",
                    description: "CITO of Slaviors, Web Developer",
                    url: "https://rejaka.id",
                    sameAs: [
                      "https://github.com/REZ3X",
                      "https://linkedin.com/in/rejaka-me",
                    ],
                  },
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "IDR",
                  availability: "https://schema.org/InStock",
                  url: "https://rejaka.id/seminar/register",
                  validFrom: "2025-01-01T00:00:00+07:00",
                  validThrough: "2025-09-26T09:30:00+07:00",
                },
                audience: {
                  "@type": "Audience",
                  audienceType: [
                    "Students",
                    "Programmers",
                    "Software Developers",
                    "IT Professionals",
                    "Computer Science Students",
                  ],
                },
                about: [
                  {
                    "@type": "Thing",
                    name: "Software Development Life Cycle (SDLC)",
                    description:
                      "Professional methodology for software development projects",
                  },
                  {
                    "@type": "Thing",
                    name: "Git Standards & Best Practices",
                    description:
                      "Version control best practices for collaborative development",
                  },
                  {
                    "@type": "Thing",
                    name: "Professional Development Workflow",
                    description:
                      "Industry-standard practices for software development teams",
                  },
                  {
                    "@type": "Thing",
                    name: "Industry Standards Implementation",
                    description:
                      "How to implement professional standards in software projects",
                  },
                ],
                educationalLevel: "Intermediate",
                inLanguage: "en-US",
                isAccessibleForFree: true,
                keywords: [
                  "SDLC",
                  "Git Standards",
                  "Software Engineering",
                  "Professional Development",
                  "Version Control",
                  "Programming Best Practices",
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://rejaka.id/seminar/register#webpage",
                url: "https://rejaka.id/seminar/register",
                name: "English Mini Seminar Registration - SDLC & Git Standards",
                description:
                  "Registration page for the English Mini Seminar on Software Engineering Professionalism",
                about: {
                  "@id": "https://rejaka.id/seminar/register#event",
                },
                mainEntity: {
                  "@id": "https://rejaka.id/seminar/register#event",
                },
                inLanguage: "en-US",
                isPartOf: {
                  "@type": "WebSite",
                  "@id": "https://rejaka.id/#website",
                },
              },
              {
                "@type": "Course",
                "@id": "https://rejaka.id/seminar/register#course",
                name: "Professionalism in Software Engineering: SDLC and Git Standards",
                description:
                  "Comprehensive workshop covering professional software development practices",
                provider: {
                  "@type": "Organization",
                  name: "SMK Negeri 2 Depok Sleman",
                },
                instructor: [
                  {
                    "@type": "Person",
                    name: "Rizky Fauzan H.",
                    description: "Network Engineer (MTCNA & MTCTCE)",
                  },
                  {
                    "@type": "Person",
                    name: "Rejaka Abimanyu Susanto",
                    description: "CITO of Slaviors, Web Developer",
                    url: "https://rejaka.id",
                  },
                ],
                courseCode: "EMS-SDLC-GIT-2025",
                educationalCredentialAwarded: "Certificate of Attendance",
                coursePrerequisites: "Basic programming knowledge recommended",
                timeRequired: "PT2H",
                inLanguage: "en-US",
                isAccessibleForFree: true,
                teaches: [
                  "Software Development Life Cycle methodology",
                  "Git version control best practices",
                  "Professional development workflow",
                  "Industry standards implementation",
                  "Code management strategies",
                  "Team collaboration practices",
                ],
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I register for the English Mini Seminar?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Click the 'NEW REGISTRATION' button, fill in your name, email, and create a 4-digit PIN. Your QR code ticket will be downloaded automatically after successful registration.",
                },
              },
              {
                "@type": "Question",
                name: "Is the seminar really free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the English Mini Seminar is completely free. There are no hidden fees or charges.",
                },
              },
              {
                "@type": "Question",
                name: "What topics will be covered in the seminar?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The seminar covers Software Development Life Cycle (SDLC), Git Standards & Best Practices, Professional Development Workflow, and Industry Standards Implementation.",
                },
              },
              {
                "@type": "Question",
                name: "Who are the speakers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Rizky Fauzan H. (Network Engineer with MTCNA & MTCTCE certifications) and Rejaka Abimanyu Susanto (CITO of Slaviors, Web Developer).",
                },
              },
              {
                "@type": "Question",
                name: "What if I lose my ticket?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Use the 'RE-DOWNLOAD TICKET' option with your registered name and PIN to download your ticket again.",
                },
              },
              {
                "@type": "Question",
                name: "When and where is the seminar?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Friday, September 26, 2025, from 09:30 - 11:30 AM WIB at Arjuna Room, SMK Negeri 2 Depok, Sleman, Yogyakarta.",
                },
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://rejaka.id",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Seminar",
                item: "https://rejaka.id/seminar",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Registration",
                item: "https://rejaka.id/seminar/register",
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
