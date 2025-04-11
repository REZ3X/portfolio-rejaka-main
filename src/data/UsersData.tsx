import { UserAlias } from "@/context/UserContext";

export interface UserData {
  fullName: string;
  alias: string;
  profileImage?: string;
  bio: string;
  links: { name: string; url: string }[];
  onionAddress?: string;
  focus: "programmer" | "academic" | "creative";
}

export const usersData: Record<UserAlias, UserData> = {
  rez3x: {
    fullName: "Rejaka Abimanyu Susanto",
    alias: "rez3x",
    profileImage: "/assets/images/profile/rez3x.webp",
    bio: "Full-stack developer with a passion for Linux and cybersecurity. Exploring the digital realm one terminal command at a time.",
    links: [
      { name: "GitHub", url: "https://github.com/rez3x" },
      { name: "LinkedIn", url: "https://linkedin.com/in/rez3x" },
      { name: "Blog", url: "https://rez3x.dev/blog" },
    ],
    onionAddress: "[redacted].onion",
    focus: "programmer",
  },
  abim: {
    fullName: "Rejaka Abimanyu Susanto",
    alias: "abim",
    profileImage: "/assets/images/profile/abim.jpeg",
    bio: "Computer Science researcher specializing in AI/ML. Constantly seeking knowledge and sharing insights in academic communities.",
    links: [
      { name: "ResearchGate", url: "https://researchgate.net/profile/abim" },
      { name: "Google Scholar", url: "https://scholar.google.com/abim" },
      { name: "Academia", url: "https://academia.edu/abim" },
    ],
    onionAddress: "[redacted].onion",
    focus: "academic",
  },
  xiannyaa: {
    fullName: "Rejaka Abimanyu Susanto",
    alias: "xiannyaa",
    profileImage: "/assets/images/profile/xianyaa.jpg",
    bio: "Creative writer, artist, and storyteller. Blending technology with art to create unique digital narratives.",
    links: [
      { name: "Medium", url: "https://medium.com/@xiannyaa" },
      { name: "Behance", url: "https://behance.net/xiannyaa" },
      { name: "Instagram", url: "https://instagram.com/xiannyaa" },
    ],
    onionAddress: "[redacted].onion",
    focus: "creative",
  },
};