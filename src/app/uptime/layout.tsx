import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Status Dashboard - Time-Shifted Infrastructure Monitoring | Rejaka Abimanyu Susanto",
  description:
    "Time-shifted monitoring dashboard for rejaka.id infrastructure. Track server uptime, response times, and performance metrics for REZ3X, CYX, and XIAN servers. Professional server monitoring with 24/7 availability tracking, historical data, and performance analytics.",
  keywords: [
    "server monitoring dashboard",
    "time-shifted uptime tracking",
    "infrastructure monitoring",
    "server status page",
    "performance metrics dashboard",
    "network uptime monitoring",
    "server health check",
    "website monitoring service",
    
    "rejaka.id server status",
    "REZ3X server monitoring",
    "CYX server uptime",
    "XIAN server metrics",
    "Cloudflare Workers monitoring",
    "API server status",
    "web server monitoring",
    "database server health",
    
    "DevOps monitoring tools",
    "system administration dashboard",
    "network operations center",
    "infrastructure observability",
    "server performance analytics",
    "uptime percentage tracking",
    "response time monitoring",
    "service level monitoring",
    
    "terminal dashboard design",
    "command line interface monitoring",
    "technical monitoring interface",
    "developer monitoring tools",
    "professional status page",
    "modern monitoring dashboard",
    "responsive monitoring interface",
    "time-shifted data visualization",
    
    "24/7 server monitoring",
    "automatic health checks",
    "historical uptime data",
    "performance trend analysis",
    "server availability metrics",
    "downtime tracking system",
    "reliability monitoring",
    "service availability dashboard",
    
    "Rejaka Abimanyu Susanto",
    "full stack developer monitoring",
    "professional infrastructure",
    "web developer tools",
    "portfolio server monitoring",
    "technical expertise demonstration",
    "system reliability engineering",
    "monitoring best practices",
  ],
  authors: [
    {
      name: "Rejaka Abimanyu Susanto",
      url: "https://rejaka.id",
    },
  ],
  creator: "Rejaka Abimanyu Susanto",
  publisher: "Rejaka Abimanyu Susanto",
  category: "Technology",
  classification: "Server Monitoring Dashboard",
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
    title: "Server Status Dashboard - Time-Shifted Infrastructure Monitoring | Rejaka.id",
    description:
      "Professional server monitoring dashboard tracking rejaka.id infrastructure in time-shifted manner. Monitor uptime, response times, and performance metrics for REZ3X, CYX, and XIAN servers with 24/7 availability tracking.",
    url: "https://rejaka.id/uptime",
    siteName: "Rejaka Abimanyu Susanto - Infrastructure Monitoring",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/uptime/dashboard-preview.webp",
        width: 1200,
        height: 630,
        alt: "Server Status Dashboard - Time-shifted monitoring interface showing uptime metrics",
        type: "image/webp",
      },
      {
        url: "/assets/images/uptime/monitoring-terminal.webp",
        width: 800,
        height: 600,
        alt: "Terminal-style server monitoring dashboard with performance metrics",
        type: "image/webp",
      },
      {
        url: "/assets/images/profile/rez3x.webp",
        width: 400,
        height: 400,
        alt: "Rejaka Abimanyu Susanto - Infrastructure Engineer",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rejaka",
    creator: "@rejaka",
    title: "Server Status Dashboard - Time-Shifted Infrastructure Monitoring",
    description:
      "Professional monitoring dashboard for rejaka.id infrastructure. Track server uptime, response times, and performance metrics in time-shifted manner with historical data analysis.",
    images: ["/assets/images/uptime/dashboard-preview.webp"],
  },
  alternates: {
    canonical: "https://rejaka.id/uptime",
    languages: {
      "en-US": "https://rejaka.id/uptime",
    },
  },
  other: {
    "monitoring-type": "time-shifted",
    "dashboard-style": "terminal",
    "update-frequency": "30-seconds",
    "data-retention": "50-checks-per-server",
    "monitoring-provider": "cloudflare-workers",
    
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#00adb4",
    "theme-color": "#060a10",
    
    "og:monitoring:servers": "3",
    "og:monitoring:frequency": "5-minutes",
    "og:monitoring:retention": "50-checks",
    "og:dashboard:theme": "terminal",
    "og:dashboard:responsive": "true",
    
    "twitter:label1": "Servers",
    "twitter:data1": "3 monitored",
    "twitter:label2": "Updates",
    "twitter:data2": "Every 30s",
  },
};

export default function UptimeLayout({
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
                "@type": "WebPage",
                "@id": "https://rejaka.id/uptime#webpage",
                url: "https://rejaka.id/uptime",
                name: "Server Status Dashboard - Time-Shifted Infrastructure Monitoring",
                description:
                  "Professional server monitoring dashboard for rejaka.id infrastructure with time-shifted uptime tracking, performance metrics, and historical data analysis",
                about: {
                  "@id": "https://rejaka.id/uptime#monitoring-service",
                },
                mainEntity: {
                  "@id": "https://rejaka.id/uptime#monitoring-service",
                },
                inLanguage: "en-US",
                isPartOf: {
                  "@type": "WebSite",
                  "@id": "https://rejaka.id/#website",
                },
                breadcrumb: {
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
                      name: "Server Status",
                      item: "https://rejaka.id/uptime",
                    },
                  ],
                },
              },
              {
                "@type": "MonitoringService",
                "@id": "https://rejaka.id/uptime#monitoring-service",
                name: "Rejaka.id Infrastructure Monitoring",
                description:
                  "Time-shifted server monitoring service tracking uptime, response times, and performance metrics for rejaka.id infrastructure",
                url: "https://rejaka.id/uptime",
                provider: {
                  "@type": "Person",
                  "@id": "https://rejaka.id/#person",
                  name: "Rejaka Abimanyu Susanto",
                },
                serviceType: "Infrastructure Monitoring",
                availableChannel: {
                  "@type": "ServiceChannel",
                  serviceUrl: "https://rejaka.id/uptime",
                  serviceSmsNumber: null,
                  servicePhone: null,
                },
                areaServed: {
                  "@type": "Place",
                  name: "Global",
                },
                hoursAvailable: "24/7",
                offers: {
                  "@type": "Offer",
                  description: "Free time-shifted server monitoring dashboard",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://rejaka.id/uptime#dashboard",
                name: "Server Status Dashboard",
                description:
                  "Terminal-style monitoring dashboard for tracking server infrastructure",
                applicationCategory: "Monitoring Dashboard",
                operatingSystem: "Web Browser",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                author: {
                  "@type": "Person",
                  "@id": "https://rejaka.id/#person",
                },
                softwareVersion: "1.0",
                datePublished: "2025-01-01",
                features: [
                  "Time-shifted server monitoring",
                  "Historical uptime data",
                  "Response time tracking",
                  "Performance analytics",
                  "Terminal-style interface",
                  "Mobile responsive design",
                ],
              },
              {
                "@type": "Dataset",
                "@id": "https://rejaka.id/uptime#monitoring-data",
                name: "Server Monitoring Data",
                description:
                  "Historical server performance and uptime data for rejaka.id infrastructure",
                creator: {
                  "@type": "Person",
                  "@id": "https://rejaka.id/#person",
                },
                publisher: {
                  "@type": "Person",
                  "@id": "https://rejaka.id/#person",
                },
                datePublished: "2025-01-01",
                dateModified: new Date().toISOString(),
                keywords: [
                  "server monitoring",
                  "uptime data",
                  "performance metrics",
                  "response times",
                ],
                distribution: {
                  "@type": "DataDownload",
                  encodingFormat: "application/json",
                  contentUrl: "https://server-uptime.rejaka.id/latest",
                },
                measurementTechnique: "HTTP health checks",
                variableMeasured: [
                  "Server uptime percentage",
                  "HTTP response time",
                  "HTTP status codes",
                  "Server availability",
                ],
                temporalCoverage: "2025-01-01/..",
                spatialCoverage: {
                  "@type": "Place",
                  name: "Indonesia",
                },
              },
              {
                "@type": "TechArticle",
                "@id": "https://rejaka.id/uptime#documentation",
                headline: "Server Infrastructure Monitoring Implementation",
                description:
                  "Technical implementation of time-shifted server monitoring using Cloudflare Workers and modern web technologies",
                author: {
                  "@type": "Person",
                  "@id": "https://rejaka.id/#person",
                },
                datePublished: "2025-01-01",
                dateModified: new Date().toISOString(),
                keywords: [
                  "Cloudflare Workers",
                  "Server Monitoring",
                  "Time-shifted Dashboard",
                  "Infrastructure Monitoring",
                  "DevOps",
                ],
                about: [
                  "Server monitoring implementation",
                  "Time-shifted data visualization",
                  "Infrastructure automation",
                  "Performance tracking",
                ],
                educationalLevel: "Advanced",
                audience: {
                  "@type": "Audience",
                  audienceType: ["Developers", "DevOps Engineers", "System Administrators"],
                },
                programmingLanguage: ["JavaScript", "TypeScript"],
                runtimePlatform: ["Cloudflare Workers", "Next.js"],
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}