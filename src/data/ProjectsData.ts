interface ProjectLink {
  label: string;
  url?: string;
  icon: string;
  downloadPath?: string;
  type?: "url" | "download";
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
      id: "v0id-app",
      title: "V0ID ChatBot",
      subtitle: "A motherly girlfriend chatbot",
      category: "mobile",
      emoji: "📱",
      description: [
        "V0ID ChatBot is a mobile application designed to provide users with a unique and engaging chatbot experience. The app features a motherly girlfriend chatbot that interacts with users in a friendly and supportive manner.",
        "The chatbot is capable of holding natural conversations, providing emotional support, and offering personalized recommendations based on user preferences.",
      ],
      technologies: [
        "Java",
        "Smali",
        "Next.js",
        "TypeScript",
        "MongoDB",
        "Tailwind CSS",
      ],
      features: [
        "Natural Language Processing: Understands and responds to user queries",
        "Personalized Conversations: Tailors responses based on user interactions",
        "Emotional Support: Provides comforting and encouraging messages",
        "User Preferences: Learns from user interactions to improve responses",
      ],
      year: 2025,
      links: [
        {
          label: "Download APK",
          downloadPath: "/v0id_files/v0idApp-06.apk",
          icon: "📥",
          type: "download",
        },
      ],
    },
    {
      id: "jamak",
      title: "JaMak: Jaringan Masyarakat (Community Network)",
      subtitle: "A community network project for rural areas",
      category: "web",
      emoji: "🌐",
      description: [
        "JaMak is a community network project aimed at improving connectivity and access to information in rural areas. It leverages local resources and community engagement to create a sustainable network infrastructure.",
        "The project focuses on providing essential services such as education, healthcare, and agriculture support through digital platforms.",
      ],
      technologies: [
        "Next.js",
        "ImageKit",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
      ],
      features: [
        "Community Engagement: Involves local communities in network management",
        "Digital Literacy: Provides training and resources for local users",
        "Sustainable Development: Supports local economies through digital initiatives",
      ],
      year: 2025,
      links: [
        {
          label: "Live Website",
          url: "https://jamak.web.id",
          icon: "🌐",
          type: "url",
        },
      ],
    },
    {
      id: "voidboard",
      title: "VoidBoard - Anonymous Image Board",
      subtitle: "A platform for anonymous image sharing",
      category: "web",
      emoji: "🌐",
      description: [
        "VoidBoard is an anonymous image board that allows users to share and discuss images without revealing their identities. The platform is designed to foster open communication and creativity while maintaining user privacy.",
        "Users can post images, comment on others' posts, and engage in discussions without the fear of being judged or identified.",
      ],
      technologies: [
        "Next.js",
        "ImageKit",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
      ],
      features: [
        "Anonymous Posting: Users can share images without revealing their identity",
        "Discussion Threads: Engage in conversations around shared images",
        "User Privacy: Focus on maintaining user anonymity and security",
        "Responsive Design: Optimized for both desktop and mobile devices",
      ],
      year: 2025,
      links: [
        {
          label: "Live Website",
          url: "https://void-board.vercel.app/",
          icon: "🌐",
          type: "url",
        },
      ],
    },
    {
      id: "wa-bots",
      title: "Void X Bot",
      subtitle: "A WhatsApp automation bot with AI integration",
      category: "bot",
      emoji: "🤖",
      description: [
        "Void X Bot is a feature-rich WhatsApp bot built to automate various tasks and enhance group communication. It integrates with Google Gemini AI to provide intelligent responses and image generation capabilities.",
        "The bot offers over 30 commands for media processing, entertainment, utility functions, information retrieval, and file conversions - all accessible through a simple command interface.",
      ],
      technologies: [
        "Node.js",
        "Baileys",
        "Google Gemini API",
        "FFmpeg",
        "ImageMagick",
      ],
      features: [
        "Media Processing: Convert images to stickers and back",
        "AI Integration: Chat with AI, generate and edit images",
        "Entertainment: Truth or dare games, compatibility tests",
        "Utility: Weather updates, earthquake alerts, currency conversion",
        "Downloads: YouTube and TikTok video/audio retrieval",
        "File Conversion: Convert documents to various formats",
      ],
      year: 2025,
      links: [
        {
          label: "GitHub Repository",
          url: "https://github.com/REZ3X/whatsapp-bot",
          icon: "📦",
          type: "url",
        },
      ],
    },
    {
      id: "archive",
      title: "ArcHive Cloud Notes",
      subtitle: "A cloud-based note-taking app, beta version",
      category: "web",
      emoji: "📝",
      description: [
        "ArcHive is a cloud-based note-taking application designed to help users organize and manage their notes efficiently. It offers features like real-time collaboration, rich text editing, and seamless synchronization across devices.",
        "The beta version focuses on core functionalities, with plans for additional features based on user feedback.",
      ],
      technologies: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
      features: [
        "Cloud synchronization for notes",
        "Secure user authentication",
        "Fast and responsive UI",
      ],
      year: 2025,
      links: [
        {
          label: "Live Website",
          url: "https://archivenotes.site",
          icon: "🌐",
          type: "url",
        },
      ],
    },
    {
      id: "gachapon",
      title: "Gachapon Website",
      subtitle: "A tool for randomized item generation",
      category: "web",
      emoji: "🎲",
      description: [
        "Gachapon is a web application that allows users to generate randomized items based on predefined categories. It is designed for gaming and entertainment purposes, providing users with a fun way to discover new items.",
        "The website features a user-friendly interface and customizable settings for generating items.",
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
        {
          label: "Live Website",
          url: "https://gachapon.rejaka.me",
          icon: "📱",
          type: "url",
        },
      ],
    },
    {
      id: "tasis",
      title: "TaSis Website",
      subtitle: "A website for school organization",
      category: "web",
      emoji: "🏫",
      description: [
        "TaSis is a website developed for a school organization, providing information about the organization, its activities, and resources for students.",
        "The website features a clean design and easy navigation to enhance user experience.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      features: [
        "Profile and activity pages",
        "Responsive design for mobile and desktop",
        "Easy-to-use content management system",
      ],
      year: 2025,
      links: [
        {
          label: "Demo",
          url: "https://tasistemporary.rejaka.me",
          icon: "🌐",
          type: "url",
        },
      ],
    },
    {
      id: "idea",
      title: "Idea Web by Rejaka",
      subtitle: "A collection of my creative ideas",
      category: "web",
      emoji: "💡",
      description: [
        "Idea Web is a personal project where I share my creative ideas, thoughts, and inspirations. It serves as a platform for self-expression and creativity.",
        "The website features a blog-style layout with categories for easy navigation.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      features: [
        "Place when ideas come to mind",
        "Easy navigation through categories",
        "Responsive design for mobile and desktop",
      ],
      year: 2025,
      links: [
        {
          label: "Live Website",
          url: "https://idea.rejaka.me",
          icon: "📱",
          type: "url",
        },
      ],
    },
  ],
};
