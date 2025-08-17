import type { Metadata } from "next";
import { getPostBySlug, type BlogPost } from "@/data/BlogData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Rejaka Abimanyu | Web Developer",
      description: "The requested blog post could not be found.",
    };
  }

  const title = `${post.title} | Rejaka Abimanyu | Web Developer`;
  const description = post.excerpt;
  const url = `https://rejaka.id/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();

  return {
    title,
    description,
    keywords: [
      "Rejaka Abimanyu Susanto",
      "Web Development",
      "Programming Tutorial",
      "Next.js",
      "TypeScript",
      "Full Stack Developer",
      ...(post.tags || []),
      ...post.title.split(" ").filter((word) => word.length > 3),
    ],
    authors: [{ name: "Rejaka Abimanyu Susanto", url: "https://rejaka.id" }],
    creator: "Rejaka Abimanyu Susanto",
    publisher: "Rejaka Abimanyu Susanto",
    category: post.category || "Technology",
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
      title,
      description,
      url,
      siteName: "Rejaka Abimanyu Portfolio",
      locale: "en_US",
      type: "article",
      publishedTime,
      modifiedTime: post.lastModified
        ? new Date(post.lastModified).toISOString()
        : publishedTime,
      authors: ["Rejaka Abimanyu Susanto"],
      section: post.category || "Technology",
      tags: post.tags || [],
      images: [
        {
          url: post.coverImage
            ? `https://rejaka.id${post.coverImage}`
            : "https://rejaka.id/assets/images/profile/rez3x.webp",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@rejaka",
      images: [
        post.coverImage
          ? `https://rejaka.id${post.coverImage}`
          : "https://rejaka.id/assets/images/profile/rez3x.webp",
      ],
    },
    alternates: {
      canonical: url,
    },
    other: {
      "article:author": "Rejaka Abimanyu Susanto",
      "article:published_time": publishedTime,
      "article:modified_time": post.lastModified
        ? new Date(post.lastModified).toISOString()
        : publishedTime,
      "article:section": post.category || "Technology",
      "article:tag": (post.tags || []).join(", "),
    },
  };
}

export function generateStructuredData(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage
      ? `https://rejaka.id${post.coverImage}`
      : "https://rejaka.id/assets/images/profile/rez3x.webp",
    author: {
      "@type": "Person",
      name: "Rejaka Abimanyu Susanto",
      url: "https://rejaka.id",
      image: "https://rejaka.id/assets/images/profile/rez3x.webp",
      sameAs: [
        "https://github.com/REZ3X",
        "https://linkedin.com/in/rejaka-abimanyu-susanto-6713482b6",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Rejaka Abimanyu Susanto",
      url: "https://rejaka.id",
      logo: {
        "@type": "ImageObject",
        url: "https://rejaka.id/assets/images/profile/rez3x.webp",
      },
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.lastModified
      ? new Date(post.lastModified).toISOString()
      : new Date(post.date).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rejaka.id/blog/${post.slug}`,
    },
    url: `https://rejaka.id/blog/${post.slug}`,
    wordCount: post.readingTime * 200,
    timeRequired: `PT${post.readingTime}M`,
    articleSection: post.category || "Technology",
    keywords: post.tags || [],
    inLanguage: "en-US",
    isAccessibleForFree: true,
    genre: "Technology",
    about: {
      "@type": "Thing",
      name: post.category || "Web Development",
    },
  };
}
