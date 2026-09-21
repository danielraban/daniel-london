export type FeaturedRepo = {
  owner: string;
  name: string;
  title: string;
  fallbackDescription: string;
  fallbackUrl: string;
  fallbackLanguage: string;
  fallbackStatus: "LIVE" | "PRIVATE";
};

export const githubUser = "danielraban";

export const featuredRepos: FeaturedRepo[] = [
  {
    owner: "danielraban",
    name: "daniel-london",
    title: "daniel.london",
    fallbackDescription: "This site — a retro HUD portfolio.",
    fallbackUrl: "https://github.com/danielraban/daniel-london",
    fallbackLanguage: "TypeScript",
    fallbackStatus: "LIVE",
  },
  {
    owner: "danielraban",
    name: "oku-web",
    title: "Oku",
    fallbackDescription: "Your mind deserves a gentle space",
    fallbackUrl: "https://www.okuwellness.com",
    fallbackLanguage: "TypeScript",
    fallbackStatus: "LIVE",
  },
  {
    owner: "danielraban",
    name: "blood-against-blackout",
    title: "Blood Against Blackout",
    fallbackDescription: "Seek the meeting. Starve the machine.",
    fallbackUrl: "https://github.com/danielraban/blood-against-blackout",
    fallbackLanguage: "TypeScript",
    fallbackStatus: "LIVE",
  },
];
