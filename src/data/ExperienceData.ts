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
  experienceIntro:
    "My professional journey has allowed me to work on a diverse set of projects across different domains, with a focus on web development and user experience.",

  achievementsIntro:
    "Throughout my career, I've been recognized for my contributions to projects, communities, and the tech industry at large.",

  experience: [
    {
      title: "Volunteer Security Personnel",
      company: "Student Discipline Team, SMKN 2 Depok Sleman",
      period: "Sep 2024 – Present",
      responsibilities: [
        "Monitored student activities and ensured school safety during events",
        "Assisted in crowd control and managed access during school functions",
        "Collaborated with disciplinarians to handle incidents efficiently",
        "Maintained order and enforced school regulations",
      ],
    },
    {
      title: "Coordinator – Student Discipline Team",
      company: "SMKN 2 Depok Sleman",
      period: "Sep 2024 – Present",
      responsibilities: [
        "Led and coordinated volunteer security team activities",
        "Organized scheduling and communication among team members",
        "Acted as liaison between school administration and volunteers",
        "Mentored new volunteers on procedures and protocols",
      ],
    },
    {
      title: "Web Developer – Karyasija (Volunteer)",
      company: "SMKN 2 Depok Sleman",
      period: "Jun 2025 – Present",
      responsibilities: [
        "Contributed to development and maintenance of school website",
        "Implemented responsive layouts and backend logic",
        "Collaborated with faculty to update content and features",
        "Ensured site performance and accessibility standards",
      ],
      technologies: ["Next.js", "MongoDB", "Tailwind CSS", "JavaScript"],
    },
    {
      title: "Chief Technology Officer",
      company: "Slaviors",
      period: "Oct 2024 – Present",
      responsibilities: [
        "Lead the development of high-performance web applications using Next.js and MongoDB",
        "Design and implement API routes, database schemas, and scalable system architectures",
        "Conduct code reviews to ensure maintainability, quality, and adherence to best practices",
        "Oversee deployment processes, establish CI/CD pipelines, and manage release schedules",
      ],
      technologies: [
        "Next.js",
        "React",
        "MongoDB",
        "TypeScript",
        "API Routes",
        "Node.js",
        "System Architecture",
      ],
    },
    {
      title: "Web Developer Apprenticeship",
      company: "PT. ITHO INDOSTOCK",
      period: "Jul 2024 – Dec 2024",
      responsibilities: [
        "Focused on frontend development in enterprise standards",
        "Built UI components and pages using React and Tailwind CSS",
        "Participated in chatbot integration for customer support",
        "Assisted with deployment and server-side configuration",
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
      ],
    },
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      period: "Dec 2023 – Present",
      responsibilities: [
        "Designed and delivered full-stack web solutions for clients",
        "Collaborated with designers on intuitive user interfaces",
        "Implemented responsive designs and optimized site performance",
        "Provided maintenance, updates, and enhancements post-launch",
      ],
      technologies: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "MySQL",
        "MongoDB",
      ],
    },
  ],

  achievements: [
    {
      title: "Finalist – Web Development, National Competition Silogy Expo",
      issuer:
        "Himpunan Mahasiswa Sistem Informasi, Universitas Singaperbangsa Karawang",
      year: "2025",
      description:
        "Selected as a finalist in the national-level Silogy Expo web development competition, highlighting innovation and frontend proficiency.",
    },
    {
      title: "Top 10 – ByProject Student Web Dev Competition",
      issuer: "Universitas Teknologi Yogyakarta",
      year: "2025",
      description:
        "Secured a position among the top ten student teams in the ByProject Web Development category, demonstrating strong coding and collaborative skills.",
    },
    {
      title: "Finalist – Sagasitas Web Building Competition",
      issuer: "Sagasitas Indonesia",
      year: "2024",
      description:
        "Led development of an accessibility‑focused web application, earning finalist status in the national Web Building competition.",
    },
    {
      title: "1st Place – National Digital Hero Competition",
      issuer: "PT. ITHO INDOSTOCK",
      year: "2024",
      description:
        "Awarded first place for deploying an AI‑powered solution addressing a real company problem in the National Digital Hero competition.",
    },
  ],
};
