export const profile = {
  name: "Daniel Raban",
  handle: "DANIEL.LONDON",
  headline: "Senior Software Engineer",
  tagline: "TypeScript · React · Angular · Node.js · AWS",
  location: "East London, United Kingdom",
  email: "danieltraban@gmail.com",
  github: "https://github.com/danielraban",
  linkedin: "https://linkedin.com/in/daniel-raban",
  site: "https://daniel.london",
  cvPath: "/cv/Daniel_Raban-CV.pdf",
  cvFilename: "Daniel_Raban-CV.pdf",
  summary:
    "Fullstack software engineer with 15 years' experience building customer-facing web applications in TypeScript, React, Angular, and Node.js, deployed on AWS, Azure, and Google Cloud. I specialise in replacing legacy systems with modern, modular architectures — and in leading the teams that ship them. Recent work spans micro frontends, cloud infrastructure as code, and agentic AI development workflows.",
  stats: [
    { value: "15", label: "YRS EXP" },
    { value: "9", label: "COMPANIES" },
    { value: "3", label: "CLOUDS" },
    { value: "4", label: "TEAMS LED" },
  ],
  about: [
    {
      title: "ENGINEERING",
      body: "I build and modernise customer-facing systems end to end — frontend, APIs, and cloud. Most of my recent work is about taking legacy applications apart and putting them back together as modular, independently deployable pieces that teams can actually ship against. I have led squads in both the UK and the US, and I still like being close to the code.",
    },
    {
      title: "PRODUCTS",
      body: "Outside client work I ship my own products. Oku is a mental health companion launching in the UK. Blood Against Blackout is a live recovery meeting finder. Both are in the projects cartridge.",
    },
    {
      title: "AI IN THE LOOP",
      body: "I care about using AI as a serious engineering tool, not a gimmick. At work that means agentic coding workflows with Cursor, Claude Code, MCP, and project memory so a team can move faster without lowering the bar. Off the clock I keep reading about the ethical side of the same technology — what we automate, who it serves, and what we should refuse to build.",
    },
    {
      title: "OFF THE CLOCK",
      body: "I live in East London, support West Ham, and spend a lot of spare time on a bike, in a club, or with a book. Techno and house are the soundtrack. I have lived in both Atlanta and London, so I will argue about BBQ and also about the Central line. Yoga, gaming, and fashion fill in the rest.",
    },
  ],
} as const;
