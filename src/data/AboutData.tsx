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
    tags: ["React", "TypeScript", "Node.js", "UI/UX", "Accessibility"],
    sections: [
      {
        title: "My Journey",
        content: [
          "I started my journey as a web developer three years ago, driven by a fascination with creating interactive experiences on the web. What began as a curiosity quickly evolved into a passion for crafting clean, efficient, and user-friendly applications.",
          "Coming from a background in design, I bring a unique perspective to development that emphasizes both functionality and aesthetics. I believe that great software should not only work flawlessly but also provide an intuitive and enjoyable experience for users."
        ]
      },
      {
        title: "My Approach",
        content: [
          "I'm committed to writing clean, maintainable code that stands the test of time. I embrace modern development practices like test-driven development, continuous integration, and agile methodologies.",
          "Accessibility is central to my development philosophy. I believe the web should be usable by everyone, regardless of their abilities or devices they use. This commitment drives me to learn and implement best practices for creating inclusive digital experiences."
        ]
      },
      {
        title: "Current Focus",
        content: [
          "Currently, I'm deepening my knowledge of React and TypeScript while exploring server-side rendering and static site generation with Next.js. I'm also interested in state management solutions and performance optimization techniques.",
          "When I'm not coding, I enjoy contributing to open-source projects, writing technical articles, and mentoring aspiring developers. I believe in the power of knowledge sharing and community building in the tech industry."
        ]
      }
    ],
    quote: {
      text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
      author: "Patrick McKenzie"
    }
  },
  abim: {
    ...baseAboutData,
    title: "Academic Researcher",
    subtitle: "Computer Science researcher focused on AI, machine learning, and emerging technologies",
    tags: ["AI/ML", "Research", "Computer Science", "Data Science", "Teaching"],
    sections: [
      {
        title: "My Journey",
        content: [
          "My academic journey began with a fundamental curiosity about how we can teach machines to learn. This led me to pursue advanced studies in computer science with a specialization in artificial intelligence and machine learning.",
          "Through research positions and academic collaborations, I've worked on projects ranging from natural language processing to computer vision systems, always seeking to push the boundaries of what's possible."
        ]
      },
      {
        title: "My Approach",
        content: [
          "My research methodology combines rigorous theoretical analysis with practical implementation and empirical validation. I believe that the most valuable insights come from bridging theory and practice.",
          "I'm committed to open science and reproducible research. Sharing knowledge and building upon collective insights is how we advance the field as a whole."
        ]
      },
      {
        title: "Current Focus",
        content: [
          "My current research focuses on the intersection of deep learning and symbolic reasoning, aiming to create more robust and interpretable AI systems. I'm particularly interested in how we can embed causal reasoning into neural architectures.",
          "I also dedicate time to teaching and mentoring students, believing that education is a crucial component of advancing our field. Helping others discover their potential in computer science is immensely rewarding."
        ]
      }
    ],
    quote: {
      text: "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.",
      author: "Stephen Hawking"
    }
  },
  xiannyaa: {
    ...baseAboutData,
    title: "Creative Storyteller",
    subtitle: "Crafting digital narratives that blend technology with artistic expression",
    tags: ["Writing", "Digital Art", "Storytelling", "UX Design", "Mixed Media"],
    sections: [
      {
        title: "My Journey",
        content: [
          "My creative journey began at the intersection of technology and art. I've always been fascinated by how digital tools can enhance storytelling and create new forms of artistic expression.",
          "Over the years, I've developed a multidisciplinary approach that combines elements of writing, visual design, and interactive media to create immersive narrative experiences."
        ]
      },
      {
        title: "My Approach",
        content: [
          "I believe in the power of stories to connect, inspire, and transform. My creative process involves both structured planning and intuitive exploration, allowing space for unexpected discoveries.",
          "I'm particularly interested in how interactive elements can enhance storytelling, giving audiences agency while guiding them through carefully crafted emotional journeys."
        ]
      },
      {
        title: "Current Focus",
        content: [
          "I'm currently exploring the potential of procedural narrative systems and how AI can be used as a creative collaborator rather than just a tool. I'm developing a series of digital short stories that evolve based on reader interaction.",
          "Alongside my creative projects, I run workshops on digital storytelling and mentor emerging creators who want to blend technical and artistic skills in their work."
        ]
      }
    ],
    quote: {
      text: "The role of the artist is to make the revolution irresistible.",
      author: "Toni Cade Bambara"
    }
  }
};