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
  likeCount?: number;
  commentCount?: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "myWebDevJourney",
    title: "How I Got into Web Development: My Journey",
    date: "2025-07-07",
    excerpt: "Discover my journey into web development, from my first lines of code to becoming a professional developer. Tips and insights for aspiring developers.",
    coverImage: "/blog/posts/myWebDevJourney/journey.jpg",
    readingTime: 8,
    tags: ["Journey", "Career", "Developer Story", "Motivation"],
    category: "Story",
    lastModified: "2025-07-07",
  },
  {
    slug: "slaviorsNow",
    title: "The Story of Slaviors for Now",
    date: "2025-07-05",
    excerpt: "This is the latest story of Slaviors, a team, a group, a professonal developer, and a community.",
    coverImage: "/blog/posts/slaviorsNow/slaviors2.jpg",
    readingTime: 5,
    tags: ["Story", "Slaviors", "Team", "Community"],
    category: "Story",
    lastModified: "2025-07-05",
  },
  {
    slug: "databaseSQL",
    title: "Working With SQL Databases",
    date: "2025-02-07",
    excerpt: "Learn how to set up and work with SQL databases for your web applications. Complete guide covering MySQL setup, table creation, and basic operations.",
    coverImage: "/blog/posts/databaseSQL/databases.png",
    readingTime: 6,
    tags: ["SQL", "Database", "MySQL", "Backend", "Tutorial"],
    category: "Tutorial",
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
    category: "Tutorial",
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
    category: "Tutorial",
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
    category: "Tutorial",
    lastModified: "2025-02-05",
  },
  {
    slug: "startingNextJS",
    title: "Getting Started with Next.js",
    date: "2025-02-03",
    excerpt: "Your first steps with Next.js: setup, configuration and building your first app. Complete beginner's guide to Next.js framework.",
    coverImage: "/blog/posts/startingNextJS/nextBannerTemplate.png",
    readingTime: 5,
    tags: ["Next.js", "React", "Web Development", "JavaScript", "Tutorial"],
    category: "Tutorial",
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

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAllCategories(): string[] {
  const categories = Array.from(
    new Set(
      blogPosts
        .map(post => post.category)
        .filter((category): category is string => category !== undefined)
    )
  );
  return categories.sort();
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category?.toLowerCase().includes(lowercaseQuery)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}