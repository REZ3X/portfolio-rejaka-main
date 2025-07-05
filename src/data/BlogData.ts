export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  readingTime: number;
  tags?: string[];
  category?: string; 
  lastModified?: string; 
}

export const blogPosts: BlogPost[] = [
  {
    slug: "databaseSQL",
    title: "Working With SQL Databases",
    date: "2025-02-07",
    excerpt: "Learn how to set up and work with SQL databases for your web applications. Complete guide covering MySQL setup, table creation, and basic operations.",
    coverImage: "/blog/posts/databaseSQL/databases.png",
    readingTime: 8,
    tags: ["SQL", "Database", "MySQL", "Backend", "Tutorial"],
    category: "Database",
    lastModified: "2025-02-07",
  },
  {
    slug: "dirAndFile",
    title: "Understanding Directories and Files in Linux",
    date: "2025-02-03",
    excerpt: "A comprehensive guide to working with directories and files in the Linux command line. Learn essential commands for file management.",
    coverImage: "/blog/posts/dirAndFile/cmd.png",
    readingTime: 5,
    tags: ["Linux", "Command Line", "File Management", "Terminal", "Tutorial"],
    category: "Linux",
    lastModified: "2025-02-03",
  },
  {
    slug: "nvmTutorial",
    title: "Node Version Manager (NVM) Tutorial Linux",
    date: "2025-02-03",
    excerpt: "How to manage multiple Node.js versions with NVM on Linux. Step-by-step installation and usage guide.",
    coverImage: "/blog/posts/nvmTutorial/nvm.png",
    readingTime: 6,
    tags: ["Node.js", "NVM", "Linux", "JavaScript", "Development Tools"],
    category: "Development Tools",
    lastModified: "2025-02-03",
  },
  {
    slug: "simpleCalculator",
    title: "Building a Simple Calculator with Next.js",
    date: "2025-02-05",
    excerpt: "Step-by-step guide to creating a functional calculator application with Next.js and React. Perfect for beginners learning React.",
    coverImage: "/blog/posts/simpleCalculator/calc.png",
    readingTime: 10,
    tags: ["Next.js", "React", "JavaScript", "Tutorial", "Web Development"],
    category: "Web Development",
    lastModified: "2025-02-05",
  },
  {
    slug: "startingNextJS",
    title: "Getting Started with Next.js",
    date: "2025-02-03",
    excerpt: "Your first steps with Next.js: setup, configuration and building your first app. Complete beginner's guide to Next.js framework.",
    coverImage: "/blog/posts/startingNextJS/nextBannerTemplate.png",
    readingTime: 7,
    tags: ["Next.js", "React", "Web Development", "JavaScript", "Tutorial"],
    category: "Web Development",
    lastModified: "2025-02-03",
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
