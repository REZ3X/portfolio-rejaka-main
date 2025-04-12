export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  readingTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "databaseSQL",
    title: "Working With SQL Databases",
    date: "2025-02-07",
    excerpt:
      "Learn how to set up and work with SQL databases for your web applications",
    coverImage: "/blog/posts/databaseSQL/databases.png",
    readingTime: 8,
  },
  {
    slug: "dirAndFile",
    title: "Understanding Directories and Files in Linux",
    date: "2025-02-03",
    excerpt:
      "A guide to working with directories and files in the command line",
    coverImage: "/blog/posts/dirAndFile/cmd.png",
    readingTime: 5,
  },
  {
    slug: "nvmTutorial",
    title: "Node Version Manager (NVM) Tutorial Linux",
    date: "2025-02-03",
    excerpt: "How to manage multiple Node.js versions with NVM",
    coverImage: "/blog/posts/nvmTutorial/nvm.png",
    readingTime: 6,
  },
  {
    slug: "simpleCalculator",
    title: "Building a Simple Calculator with Next.js",
    date: "2025-02-05",
    excerpt:
      "Step-by-step guide to creating a calculator application with Next.js",
    coverImage: "/blog/posts/simpleCalculator/calc.png",
    readingTime: 10,
  },
  {
    slug: "startingNextJS",
    title: "Getting Started with Next.js",
    date: "2025-02-03",
    excerpt:
      "Your first steps with Next.js: setup, configuration and first app",
    coverImage: "/blog/posts/startingNextJS/nextBannerTemplate.png",
    readingTime: 7,
  },
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
