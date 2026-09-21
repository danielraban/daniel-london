import type { Metadata } from "next";
import { PixelButton } from "../components/pixel-button";
import { projects } from "@/lib/content/projects";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Projects",
  description: `Personal products by ${profile.name}: Oku and Blood Against Blackout.`,
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-pixel text-sm tracking-widest text-neon">PROJECTS</h1>
      <p className="pixel-panel p-5 leading-7">
        Side quests I ship myself. Client work lives on the work cartridge.
      </p>
      {projects.map((project) => (
        <article key={project.url} className="pixel-panel p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="font-pixel text-[11px] leading-5 text-neon">
                {project.name.toUpperCase()}
              </h2>
              <p className="mt-2 text-magenta">{project.role}</p>
            </div>
            <span
              className={`font-pixel px-2 py-1 text-[8px] ${
                project.status === "LIVE"
                  ? "bg-cyan text-void"
                  : "bg-magenta text-void"
              }`}
            >
              {project.status}
            </span>
          </div>
          <p className="font-pixel text-[8px] leading-4 tracking-widest text-muted">
            {project.tagline.toUpperCase()}
          </p>
          <p className="mt-4 leading-7">{project.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="border-2 border-panel-2 bg-void px-2 py-1 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <PixelButton href={project.url}>PLAY</PixelButton>
          </div>
        </article>
      ))}
    </div>
  );
}
