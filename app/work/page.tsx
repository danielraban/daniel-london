import type { Metadata } from "next";
import { DownloadCv } from "../components/download-cv";
import { education, roles } from "@/lib/content/experience";
import { skillGroups } from "@/lib/content/skills";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Work",
  description: `Experience and CV for ${profile.name}, ${profile.headline}.`,
};

export default function WorkPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-pixel text-sm tracking-widest text-neon">WORK</h1>
        <DownloadCv />
      </div>

      <p className="pixel-panel p-5 leading-7">{profile.summary}</p>

      <section className="space-y-3">
        <h2 className="font-pixel text-[10px] tracking-widest text-cyan">
          SKILL SET
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="pixel-panel p-4">
              <h3 className="font-pixel mb-3 text-[9px] tracking-widest text-magenta">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-2 border-panel-2 bg-void px-2 py-1 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-pixel text-[10px] tracking-widest text-cyan">
          SAVE SLOTS
        </h2>
        {roles.map((role) => (
          <article key={`${role.company}-${role.start}`} className="pixel-panel p-5">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-pixel text-[11px] leading-5 text-neon">
                  {role.company.toUpperCase()}
                </h3>
                <p className="mt-2 text-magenta">{role.title}</p>
              </div>
              {role.current ? (
                <span className="font-pixel bg-cyan px-2 py-1 text-[8px] text-void">
                  NOW
                </span>
              ) : null}
            </div>
            <p className="font-pixel text-[8px] leading-4 tracking-widest text-muted">
              {role.location.toUpperCase()} · {role.start.toUpperCase()} —{" "}
              {role.end.toUpperCase()}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-6">
              {role.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="pixel-panel p-5">
        <h2 className="font-pixel mb-3 text-[10px] tracking-widest text-cyan">
          EDUCATION
        </h2>
        <p className="font-pixel text-[11px] leading-5 text-neon">
          {education.school.toUpperCase()}
        </p>
        <p className="mt-2 text-magenta">{education.detail}</p>
        <p className="font-pixel mt-3 text-[8px] tracking-widest text-muted">
          {education.location.toUpperCase()} · {education.start.toUpperCase()} —{" "}
          {education.end.toUpperCase()}
        </p>
      </section>
    </div>
  );
}
