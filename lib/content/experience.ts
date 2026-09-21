export type Role = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  highlights: string[];
};

export const roles: Role[] = [
  {
    company: "Virgin Media Group",
    title: "Senior Software Engineer",
    location: "London",
    start: "Jun 2024",
    end: "Present",
    current: true,
    highlights: [
      "Lead an Agile team delivering customer-facing web applications and modernising legacy systems.",
      "Built modular frontend and backend features with React, Next.js, Node.js, TypeScript, and Storyblok, improving scalability and SEO.",
      "Designed and integrated Node.js service endpoints and API-driven workflows to connect the UI, CMS, and internal systems.",
      "Re-architected core application flows to preserve feature parity while improving performance, maintainability, and user experience.",
      "Rewrote legacy code into independently deployable micro frontends, now live in production — improving load times and enabling continuous A/B testing.",
      "Provisioned and managed AWS infrastructure with Terraform (EC2, S3, Lambda, CloudFront, RDS) and CI/CD for automated build, test, and deploy.",
      "Applied Angular 18, TypeScript, and React to improve accessibility and performance, with unit and E2E testing on every release.",
      "Adopted agentic coding workflows with Claude Code and Cursor — subagents, MCP, and project memory — to accelerate delivery across the team.",
    ],
  },
  {
    company: "Builder.ai",
    title: "Senior Software Engineer",
    location: "London",
    start: "Oct 2023",
    end: "Mar 2024",
    highlights: [
      "Developed scalable features in Angular, React, TypeScript, Node.js, and Ruby on Rails to improve core product workflows.",
      "Contributed to Node.js service logic and API integrations supporting reusable UI components and reliable data flow.",
      "Deployed and managed application infrastructure on AWS (EC2, S3, Lambda, RDS), improving scalability and deployment reliability.",
      "Built CI/CD pipelines to automate testing and AWS deployments, reducing release turnaround.",
      "Improved Jest coverage, RxJS/async state handling, and code review quality; supported juniors through pair programming and demos.",
    ],
  },
  {
    company: "The Home Depot",
    title: "Senior Software Engineer",
    location: "Atlanta, GA",
    start: "Jul 2021",
    end: "Aug 2023",
    highlights: [
      "Retired legacy systems and moved functionality into modern UIs and a microservice architecture.",
      "Designed and developed a high-traffic web application for Major Appliances, Protection Plans, and Parts & Services, supporting billions in transaction volume.",
      "Deployed and scaled services on Azure Kubernetes Service (AKS) and Google Kubernetes Engine (GKE), with autoscaling and load balancing for peak demand.",
      "Used Azure App Service and Google Compute Engine to host application tiers and protect uptime during high-traffic periods.",
      "Authored testable code at 95% UI coverage and 90% microservice coverage; shipped hotfixes that prevented lost sales.",
    ],
  },
  {
    company: "Hathway",
    title: "Lead Software Engineer",
    location: "Atlanta",
    start: "Oct 2020",
    end: "Jul 2021",
    highlights: [
      "Led multiple teams building Angular and native applications in the food-ordering sector.",
      "Shipped with TypeScript, Angular, NgRx, RxJS, AWS, Node.js, Ionic, Cordova, and Capacitor.",
      "Deployed and monitored AWS services (EC2, Lambda, CloudWatch) with auto scaling and load balancing during high-order-volume periods.",
      "Drove TDD, CI/CD, and Agile practices; broke work into stories so teams could self-manage.",
      "Contributed to App Store apps including Panda Express, Raising Cane's, Hardee's, and Carl's Jr.",
    ],
  },
  {
    company: "Boehringer Ingelheim",
    title: "Senior Software Engineer (Contract)",
    location: "Remote",
    start: "Jun 2020",
    end: "Oct 2020",
    highlights: [
      "Led an Angular upgrade for a legacy application using TypeScript, Angular, Karma, Jasmine, Ionic, and Cordova.",
    ],
  },
  {
    company: "CallRail",
    title: "Senior Software Engineer 1",
    location: "Atlanta",
    start: "Aug 2018",
    end: "Jun 2020",
    highlights: [
      "Contributed to a fast-paced SaaS startup building call tracking and analytics products.",
      "Helped a three-engineer team launch a new product that generated over $1M in annual recurring revenue.",
      "Worked daily with Ruby on Rails, RSpec, Angular, TypeScript, Elasticsearch, Docker, CSS, HTML5, and GitHub.",
      "Built reporting algorithms, APIs, and third-party integrations to support core product growth.",
    ],
  },
  {
    company: "Make and Build",
    title: "Software Engineer",
    location: "Atlanta, GA",
    start: "Jul 2014",
    end: "Aug 2016",
    highlights: [
      "Built responsive client-facing applications with Angular and Ruby on Rails, working with product and design to turn business needs into shipped web features.",
    ],
  },
  {
    company: "Blacqube",
    title: "Frontend Software Engineer",
    location: "Atlanta, GA",
    start: "Mar 2012",
    end: "Jun 2014",
    highlights: [
      "Developed pixel-perfect frontend experiences for Mercedes-AMG alongside UI/UX teams, with strong attention to animation and visual fidelity.",
    ],
  },
  {
    company: "FAB (First Artist Bank)",
    title: "Software Engineer",
    location: "Atlanta, GA",
    start: "Jan 2011",
    end: "Mar 2012",
    highlights: [
      "Built a mobile-friendly application in Angular and PhoneGap for artists and musicians to manage and monetise their work.",
    ],
  },
];

export const education = {
  school: "University of Portsmouth",
  location: "Portsmouth, United Kingdom",
  detail:
    "Computer Science (BSc coursework) — two years focusing on web development, Python, mathematics, and Java.",
  start: "Sep 2007",
  end: "Jun 2009",
} as const;
