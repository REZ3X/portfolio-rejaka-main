interface Experience {
    title: string;
    company: string;
    period: string;
    responsibilities: string[];
    technologies?: string[];
  }
  
  interface Achievement {
    title: string;
    issuer: string;
    year: string;
    description: string;
  }
  
  interface ExperienceDataType {
    experienceIntro: string;
    achievementsIntro: string;
    experience: Experience[];
    achievements: Achievement[];
  }
  
  export const experienceData: ExperienceDataType = {
    experienceIntro: "My professional journey has allowed me to work on a diverse set of projects across different domains, with a focus on web development and user experience.",
    achievementsIntro: "Throughout my career, I've been recognized for my contributions to projects, communities, and the tech industry at large.",
    
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "TechInnovate Solutions",
        period: "2021 - Present",
        responsibilities: [
          "Lead a team of 5 developers implementing React-based front-end architecture",
          "Introduced TypeScript to improve code quality, reducing bugs by 35%",
          "Collaborated with design teams to develop responsive, accessible user interfaces",
          "Conducted code reviews and mentored junior developers"
        ],
        technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]
      },
      {
        title: "Full Stack Developer",
        company: "Digital Dynamics Inc.",
        period: "2018 - 2021",
        responsibilities: [
          "Developed and maintained multiple customer-facing web applications",
          "Implemented RESTful APIs and microservices architecture",
          "Reduced page load times by 60% through performance optimization",
          "Collaborated with cross-functional teams in an agile environment"
        ],
        technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "React", "Docker"]
      },
      {
        title: "Web Developer Intern",
        company: "StartUp Innovations",
        period: "2017 - 2018",
        responsibilities: [
          "Assisted in front-end development for a web-based project management tool",
          "Implemented responsive UI components and animations",
          "Collaborated with senior developers to learn best practices",
          "Participated in daily stand-ups and sprint planning meetings"
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap"]
      }
    ],
    
    achievements: [
      {
        title: "Open Source Contributor of the Year",
        issuer: "OSS Community Alliance",
        year: "2023",
        description: "Recognized for significant contributions to React ecosystem projects and developer tooling libraries."
      },
      {
        title: "Best Web Application Award",
        issuer: "Regional Tech Conference",
        year: "2022",
        description: "Lead developer for an accessibility-focused web application that won first place in the annual showcase."
      },
      {
        title: "Technology Innovation Certificate",
        issuer: "Digital Transformation Institute",
        year: "2021",
        description: "Awarded for developing an innovative approach to real-time data visualization for complex datasets."
      },
      {
        title: "Top Technical Writer",
        issuer: "Dev.to Platform",
        year: "2020",
        description: "Recognized as a top contributor for technical articles focused on modern JavaScript and React best practices."
      }
    ]
  };