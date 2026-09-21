export type Project = {
  name: string;
  url: string;
  role: string;
  status: "LIVE" | "BETA";
  tagline: string;
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "Oku",
    url: "https://www.okuwellness.com",
    role: "Founder / builder",
    status: "BETA",
    tagline: "Your mind deserves a gentle space",
    description:
      "A mental health companion for mood, medication, focus, journaling, community, and a private AI listener. Launching in the UK on iOS and Android.",
    stack: ["Next.js", "TypeScript", "AI", "iOS", "Android"],
  },
  {
    name: "Blood Against Blackout",
    url: "https://www.bloodagainstblackout.com",
    role: "Founder / builder",
    status: "LIVE",
    tagline: "Seek the meeting. Starve the machine.",
    description:
      "A recovery meeting finder — help someone get to a room instead of a blackout.",
    stack: ["Next.js", "TypeScript"],
  },
];
