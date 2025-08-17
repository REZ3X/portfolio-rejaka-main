import type { Metadata } from "next";
import {
  getPostBySlug,
  type BlogPost,
  getAllPosts,
  getAllCategories,
} from "@/data/BlogData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Rejaka Abimanyu Susanto | Tech Blog",
      description:
        "The requested blog article could not be found. Browse other technical articles, tutorials, and insights on web development, programming, and modern technologies by Rejaka Abimanyu Susanto.",
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: "https://rejaka.id/blog",
      },
    };
  }

  const categoryPrefix = post.category ? `${post.category} - ` : "";
  const title = `${categoryPrefix}${post.title} | Rejaka Abimanyu Susanto | Tech Blog`;

  const description = `${post.excerpt} 📖 ${
    post.readingTime
  }-minute read by Rejaka Abimanyu Susanto. ${
    post.category ? `Learn ${post.category.toLowerCase()} with ` : ""
  }practical examples${
    post.tags?.length ? `, covering ${post.tags.slice(0, 3).join(", ")}` : ""
  }. Published ${new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}. Join the discussion with likes and comments.`;

  const url = `https://rejaka.id/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = post.lastModified
    ? new Date(post.lastModified).toISOString()
    : publishedTime;

  const generateKeywords = () => {
    const baseKeywords = [
      "Rejaka Abimanyu Susanto",
      "Rejaka Abimanyu blog",
      "rez3x tutorials",
      "rez3x blog",
      "xiannyaa blog",
      "abim tech blog",
      "rejaka.id blog",

      "Indonesia web developer blog",
      "Indonesian programmer articles",
      "Yogyakarta tech blog",
      "Southeast Asia developer content",
      "SMKN 2 Depok Sleman alumni blog",
      "Slaviors team blog",

      ...(post.tags || []),
      post.category || "Technology",
      `${post.category?.toLowerCase()} tutorial Indonesia`,
      `${post.category?.toLowerCase()} guide 2025`,
      `learn ${post.category?.toLowerCase()} with examples`,
    ];

    const contentKeywords = [
      ...post.title
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > 3),
      ...(post.tags || []).map((tag) => tag.toLowerCase()),
      `${post.category?.toLowerCase()} beginner tutorial`,
      `${post.category?.toLowerCase()} advanced guide`,
      `${post.category?.toLowerCase()} best practices`,
      `${post.category?.toLowerCase()} tips and tricks`,
    ];

    const longTailKeywords = [
      `how to ${post.title.toLowerCase()}`,
      `${post.title.toLowerCase()} step by step guide`,
      `${post.title.toLowerCase()} tutorial for beginners`,
      `${post.title.toLowerCase()} complete tutorial`,
      `${post.title.toLowerCase()} explained simply`,
      `${post.title.toLowerCase()} best practices 2025`,
      `${post.title.toLowerCase()} implementation guide`,
      `${post.title.toLowerCase()} with examples`,
      `learn ${post.title.toLowerCase()} fast`,
      `${post.title.toLowerCase()} comprehensive guide`,
    ];

    const techKeywords = [
      "Next.js tutorial Indonesia",
      "React development guide",
      "Node.js NVM tutorial",
      "Laravel PHP setup guide",
      "Windows installation tutorial",
      "Linux command line tutorial",
      "SQL database tutorial",
      "Web development tips Indonesia",
      "Programming tutorial Bahasa Indonesia",
      "Developer tools setup guide",
      "Modern web development",
      "Full stack development tutorial",
      "Database management tutorial",
      "JavaScript programming guide",
      "TypeScript development tutorial",
    ];

    const categoryKeywords = (() => {
      switch (post.category) {
        case "Tutorial":
          return [
            "step by step tutorial",
            "beginner programming tutorial",
            "developer education",
            "coding tutorial Indonesia",
            "web development learning",
            "programming guide",
            "technical tutorial",
            "developer resources",
          ];
        case "Story":
          return [
            "developer journey",
            "programming story",
            "career advice",
            "developer motivation",
            "tech industry insights",
            "programmer experience",
            "coding journey",
            "developer life",
          ];
        case "Tools":
          return [
            "developer tools",
            "free development tools",
            "programming utilities",
            "web development tools",
            "developer resources",
            "coding tools",
            "development workflow",
            "productivity tools",
          ];
        case "Project":
          return [
            "development project",
            "coding project",
            "web application",
            "programming project",
            "developer portfolio",
            "project showcase",
            "real world project",
            "coding example",
          ];
        case "Quotes":
          return [
            "motivational quotes",
            "developer quotes",
            "programming inspiration",
            "tech quotes",
            "coding motivation",
            "developer wisdom",
          ];
        default:
          return ["technology article", "tech content", "programming content"];
      }
    })();

    const interactiveKeywords = [
      "interactive blog",
      "blog with comments",
      "tech discussion",
      "developer community",
      "programming forum",
      "coding discussion",
      "tech blog Indonesia",
      "developer blog with likes",
      "shareable tech content",
      "engaging tech tutorial",
    ];

    const achievementKeywords = [
      "National Digital Hero Competition winner",
      "programming competition finalist",
      "award-winning developer blog",
      "competition-winning programmer",
      "tech competition participant",
      "hackathon developer",
      "programming contest winner",
      "student developer champion",
    ];

    return [
      ...baseKeywords,
      ...contentKeywords,
      ...longTailKeywords,
      ...techKeywords,
      ...categoryKeywords,
      ...interactiveKeywords,
      ...achievementKeywords,
    ].filter(Boolean);
  };

  return {
    title,
    description,
    keywords: generateKeywords(),
    authors: [
      {
        name: "Rejaka Abimanyu Susanto",
        url: "https://rejaka.id",
      },
    ],
    creator: "Rejaka Abimanyu Susanto",
    publisher: "Rejaka Abimanyu Susanto",
    category: post.category || "Technology",
    classification: "Educational Blog Article",
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
      title: title.length > 95 ? `${post.title} | Rejaka Abimanyu` : title,
      description:
        description.length > 300
          ? `${
              post.excerpt
            } Learn ${post.category?.toLowerCase()} with practical examples. ${
              post.readingTime
            }-min read by Rejaka Abimanyu Susanto.`
          : description,
      url,
      siteName: "Rejaka Abimanyu Susanto - Tech Blog & Tutorials",
      locale: "en_US",
      type: "article",
      publishedTime,
      modifiedTime,
      expirationTime: new Date(
        Date.now() + 2 * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      authors: ["Rejaka Abimanyu Susanto"],
      section: post.category || "Technology",
      tags: post.tags || [],
      images: [
        {
          url: post.coverImage
            ? `https://rejaka.id${post.coverImage}`
            : "https://rejaka.id/assets/images/blog/default-cover.webp",
          width: 1200,
          height: 630,
          alt: `${post.title} - Tutorial by Rejaka Abimanyu Susanto | ${
            post.category || "Tech"
          } Guide`,
          type: "image/webp",
        },
        {
          url: post.coverImage
            ? `https://rejaka.id${post.coverImage}`
            : "https://rejaka.id/assets/images/profile/rez3x.webp",
          width: 800,
          height: 600,
          alt: `${post.title} - Cover Image | Rejaka Abimanyu Blog`,
          type: "image/webp",
        },
        {
          url: post.coverImage
            ? `https://rejaka.id${post.coverImage}`
            : "https://rejaka.id/assets/images/profile/rez3x.webp",
          width: 400,
          height: 400,
          alt: `${post.title} - Square Preview`,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@rejaka",
      creator: "@rejaka",
      title: title.length > 70 ? `${post.title.substring(0, 67)}...` : title,
      description:
        description.length > 200
          ? `${post.excerpt.substring(0, 150)}... 📖 ${
              post.readingTime
            }-min read by @rejaka`
          : description,
      images: [
        {
          url: post.coverImage
            ? `https://rejaka.id${post.coverImage}`
            : "https://rejaka.id/assets/images/blog/default-cover.webp",
          alt: `${post.title} - Tutorial by Rejaka Abimanyu Susanto`,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
        "id-ID": `${url}?lang=id`,
      },
      types: {
        "application/rss+xml": "https://rejaka.id/rss.xml",
      },
    },
    other: {
      "article:author": "Rejaka Abimanyu Susanto",
      "article:publisher": "https://rejaka.id",
      "article:published_time": publishedTime,
      "article:modified_time": modifiedTime,
      "article:section": post.category || "Technology",
      "article:tag": (post.tags || []).join(", "),
      "article:opinion": "false",

      "og:updated_time": modifiedTime,
      "og:see_also": `https://rejaka.id/blog?modal=blogList&category=${encodeURIComponent(
        post.category || "Technology"
      )}`,

      "twitter:label1": "Reading time",
      "twitter:data1": `${post.readingTime} min read`,
      "twitter:label2": "Category",
      "twitter:data2": post.category || "Technology",

      "application-name": "Rejaka Abimanyu Blog",
      "apple-mobile-web-app-title": "Rejaka Blog",
      "msapplication-TileColor": "#e39fc2",
      "theme-color": "#2e1e2e",

      "content-language": "en-US",
      "content-type": "text/html; charset=utf-8",
      rating: "general",
      distribution: "global",
      "revisit-after": "7 days",

      interactive: "true",
      engagement: "comments,likes,sharing",
      "content-format": "tutorial,guide,educational",

      "blog-modal-support": "true",
      "blog-category-filtering": "true",
      "blog-search-enabled": "true",
    },
    appLinks: {
      web: {
        url: url,
        should_fallback: true,
      },
    },
  };
}

export function generateStructuredData(post: BlogPost) {
  const relatedPosts = getAllPosts()
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.category === post.category ||
          p.tags?.some((tag) => post.tags?.includes(tag)))
    )
    .slice(0, 5);

  const allCategories = getAllCategories();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://rejaka.id/blog/${post.slug}#article`,
        headline: post.title,
        alternativeHeadline: `${post.category || "Tech"} Tutorial: ${
          post.title
        }`,
        description: post.excerpt,
        abstract: `A comprehensive ${
          post.category?.toLowerCase() || "technology"
        } tutorial covering ${
          post.tags?.slice(0, 3).join(", ") || "key concepts"
        } with practical examples and best practices.`,
        image: {
          "@type": "ImageObject",
          "@id": `https://rejaka.id/blog/${post.slug}#primaryimage`,
          url: post.coverImage
            ? `https://rejaka.id${post.coverImage}`
            : "https://rejaka.id/assets/images/blog/default-cover.webp",
          width: 1200,
          height: 630,
          caption: `${post.title} - Tutorial Cover Image`,
          contentUrl: post.coverImage
            ? `https://rejaka.id${post.coverImage}`
            : "https://rejaka.id/assets/images/blog/default-cover.webp",
        },
        author: {
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
          },
          sameAs: [
            "https://github.com/REZ3X",
            "https://linkedin.com/in/rejaka-me",
            "https://twitter.com/rejaka",
            "https://rejaka.id",
          ],
          jobTitle: "Full-Stack Web Developer",
          description:
            "Award-winning full-stack developer specializing in modern web technologies, database engineering, and technical education.",
          knowsAbout: [
            ...(post.tags || []),
            "Web Development",
            "Full-Stack Development",
            "Database Engineering",
            "Technical Writing",
            "Programming Education",
          ],
          expertise: post.category || "Web Development",
          alumniOf: {
            "@type": "EducationalOrganization",
            name: "SMKN 2 Depok Sleman",
          },
          memberOf: {
            "@type": "Organization",
            name: "Slaviors Development Team",
          },
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://rejaka.id/#organization",
          name: "Rejaka Abimanyu Susanto Blog",
          alternateName: "rez3x Blog",
          url: "https://rejaka.id",
          logo: {
            "@type": "ImageObject",
            url: "https://rejaka.id/assets/images/profile/rez3x.webp",
            width: 800,
            height: 600,
          },
          sameAs: [
            "https://github.com/REZ3X",
            "https://linkedin.com/in/rejaka-me",
          ],
          foundingDate: "2024",
          description:
            "Professional blog featuring tutorials, guides, and insights on modern web development technologies.",
        },
        datePublished: new Date(post.date).toISOString(),
        dateModified: post.lastModified
          ? new Date(post.lastModified).toISOString()
          : new Date(post.date).toISOString(),
        dateCreated: new Date(post.date).toISOString(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://rejaka.id/blog/${post.slug}`,
          url: `https://rejaka.id/blog/${post.slug}`,
          name: post.title,
          description: post.excerpt,
          inLanguage: "en-US",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://rejaka.id/#website",
            url: "https://rejaka.id",
            name: "Rejaka Abimanyu Susanto Portfolio & Blog",
          },
          breadcrumb: {
            "@id": `https://rejaka.id/blog/${post.slug}#breadcrumb`,
          },
        },
        url: `https://rejaka.id/blog/${post.slug}`,
        identifier: `https://rejaka.id/blog/${post.slug}`,
        wordCount: post.readingTime * 250,
        timeRequired: `PT${post.readingTime}M`,
        articleSection: post.category || "Technology",
        articleBody: post.excerpt,
        keywords: post.tags?.join(", ") || "",
        inLanguage: "en-US",
        isAccessibleForFree: true,
        usageInfo: "https://rejaka.id/terms",
        copyrightHolder: {
          "@id": "https://rejaka.id/#person",
        },
        copyrightYear: new Date(post.date).getFullYear(),
        license: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
        genre: ["Technology", "Tutorial", "Guide", "Educational"],
        learningResourceType: ["Tutorial", "How-to Guide", "Reference"],
        educationalLevel: "Beginner to Intermediate",
        audience: {
          "@type": "Audience",
          audienceType: "Developers, Programmers, Tech Enthusiasts, Students",
          educationalRole: "student",
          geographicArea: "Global",
        },
        teaches: post.tags?.map((tag) => tag) || [
          post.category || "Web Development",
        ],
        about: {
          "@type": "Thing",
          name: post.category || "Web Development",
          description: `Learn about ${
            post.category?.toLowerCase() || "web development"
          } with practical examples and best practices`,
          sameAs: `https://en.wikipedia.org/wiki/${encodeURIComponent(
            post.category || "Web_development"
          )}`,
        },
        mentions:
          post.tags?.map((tag) => ({
            "@type": "Thing",
            name: tag,
            url: `https://rejaka.id/?modal=blogList&search=${encodeURIComponent(
              tag
            )}`,
          })) || [],
        citation: relatedPosts.map((relatedPost) => ({
          "@type": "CreativeWork",
          name: relatedPost.title,
          url: `https://rejaka.id/blog/${relatedPost.slug}`,
          author: {
            "@id": "https://rejaka.id/#person",
          },
        })),
        hasPart: [
          {
            "@type": "WebPageElement",
            "@id": `https://rejaka.id/blog/${post.slug}#content`,
            name: "Article Content",
            description: "Main article content with tutorial and examples",
          },
          {
            "@type": "WebPageElement",
            "@id": `https://rejaka.id/blog/${post.slug}#comments`,
            name: "Comments Section",
            description: "Reader comments and discussion",
          },
          {
            "@type": "WebPageElement",
            "@id": `https://rejaka.id/blog/${post.slug}#related`,
            name: "Related Articles",
            description: "Related blog posts and tutorials",
          },
          {
            "@type": "WebPageElement",
            "@id": `https://rejaka.id/blog/${post.slug}#interaction`,
            name: "Blog Interaction",
            description: "Like, share, and engagement features",
          },
        ],
        interactionStatistic: [
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/ReadAction",
            userInteractionCount: 0,
          },
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/LikeAction",
            userInteractionCount: post.likeCount || 0,
          },
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/CommentAction",
            userInteractionCount: post.commentCount || 0,
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://rejaka.id/blog/${post.slug}#breadcrumb`,
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
            name: "Blog",
            item: "https://rejaka.id/?modal=blogList",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.category || "Technology",
            item: `https://rejaka.id/?modal=blogList&category=${encodeURIComponent(
              post.category || "Technology"
            )}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: post.title,
            item: `https://rejaka.id/blog/${post.slug}`,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://rejaka.id/#website",
        url: "https://rejaka.id",
        name: "Rejaka Abimanyu Susanto Portfolio & Blog",
        description:
          "Professional portfolio and tech blog of Rejaka Abimanyu Susanto, featuring tutorials, guides, and insights on modern web development",
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://rejaka.id/?modal=blogList&search={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
          {
            "@type": "ReadAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://rejaka.id/blog/{article_slug}",
            },
          },
        ],
        author: {
          "@id": "https://rejaka.id/#person",
        },
        publisher: {
          "@id": "https://rejaka.id/#organization",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": "https://rejaka.id/#blogcollection",
        url: "https://rejaka.id/?modal=blogList",
        name: "Rejaka Abimanyu Susanto Blog Collection",
        description:
          "Browse all blog posts by categories and search functionality",
        hasPart: allCategories.map((category) => ({
          "@type": "CategoryPage",
          "@id": `https://rejaka.id/#blog-category-${category.toLowerCase()}`,
          url: `https://rejaka.id/?modal=blogList&category=${encodeURIComponent(
            category
          )}`,
          name: `${category} Articles`,
          description: `All ${category.toLowerCase()} articles by Rejaka Abimanyu Susanto`,
        })),
        mainEntity: {
          "@type": "Blog",
          name: "Rejaka Abimanyu Susanto Tech Blog",
          description:
            "Technical blog featuring tutorials, stories, and insights on web development",
        },
      },
      ...(post.tags?.includes("FAQ") ||
      post.title.toLowerCase().includes("how to")
        ? [
            {
              "@type": "FAQPage",
              "@id": `https://rejaka.id/blog/${post.slug}#faq`,
              mainEntity: [
                {
                  "@type": "Question",
                  name: `How to ${post.title
                    .toLowerCase()
                    .replace(/^how to /, "")}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: post.excerpt,
                  },
                },
              ],
            },
          ]
        : []),
    ],
  };
}
