import { UserAlias } from '@/context/UserContext';

interface AboutSection {
  title: string;
  content: string[];
}

export interface AboutDataType {
  title: string;
  subtitle: string;
  tags: string[];
  name: string;
  sections: AboutSection[];
  quote?: {
    text: string;
    author?: string;
  };
}

const baseAboutData: AboutDataType = {
  title: "Base Profile",
  subtitle: "Default profile information",
  tags: ["Web", "Development", "Technology"],
  name: "About Me",
  sections: [
    {
      title: "My Journey",
      content: [
        "I started my journey three years ago, driven by a fascination with creating interactive experiences on the web. What began as a curiosity quickly evolved into a passion.",
        "Coming from a varied background, I bring a unique perspective that emphasizes both functionality and aesthetics. I believe in creating intuitive and enjoyable experiences."
      ]
    },
    {
      title: "My Approach",
      content: [
        "I'm committed to quality work that stands the test of time. I embrace modern practices and methodologies to produce the best results.",
        "Accessibility and inclusivity are central to my philosophy. I believe that what I create should be usable by everyone, regardless of their abilities or backgrounds."
      ]
    },
    {
      title: "Current Focus",
      content: [
        "Currently, I'm deepening my knowledge in areas that interest me and exploring new techniques and technologies.",
        "When I'm not working, I enjoy contributing to projects, writing, and mentoring. I believe in the power of knowledge sharing and community building."
      ]
    }
  ]
};

export const aboutDataByUser: Record<UserAlias, AboutDataType> = {
  rez3x: {
    ...baseAboutData,
    title: "Growing Web Developer",
    subtitle: "Passionate about creating accessible, responsive web experiences with modern technologies",
    tags: ["Programming", "Web Development", "Server"],
    sections: [
      {
        title: "My Journey",
        content: [
          "I began my journey as a web developer two years ago, driven by a fascination with creating interactive experiences on the web. What started as a curiosity quickly evolved into a passion for building accessible and responsive web applications.",
          "Coming from a usual student background, I bring a unique perspective that emphasizes both functionality and aesthetics. I believe in creating intuitive and enjoyable experiences for users."
        ]
      },
      {
        title: "My Approach",
        content: [
          "I'm committed to built quality web applications that stand the test of time. I embrace modern practices and methodologies, such as Agile development and continuous integration, to produce the best results.",
          "Compactibility and inclusivity are central to my philosophy. I believe that what I create should be usable by everyone, regardless of their abilities or backgrounds. I strive to follow best practices in web accessibility (WCAG) and responsive design."
        ]
      },
      {
        title: "Current Focus",
        content: [
          "Currently, I'm deepening my knowledge of Next.js and TypeScript, exploring new techniques and technologies in the React ecosystem. I'm particularly interested in server-side rendering, static site generation, and building scalable applications.",
          "When I'm not coding, I enjoy creatve works as Xiannyaa or doing academic research as Abim. I believe in the power of knowledge sharing and community building, and I try to actively contribute to open-source projects and participate in local tech meetups."
        ]
      }
    ],
    quote: {
      text: "Code is poetry — not because it rhymes, but because every line hides intention, emotion, and a secret waiting to be understood.",
      author: "Unknown"
    }
  },
  abim: {
    ...baseAboutData,
    title: "Curious Academic",
    subtitle: "Driven by curiosity, guided by knowledge, and grounded in lifelong learning",
    tags: ["Mathematics", "Language", "Critical Thinking", "Academia"],
    sections: [
      {
        title: "My Journey",
        content: [
          "Since a young age, I've been captivated by the pursuit of understanding — not just the 'how' but the 'why' behind everything. This curiosity led me into the world of academic exploration, where each subject became a lens for deeper thought.",
          "From analyzing the structure of language to unraveling the elegance of mathematical patterns, I've always been drawn to subjects that challenge the mind and sharpen reasoning."
        ]
      },
      {
        title: "My Approach",
        content: [
          "I approach learning with a mindset of discipline, reflection, and synthesis. I don’t just memorize — I seek to internalize, to find connections across ideas, and to question assumptions.",
          "Whether preparing for exams or engaging in academic writing, I emphasize clarity, structure, and a deep understanding of the material. I value dialogue, feedback, and constant refinement of thought."
        ]
      },
      {
        title: "Current Focus",
        content: [
          "Right now, I’m delving deeper into advanced mathematics, philosophical logic, and linguistics. These subjects, while diverse, each offer powerful frameworks for understanding systems — from equations to human communication.",
          "Beyond coursework, I enjoy tutoring, writing reflections on what I learn, and participating in academic forums. I believe that teaching others reinforces your own mastery, and that learning is most alive when shared."
        ]
      }
    ],
    quote: {
      text: "Real learning is not about filling your mind with facts — it’s about training your mind to think.",
      author: "Unknown"
    }
  },
  xiannyaa: {
    ...baseAboutData,
    title: "Creative Authir",
    subtitle: "Crafting digital narratives that blend technology with artistic expression",
    tags: ["Writing","Storytelling", "Mixed Media"],
    sections: [
      {
        title: "My Journey",
        content: [
          "My creative journey began as a child sketching dreamscapes on the backs of homework sheets — long before I discovered how digital tools could breathe life into imagination.",
        ]
      },
      {
        title: "My Approach",
        content: [
          "As an author, I’m fascinated by how narrative structure mirrors the human experience — nonlinear, textured, and alive with possibility.",
          "I believe in the power of stories to connect, inspire, and transform. My creative process involves both structured planning and intuitive exploration, allowing space for unexpected discoveries.",
          "I'm particularly interested in how interactive elements can enhance storytelling, giving audiences agency while guiding them through carefully crafted emotional journeys."
        ]
      },
      {
        title: "Current Focus",
        content: [
          "I'm currently working on a series of digital novels that blend traditional storytelling with interactive elements, exploring themes of identity, memory, and the nature of reality.",
          "Alongside my creative projects, I run workshops on digital storytelling and mentor emerging creators who want to blend technical and artistic skills in their work."
        ]
      }
    ],
    quote: {
      text: "Art is how we decorate space; stories are how we decorate time.",
      author: "Unknwon"
    }
  }
};