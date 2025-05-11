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
      company: "TaSis Pandhawa",
      period: "2024 - Present",
      responsibilities: [
        "Monitored event areas to ensure the safety and security of attendees",
        "Assisted in crowd control and managed access points during community events",
        "Collaborated with team members to handle emergency situations efficiently",
        "Provided support in maintaining order and enforcing rules at venues",
      ],
    },
    {
      title: "Freelance Web Developer",
      company: "",
      period: "2023 - Present",
      responsibilities: [
        "Developed and maintained websites for various clients",
        "Collaborated with designers to create user-friendly interfaces",
        "Implemented responsive designs and optimized performance",
        "Provided ongoing support and updates for existing projects",
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
    {
      title: "Web Developer Apprenticeship",
      company: "PT. ITHO INDOSTOCK",
      period: "2023 - 2024",
      responsibilities: [
        "Developed a web application for the company",
        "Worked closely with the main developer team",
        "Participated in chatbot development for customer support",
        "Learned about server management and deployment processes",
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "react",
        "tailwindcss",
        "Next.js",
      ],
    },
  ],

  achievements: [
    {
      title: "Top Ten Team in Student Coding Competition",
      issuer: "Fusiontech by Yogyakarta Tech University",
      year: "2025",
      description:
        "Participated in a coding competition and secured a spot in the top ten teams, showcasing my problem-solving skills and teamwork.",
    },
    {
      title: "Finalist in Web Building Competition",
      issuer: "GSS by Sagasitas",
      year: "2024",
      description:
        "Lead developer for an accessibility-focused web application that won first place in the annual showcase.",
    },
    {
      title: "1st Place in National Digital Hero Competition (KPDN)",
      issuer: "PT. ITHO INDOSTOCK",
      year: "2023",
      description:
        "My team awarded 1st place in the National Digital Hero Competition, showcasing our innovative solution for a company problem using AI technology.",
    },
  ],
};
