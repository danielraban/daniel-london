import Link from "next/link";
import { DownloadCv } from "./components/download-cv";
import { profile } from "@/lib/content/profile";

const stages = [
  {
    id: "01",
    label: "WORK",
    href: "/work",
    hint: "CV, roles, skills",
  },
  {
    id: "02",
    label: "PROJECTS",
    href: "/projects",
    hint: "Oku and meetings",
  },
  {
    id: "03",
    label: "MUSIC",
    href: "/music",
    hint: "Now playing",
  },
  {
    id: "04",
    label: "CONTACT",
    href: "/contact",
    hint: "Email and links",
  },
] as const;

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="pixel-panel px-4 py-8 text-center sm:px-8 sm:py-10">
        <p className="font-pixel mb-4 text-[10px] tracking-[0.3em] text-cyan">
          STAGE SELECT
        </p>
        <h1 className="font-pixel text-lg leading-8 text-neon sm:text-2xl sm:leading-12">
          {profile.name.toUpperCase()}
        </h1>
        <p className="font-pixel mt-4 text-[10px] leading-5 text-magenta sm:text-xs">
          {profile.headline.toUpperCase()}
        </p>
        <p className="mx-auto mt-4 max-w-md text-muted">{profile.tagline}</p>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="pixel-panel px-3 py-4 text-center">
            <p className="font-pixel text-xl text-cyan sm:text-2xl">{stat.value}</p>
            <p className="font-pixel mt-2 text-[8px] leading-4 text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section>
        <p className="font-pixel animate-blink mb-4 text-center text-[10px] tracking-widest text-cyan">
          SELECT STAGE
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {stages.map((stage) => (
            <Link
              key={stage.href}
              href={stage.href}
              className="pixel-panel block p-4 hover:border-cyan hover:text-cyan"
            >
              <p className="font-pixel text-[8px] tracking-widest text-magenta">
                {stage.id}
              </p>
              <h2 className="font-pixel mt-2 text-[11px] leading-5 text-neon">
                {stage.label}
              </h2>
              <p className="mt-2 text-sm text-muted">{stage.hint}</p>
            </Link>
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <DownloadCv />
        </div>
      </section>
    </div>
  );
}
