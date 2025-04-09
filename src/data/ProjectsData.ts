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
        id: "portfolio",
        title: "Dev Portfolio",
        subtitle: "Personal developer portfolio built with Next.js",
        category: "web",
        emoji: "💼",
        description: [
          "A responsive developer portfolio showcasing my projects and skills with a unique terminal-inspired design. Built with Next.js and Tailwind CSS, featuring a fully responsive layout and interactive components.",
          "The design draws inspiration from terminal interfaces and system monitoring tools, creating a unique and memorable user experience that stands out from typical portfolios."
        ],
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        features: [
          "Terminal-inspired UI with custom ASCII art",
          "Real-time uptime counter",
          "Responsive design for all devices",
          "Interactive modals for detailed content",
          "Project showcase with filtering"
        ],
        year: 2023,
        links: [
          { label: "View Source", url: "https://github.com/username/portfolio", icon: "💻" },
          { label: "Live Demo", url: "https://portfolio.username.dev", icon: "🌐" }
        ]
      },
      {
        id: "ecommerce",
        title: "E-Commerce Platform",
        subtitle: "Full-featured online store with admin dashboard",
        category: "web",
        emoji: "🛒",
        description: [
          "A complete e-commerce solution built with React, Node.js, and MongoDB. Features include product management, user authentication, shopping cart, payment processing, and an admin dashboard.",
          "The platform is designed to be scalable and customizable, allowing for easy integration of new features and third-party services."
        ],
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Redux"],
        features: [
          "User authentication and profile management",
          "Product catalog with search and filtering",
          "Shopping cart and checkout process",
          "Payment processing with Stripe",
          "Order tracking and history",
          "Admin dashboard for product and order management"
        ],
        challenges: [
          {
            challenge: "Implementing real-time inventory updates to prevent overselling",
            solution: "Used WebSockets with Socket.io to push inventory changes to all connected clients in real-time"
          },
          {
            challenge: "Optimizing image loading for product catalogs",
            solution: "Implemented lazy loading, image compression, and a CDN for faster loading times"
          }
        ],
        year: 2022,
        links: [
          { label: "Demo", url: "https://ecommerce-demo.username.dev", icon: "🌐" },
          { label: "Case Study", url: "https://blog.username.dev/ecommerce-case-study", icon: "📝" }
        ]
      },
      {
        id: "digital-dreams",
        title: "Digital Dreams",
        subtitle: "A collection of science fiction short stories",
        category: "book",
        emoji: "📚",
        description: [
          "Digital Dreams is a collection of ten science fiction short stories exploring the intersection of technology and humanity. Each story examines how emerging technologies might shape our future society, relationships, and sense of self.",
          "The collection has received positive reviews for its imaginative yet grounded approach to speculative fiction, with a focus on character-driven narratives."
        ],
        technologies: ["Fiction Writing", "Self-Publishing", "Digital Distribution"],
        features: [
          "Available in ebook and print formats",
          "Audiobook version with professional narration",
          "Original cover art and interior illustrations"
        ],
        year: 2021,
        links: [
          { label: "Amazon", url: "https://amazon.com/digital-dreams", icon: "📱" },
          { label: "Goodreads", url: "https://goodreads.com/book/digital-dreams", icon: "📚" }
        ]
      },
      {
        id: "smart-home",
        title: "SmartHome Hub",
        subtitle: "IoT control center for connected devices",
        category: "mobile",
        emoji: "🏠",
        description: [
          "A cross-platform mobile application that serves as a central hub for controlling various smart home devices. Built with React Native and integrates with popular IoT platforms and protocols.",
          "The app features an intuitive interface that allows users to control lights, thermostats, security systems, and other connected devices from a single dashboard."
        ],
        technologies: ["React Native", "Redux", "Firebase", "MQTT", "IoT Protocols"],
        features: [
          "Universal control for multiple device brands",
          "Customizable dashboard and rooms",
          "Automated routines and schedules",
          "Voice control integration",
          "Energy usage monitoring and optimization"
        ],
        challenges: [
          {
            challenge: "Supporting diverse IoT protocols and devices",
            solution: "Created an adapter pattern architecture that allows for easy integration of new device types and protocols"
          }
        ],
        year: 2022,
        links: [
          { label: "App Store", url: "https://apps.apple.com/smarthome-hub", icon: "📱" },
          { label: "Google Play", url: "https://play.google.com/store/apps/smarthome-hub", icon: "🤖" }
        ]
      },
      {
        id: "data-viz",
        title: "DataViz Platform",
        subtitle: "Interactive data visualization tool",
        category: "web",
        emoji: "📊",
        description: [
          "A web-based data visualization platform that allows users to upload datasets and create interactive charts, graphs, and dashboards without coding knowledge.",
          "Built with D3.js and React, the platform supports a wide range of visualization types and customization options."
        ],
        technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "WebSockets"],
        features: [
          "Drag-and-drop interface for creating visualizations",
          "Support for various data formats (CSV, JSON, Excel)",
          "Real-time collaborative editing",
          "Interactive dashboards with filters and drill-downs",
          "Export and sharing options"
        ],
        year: 2023,
        links: [
          { label: "Try It", url: "https://dataviz.username.dev", icon: "🌐" }
        ]
      },
      {
        id: "code-quest",
        title: "Code Quest",
        subtitle: "Educational coding game for beginners",
        category: "game",
        emoji: "🎮",
        description: [
          "An educational game that teaches programming concepts through interactive puzzles and challenges. Aimed at beginners and young learners, the game introduces fundamental programming concepts in a fun and engaging way.",
          "Players progress through levels that gradually introduce new coding concepts, from basic sequencing to loops, conditionals, and functions."
        ],
        technologies: ["JavaScript", "Phaser.js", "HTML5 Canvas", "Web Audio API"],
        features: [
          "Progressive learning path for coding concepts",
          "Visual programming interface with blocks",
          "Transition to text-based coding in later levels",
          "Achievement system and progress tracking",
          "Shareable solutions and level creator"
        ],
        year: 2021,
        links: [
          { label: "Play Online", url: "https://codequest.username.dev", icon: "🎮" },
          { label: "Educational Resource", url: "https://codequest.username.dev/teachers", icon: "🍎" }
        ]
      }
    ]
  };