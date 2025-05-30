interface ProjectLink {
    label: string;
    url: string;
    icon: string;
  }
  
  interface ProjectChallenge {
    challenge: string;
    solution: string;
  }
  
  interface Project {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    thumbnail?: string;
    emoji?: string;
    description: string[];
    technologies: string[];
    features?: string[];
    challenges?: ProjectChallenge[];
    links?: ProjectLink[];
    year: number;
  }
  
  interface ProjectsDataType {
    projects: Project[];
  }
  
  export const projectsData: ProjectsDataType = {
    projects: [
      {
        id: "wa-bots",
        title: "Void X Bot",
        subtitle: "A WhatsApp automation bot with AI integration",
        category: "bot",
        emoji: "🤖",
        description: [
          "Void X Bot is a feature-rich WhatsApp bot built to automate various tasks and enhance group communication. It integrates with Google Gemini AI to provide intelligent responses and image generation capabilities.",
          "The bot offers over 30 commands for media processing, entertainment, utility functions, information retrieval, and file conversions - all accessible through a simple command interface."
        ],
        technologies: ["Node.js", "Baileys", "Google Gemini API", "FFmpeg", "ImageMagick"],
        features: [
          "Media Processing: Convert images to stickers and back",
          "AI Integration: Chat with AI, generate and edit images",
          "Entertainment: Truth or dare games, compatibility tests",
          "Utility: Weather updates, earthquake alerts, currency conversion",
          "Downloads: YouTube and TikTok video/audio retrieval",
          "File Conversion: Convert documents to various formats"
        ],
        year: 2025,
        links: [
          { label: "GitHub Repository", url: "https://github.com/REZ3X/whatsapp-bot", icon: "📦" }
        ]
      },
      {
        id: "archive",
        title: "ArcHive Cloud Notes",
        subtitle: "A cloud-based note-taking app, beta version",
        category: "web",
        emoji: "📝",
        description: [
          "ArcHive is a cloud-based note-taking application designed to help users organize and manage their notes efficiently. It offers features like real-time collaboration, rich text editing, and seamless synchronization across devices.",
          "The beta version focuses on core functionalities, with plans for additional features based on user feedback."
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        features: [
          "Cloud synchronization for notes",
          "Secure user authentication",
          "Fast and responsive UI",
        ],
        year: 2025,
        links: [
          { label: "Live Website", url: "https://archivenotes.site", icon: "🌐" }
        ]
      },
      {
        id: "gachapon",
        title: "Gachapon Website",
        subtitle: "A tool for randomized item generation",
        category: "web",
        emoji: "🎲",
        description: [
          "Gachapon is a web application that allows users to generate randomized items based on predefined categories. It is designed for gaming and entertainment purposes, providing users with a fun way to discover new items.",
          "The website features a user-friendly interface and customizable settings for generating items."
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PWA"],
        features: [
          "Randomized item generation",
          "User-friendly interface",
          "Customizable settings for item categories",
          "Progressive Web App (PWA) for offline access",
        ],
        year: 2025,
        links: [
          { label: "Live Website", url: "https://gachapon.rejaka.me", icon: "📱" },
        ]
      },
      {
        id: "tasis",
        title: "TaSis Website",
        subtitle: "A website for school organization",
        category: "web",
        emoji: "🏫",
        description: [
          "TaSis is a website developed for a school organization, providing information about the organization, its activities, and resources for students.",
          "The website features a clean design and easy navigation to enhance user experience."
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        features: [
          "Profile and activity pages",
          "Responsive design for mobile and desktop",
          "Easy-to-use content management system",
        ],
        year: 2025,
        links: [
          { label: "Demo", url: "https://tasistemporary.rejaka.me", icon: "🌐" },
        ]
      },
      {
        id: "idea",
        title: "Idea Web by Rejaka",
        subtitle: "A collection of my creative ideas",
        category: "web",
        emoji: "💡",
        description: [
          "Idea Web is a personal project where I share my creative ideas, thoughts, and inspirations. It serves as a platform for self-expression and creativity.",
          "The website features a blog-style layout with categories for easy navigation."
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        features: [
          "Place when ideas come to mind",
          "Easy navigation through categories",
          "Responsive design for mobile and desktop",
        ],
        year: 2025,
        links: [
          { label: "Live Website", url: "https://idea.rejaka.me", icon: "📱" },
        ]
      },
    ]
  };