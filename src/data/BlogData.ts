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
    slug: "hiddenServiceTutorial",
    title:
      "Deploy Hidden Service Web in Linux: The Complete Guide (with Vanity .onion Domains)",
    date: "2025-08-31",
    excerpt:
      "Complete tutorial for deploying web applications as Tor hidden services on Linux. Learn nginx reverse proxy setup, Tor configuration, and generating custom vanity .onion domains for professional anonymous web services.",
    coverImage: "/blog/posts/hiddenServiceTutorial/cover.webp",
    readingTime: 22,
    tags: [
      "Tor",
      "Hidden Service",
      "Privacy",
      "Linux",
      "Nginx",
      "Security",
      "Onion Service",
      "Anonymous Web",
      "Vanity Domain",
    ],
    category: "Tutorial",
    lastModified: "2025-08-31",
  },
  {
    slug: "workEthicsCultureSlaviors",
    title: "Work Ethics & Culture in Tech Teams: Inside Slaviors Development",
    date: "2025-08-26",
    excerpt:
      "An inside look at how Slaviors built a strong work culture and ethical framework from programming competition origins to professional development team. Learn about organizational structure, communication patterns, development processes, and sustainable team practices.",
    coverImage: "/blog/posts/workEthicsCultureSlaviors/cover.png",
    readingTime: 18,
    tags: [
      "Work Culture",
      "Team Management",
      "Tech Ethics",
      "Remote Work",
      "Professional Development",
      "Team Building",
      "Slaviors",
      "Startup Culture",
    ],
    category: "Story",
    lastModified: "2025-08-26",
  },
  {
    slug: "CIA",
    title:
      "CIA Triad Explained: The Foundation of Cybersecurity (with Real Case Studies)",
    date: "2025-08-25",
    excerpt:
      "A comprehensive guide to understanding the CIA Triad - Confidentiality, Integrity, and Availability. Learn cybersecurity fundamentals with real-world case studies including the BSI ransomware attack analysis.",
    coverImage: "",
    readingTime: 15,
    tags: [
      "Cybersecurity",
      "CIA Triad",
      "Information Security",
      "Case Study",
      "Risk Management",
    ],
    category: "Guide",
    lastModified: "2025-08-25",
  },
  {
    slug: "DataFlowDiagram",
    title: "Data Flow Diagram (DFD) Explained with Examples",
    date: "2025-08-22",
    excerpt:
      "A comprehensive guide to understanding Data Flow Diagrams (DFD) for system analysis and design. Learn DFD symbols, levels, and how to create effective diagrams for inventory systems.",
    coverImage: "",
    readingTime: 12,
    tags: [
      "DFD",
      "System Analysis",
      "Data Flow",
      "System Design",
      "Documentation",
    ],
    category: "Guide",
    lastModified: "2025-08-22",
  },
  {
    slug: "databaseNormalization",
    title: "Database Normalization Explained (with Examples)",
    date: "2025-08-22",
    excerpt:
      "A comprehensive guide to understanding database normalization concepts, from 1NF to BCNF. Learn why organizing data properly matters and how to avoid common database design pitfalls.",
    coverImage: "",
    readingTime: 7,
    tags: [
      "Database",
      "Normalization",
      "SQL",
      "Data Structure",
      "Database Design",
    ],
    category: "Guide",
    lastModified: "2025-08-22",
  },
  {
    slug: "secretChat",
    title: "Need for Private Room Chat that Completely Secure and Encrypted?",
    date: "2025-08-19",
    excerpt:
      "In today's digital age, the need for secure and private communication has never been more critical. With the rise of surveillance and data breaches, individuals are seeking solutions that offer complete privacy and encryption.",
    coverImage: "/blog/posts/secretChat/cover.png",
    readingTime: 10,
    tags: ["GhostChat", "Privacy", "Security", "Encryption"],
    category: "Project",
    lastModified: "2025-08-19",
  },
  {
    slug: "gvmInstall",
    title: "How to Install Go Version Manager (GVM) on Linux",
    date: "2025-08-19",
    excerpt:
      "Step-by-step guide to installing Go Version Manager (GVM) on Linux. Perfect for managing multiple Go versions.",
    coverImage: "/blog/posts/gvmInstall/cover.png",
    readingTime: 10,
    tags: ["Go", "GVM", "Linux", "Development"],
    category: "Tutorial",
    lastModified: "2025-08-19",
  },
  {
    slug: "nvmWindows",
    title: "Installing Node Version Manager (NVM) and Node.js on Windows",
    date: "2025-07-27",
    excerpt:
      "Step-by-step guide to installing Node Version Manager (NVM) and Node.js on Windows.",
    coverImage: "/blog/posts/nvmWindows/cover.webp",
    readingTime: 20,
    tags: ["Windows", "NVM", "Node.js", "Installation", "Tutorial"],
    category: "Tutorial",
    lastModified: "2025-07-27",
  },
  {
    slug: "laravelSetup",
    title: "Laravel Starter Kit, Composer, and PHP Setup on Linux Debian",
    date: "2025-07-26",
    excerpt:
      "Step-by-step guide to installing PHP, Composer, and Laravel Starter Kit on Linux Debian. Perfect for setting up your development environment.",
    coverImage: "/blog/posts/laravelSetup/cover.png",
    readingTime: 20,
    tags: [
      "Linux",
      "Debian",
      "PHP",
      "Composer",
      "Laravel",
      "Installation",
      "Tutorial",
      "Web Development",
      "Setup",
    ],
    category: "Tutorial",
    lastModified: "2025-07-26",
  },
  {
    slug: "windows10Tutorial",
    title:
      "Installing Windows 10 [error_encrypted_permission error] (Bonus: Installing Autodesk EAGLE)",
    date: "2025-07-20",
    excerpt:
      "Step-by-step guide to installing Windows 10 [error_encrypted_permission error], plus bonus tips for installing Autodesk EAGLE.",
    coverImage: "/blog/posts/windows10Tutorial/cover.jpeg",
    readingTime: 25,
    tags: [
      "Windows 10",
      "Installation",
      "Tutorial",
      "Permssion Error",
      "Autodesk EAGLE",
    ],
    category: "Tutorial",
    lastModified: "2025-07-20",
  },
  {
    slug: "digitalConfess",
    title: "Want to Confess Your Feeling? But Don't Know How?",
    date: "2025-07-10",
    excerpt: "Confessing your feeling through Lofess",
    coverImage: "/blog/posts/digitalConfess/cover.png",
    readingTime: 3,
    tags: ["Confession", "Lofess", "Feelings", "Relationships"],
    category: "Project",
    lastModified: "2025-07-10",
  },
  {
    slug: "randomMusicQuotes",
    title: "Random Music Quotes",
    date: "2025-07-09",
    excerpt: "A curated list of random music quotes.",
    coverImage: "/blog/posts/randomMusicQuotes/cover.jpg",
    readingTime: 5,
    tags: ["Music", "Quotes"],
    category: "Quotes",
    lastModified: "2025-07-09",
  },
  {
    slug: "freeDevServices",
    title: "Free Services Every Developer Should Know About",
    date: "2025-07-09",
    excerpt:
      "A curated list of free services and tools that can supercharge your development workflow without spending a dime.",
    coverImage: "/blog/posts/freeDevServices/tools.jpg",
    readingTime: 6,
    tags: [
      "Free Tools",
      "Developer Resources",
      "Web Development",
      "APIs",
      "Productivity",
    ],
    category: "Tools",
    lastModified: "2025-07-09",
  },
  {
    slug: "semesterBreakProjects",
    title: "What I Built During My Semester Break",
    date: "2025-07-08",
    excerpt:
      "While everyone else hit the beach, I opened my laptop and wrote code. Here's what I built during my semester break—from competitions to client work, passion projects, and portfolio updates..",
    coverImage: "/blog/posts/semesterBreakProjects/cover.jpg",
    readingTime: 6,
    tags: ["Projects", "Developer Story", "Portfolio", "Career"],
    category: "Story",
    lastModified: "2025-07-08",
  },
  {
    slug: "myWebDevJourney",
    title: "How I Got into Web Development: My Journey",
    date: "2025-07-07",
    excerpt:
      "Discover my journey into web development, from my first lines of code to becoming a professional developer. Tips and insights for aspiring developers.",
    coverImage: "",
    readingTime: 8,
    tags: ["Journey", "Career", "Developer Story", "Motivation"],
    category: "Story",
    lastModified: "2025-07-07",
  },
  {
    slug: "slaviorsNow",
    title: "The Story of Slaviors for Now",
    date: "2025-07-05",
    excerpt:
      "This is the latest story of Slaviors, a team, a group, a professonal developer, and a community.",
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
    excerpt:
      "Learn how to set up and work with SQL databases for your web applications. Complete guide covering MySQL setup, table creation, and basic operations.",
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
    excerpt:
      "A comprehensive guide to working with directories and files in the Linux command line. Learn essential commands for file management.",
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
    excerpt:
      "How to manage multiple Node.js versions with NVM on Linux. Step-by-step installation and usage guide.",
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
    excerpt:
      "Step-by-step guide to creating a functional calculator application with Next.js and React. Perfect for beginners learning React.",
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
    excerpt:
      "Your first steps with Next.js: setup, configuration and building your first app. Complete beginner's guide to Next.js framework.",
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
  return blogPosts
    .filter((post) => post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllCategories(): string[] {
  const categories = Array.from(
    new Set(
      blogPosts
        .map((post) => post.category)
        .filter((category): category is string => category !== undefined)
    )
  );
  return categories.sort();
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        post.category?.toLowerCase().includes(lowercaseQuery)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
