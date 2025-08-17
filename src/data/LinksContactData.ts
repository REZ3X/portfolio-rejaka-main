export interface LinkItem {
  type: "email" | "phone" | "social";
  label: string;
  value: string;
  icon: string;
  url?: string;
}

export const linksContactData = {
  contactInfo: [
    {
      type: "email" as const,
      label: "Email",
      value: "abim@rejaka.id",
      icon: "📧",
    },
    {
      type: "phone" as const,
      label: "Phone",
      value: "+62 (821) 4188-4664",
      icon: "📱",
    },
  ],
  socialLinks: [
    {
      type: "social" as const,
      label: "GitHub",
      value: "github.com/REZ3X",
      url: "https://github.com/REZ3X",
      icon: "💻",
    },
    {
      type: "social" as const,
      label: "LinkedIn",
      value: "linkedin.com/in/rejaka-me",
      url: "https://www.linkedin.com/in/rejaka-me/",
      icon: "🔗",
    },
    {
      type: "social",
      label: "Instagram",
      value: "@rejakasusanto",
      url: "https://instagram.com/rejakasusanto",
      icon: "📷",
    },
  ],
};
