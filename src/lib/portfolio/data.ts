export const PERSONAL = {
  name: "Hem Shrestha",
  title: "Founder of WildStone Solution",
  role: "WordPress Developer",
  tagline:
    "Building modern, scalable, and high-performing websites that help businesses grow.",
  company: "WildStone Solution",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { label: "Years of Experience", value: 10, suffix: "+" },
  { label: "Projects Completed", value: 80, suffix: "+" },
  { label: "Happy Clients", value: 100, suffix: "+" },
];

export type SkillItem = {
  name: string;
  level: number;
};

export type SkillGroup = {
  category: string;
  items: SkillItem[];
};

export const SKILLS: SkillGroup[] = [];