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
      //  challenges: [
      //    {
      //      challenge: "Implementing real-time inventory updates to prevent overselling",
      //      solution: "Used WebSockets with Socket.io to push inventory changes to all connected clients in real-time"
      //    },
      //    {
      //      challenge: "Optimizing image loading for product catalogs",
      //      solution: "Implemented lazy loading, image compression, and a CDN for faster loading times"
      //    }
      //  ],
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