import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Professional Resume - Rejaka Abimanyu Susanto | Full-Stack Developer & Database Engineer",
  description:
    "Download the professional resume of Rejaka Abimanyu Susanto - Award-winning full-stack web developer and database engineer from Yogyakarta, Indonesia. Specializing in Next.js, React, TypeScript, MongoDB, and modern web technologies. Winner of National Digital Hero Competition 2024 and multiple programming competitions. Available for hire for web development projects, internships, and full-time positions.",
  keywords: [
    "Rejaka Abimanyu Susanto resume",
    "Rejaka Abimanyu CV download",
    "Full-Stack Developer resume Indonesia",
    "Web Developer CV Yogyakarta",
    "Database Engineer resume",
    "Next.js Developer resume",
    "React Developer CV",
    "TypeScript Developer resume",

    "MongoDB Developer resume",
    "JavaScript programmer CV",
    "Node.js developer resume",
    "API Developer resume",
    "Frontend Developer resume",
    "Backend Developer resume",
    "Tailwind CSS developer",
    "Responsive web design specialist",
    "Progressive Web Apps developer",
    "JAMstack developer resume",

    "Slaviors team lead resume",
    "Programming competition winner",
    "Hackathon participant CV",
    "Web development freelancer",
    "Software engineering intern",
    "SMKN 2 Depok Sleman graduate",
    "Vocational school graduate",

    "National Digital Hero Competition winner",
    "Sagasitas Web Building Competition finalist",
    "Silogy Expo competition finalist",
    "ByProject competition top 10",
    "Programming award winner",
    "Web development competition finalist",

    "Junior developer resume",
    "Entry level programmer CV",
    "Fresh graduate developer",
    "Indonesia software engineer",
    "Southeast Asia developer",
    "Remote developer resume",
    "Freelance web developer CV",

    "Yogyakarta web developer resume",
    "Indonesia programmer CV",
    "Java Island developer",
    "Special Region Yogyakarta",
    "Sleman developer resume",

    "Modern web technologies",
    "Full-stack development skills",
    "Database optimization specialist",
    "API integration expert",
    "Performance optimization specialist",
    "SEO optimization developer",
    "Mobile-first development",
    "Cross-browser compatibility",
    "Version control Git",
    "Agile development methodology",

    "Available for hire",
    "Open to opportunities",
    "Seeking internship",
    "Entry level position",
    "Junior developer role",
    "Web development intern",
    "Software engineering position",
    "Remote work available",
    "Freelance projects",
    "Contract developer",

    "SIJA major graduate",
    "System Information Network Application",
    "Vocational high school",
    "Technical education background",
    "Computer science student",
    "Information technology education",

    "Team leadership experience",
    "Project management skills",
    "Communication skills",
    "Problem solving abilities",
    "Analytical thinking",
    "Creative problem solver",
    "Detail oriented developer",
    "Fast learner programmer",

    "Portfolio website developer",
    "Personal project showcase",
    "Open source contributor",
    "GitHub profile",
    "LinkedIn professional",
    "Tech blog writer",
    "Tutorial creator",
    "Community contributor",

    "hire full stack developer Indonesia",
    "experienced Next.js developer for hire",
    "professional web developer resume download",
    "award winning programmer CV",
    "skilled database engineer resume",
    "competitive programming participant",
    "modern web development specialist",
    "responsive design expert resume",
    "API development specialist CV",
    "performance optimization developer resume",
  ],
  authors: [
    {
      name: "Rejaka Abimanyu Susanto",
      url: "https://rejaka.id",
    },
  ],
  creator: "Rejaka Abimanyu Susanto",
  publisher: "Rejaka Abimanyu Susanto",
  category: "Professional Resume",
  classification: "Resume/CV",
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
      "Resume - Rejaka Abimanyu Susanto | Award-Winning Full-Stack Developer",
    description:
      "Professional resume of Rejaka Abimanyu Susanto - Award-winning full-stack web developer and database engineer from Yogyakarta, Indonesia. Winner of National Digital Hero Competition 2024. Specializing in Next.js, React, TypeScript, MongoDB. Available for hire.",
    url: "https://rejaka.id/resume",
    siteName: "Rejaka Abimanyu Susanto - Professional Resume",
    images: [
      {
        url: "/assets/images/resume/resume-preview.webp",
        width: 1200,
        height: 630,
        alt: "Rejaka Abimanyu Susanto Professional Resume Preview",
        type: "image/webp",
      },
      {
        url: "/assets/images/profile/rez3x.webp",
        width: 800,
        height: 600,
        alt: "Rejaka Abimanyu Susanto - Professional Photo",
        type: "image/webp",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rejaka",
    creator: "@rejaka",
    title: "Resume - Rejaka Abimanyu Susanto | Full-Stack Developer",
    description:
      "Professional resume of award-winning full-stack developer from Indonesia. Specializing in modern web technologies. Winner of multiple programming competitions. Available for hire.",
    images: ["/assets/images/resume/resume-preview.webp"],
  },
  alternates: {
    canonical: "https://rejaka.id/resume",
    languages: {
      "en-US": "https://rejaka.id/resume",
      "id-ID": "https://rejaka.id/resume?lang=id",
    },
    media: {
      "only screen and (max-width: 600px)":
        "https://rejaka.id/resume?mobile=true",
    },
  },
  other: {
    "profile:first_name": "Rejaka",
    "profile:last_name": "Abimanyu Susanto",
    "profile:username": "rez3x",
    "profile:gender": "male",
    "og:profile:first_name": "Rejaka",
    "og:profile:last_name": "Abimanyu Susanto",
    "og:profile:username": "rez3x",
    "twitter:label1": "Experience",
    "twitter:data1": "2+ years",
    "twitter:label2": "Location",
    "twitter:data2": "Yogyakarta, Indonesia",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
  },
};

export default function ResumeLayout({
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
                "@type": "Person",
                "@id": "https://rejaka.id/resume#person",
                name: "Rejaka Abimanyu Susanto",
                alternateName: ["rez3x", "abim", "xiannyaa"],
                url: "https://rejaka.id",
                image: {
                  "@type": "ImageObject",
                  url: "https://rejaka.id/assets/images/profile/rez3x.webp",
                  width: 800,
                  height: 600,
                },
                sameAs: [
                  "https://github.com/REZ3X",
                  "https://linkedin.com/in/rejaka-me",
                  "https://twitter.com/rejaka",
                ],
                jobTitle: "Full-Stack Web Developer",
                description:
                  "Award-winning full-stack web developer and database engineer specializing in modern web technologies",
                email: "abim@rejaka.id",
                telephone: "+62-xxx-xxxx-xxxx",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Yogyakarta",
                  addressRegion: "Special Region of Yogyakarta",
                  addressCountry: "Indonesia",
                },
                birthPlace: {
                  "@type": "Place",
                  name: "Indonesia",
                },
                nationality: "Indonesian",
                hasOccupation: [
                  {
                    "@type": "Occupation",
                    name: "Full-Stack Web Developer",
                    description:
                      "Developing modern web applications using Next.js, React, TypeScript, and MongoDB",
                    skills: [
                      "Next.js Development",
                      "React Development",
                      "TypeScript Programming",
                      "MongoDB Database Design",
                      "API Development",
                      "Frontend Development",
                      "Backend Development",
                      "Database Optimization",
                      "Performance Optimization",
                      "SEO Implementation",
                    ],
                    occupationLocation: {
                      "@type": "City",
                      name: "Yogyakarta, Indonesia",
                    },
                  },
                  {
                    "@type": "Occupation",
                    name: "Database Engineer",
                    description:
                      "Designing and optimizing database systems for web applications",
                    skills: [
                      "MongoDB Administration",
                      "Database Schema Design",
                      "Query Optimization",
                      "Data Modeling",
                      "Performance Tuning",
                    ],
                  },
                ],
                knowsAbout: [
                  "Web Development",
                  "Full-Stack Development",
                  "Next.js",
                  "React",
                  "TypeScript",
                  "JavaScript",
                  "Node.js",
                  "MongoDB",
                  "Database Engineering",
                  "API Development",
                  "Frontend Development",
                  "Backend Development",
                  "Tailwind CSS",
                  "Progressive Web Apps",
                  "SEO Optimization",
                  "Performance Optimization",
                  "Responsive Design",
                  "Git Version Control",
                  "Agile Methodology",
                ],
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
                award: [
                  {
                    "@type": "Award",
                    name: "1st Place National Digital Hero Competition",
                    description:
                      "Winner of national-level competition for innovative digital solutions",
                    dateAwarded: "2024",
                    issuedBy: {
                      "@type": "Organization",
                      name: "PT.ITHO INDOSTOCK",
                    },
                  },
                  {
                    "@type": "Award",
                    name: "Finalist Sagasitas Web Building Competition",
                    description:
                      "Finalist in national web development competition",
                    dateAwarded: "2024",
                    issuedBy: {
                      "@type": "Organization",
                      name: "Sagasitas Indonesia",
                    },
                  },
                  {
                    "@type": "Award",
                    name: "Top 10 ByProject Student Web Dev Competition",
                    description:
                      "Top 10 finalist in student web development category",
                    dateAwarded: "2025",
                    issuedBy: {
                      "@type": "Organization",
                      name: "Universitas Teknologi Yogyakarta",
                    },
                  },
                  {
                    "@type": "Award",
                    name: "Finalist Silogy Expo Web Development Competition",
                    description:
                      "Finalist in national web development competition",
                    dateAwarded: "2025",
                    issuedBy: {
                      "@type": "Organization",
                      name: "Himpunan Mahasiswa Sistem Informasi Universitas Singaperbangsa Karawang",
                    },
                  },
                ],
                worksFor: [
                  {
                    "@type": "Organization",
                    name: "Slaviors Development Team",
                    description:
                      "Lead developer in professional web development team",
                    url: "https://rejaka.id",
                  },
                  {
                    "@type": "Organization",
                    name: "Freelance",
                    description:
                      "Independent full-stack web developer providing custom web solutions",
                  },
                ],
                seeks: {
                  "@type": "Demand",
                  description:
                    "Seeking opportunities in full-stack web development, internships, entry-level positions, and freelance projects",
                },
              },
              {
                "@type": "WebPage",
                "@id": "https://rejaka.id/resume#webpage",
                url: "https://rejaka.id/resume",
                name: "Professional Resume - Rejaka Abimanyu Susanto",
                description:
                  "Professional resume and CV of Rejaka Abimanyu Susanto, full-stack web developer",
                about: {
                  "@id": "https://rejaka.id/resume#person",
                },
                mainEntity: {
                  "@id": "https://rejaka.id/resume#person",
                },
                inLanguage: "en-US",
                isPartOf: {
                  "@type": "WebSite",
                  "@id": "https://rejaka.id/#website",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
