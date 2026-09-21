import type { Metadata } from "next";
import { DownloadCv } from "../components/download-cv";
import { PixelButton } from "../components/pixel-button";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: profile.summary,
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-pixel text-sm tracking-widest text-neon">ABOUT</h1>
      {profile.about.map((section) => (
        <section key={section.title} className="pixel-panel p-5 sm:p-6">
          <h2 className="font-pixel mb-3 text-[10px] tracking-widest text-magenta">
            {section.title}
          </h2>
          <p className="leading-7">{section.body}</p>
        </section>
      ))}
      <div className="flex flex-wrap gap-3">
        <PixelButton href="/work">VIEW WORK</PixelButton>
        <PixelButton href="/projects" variant="magenta">
          PROJECTS
        </PixelButton>
        <PixelButton href="/uses">USES</PixelButton>
        <DownloadCv />
      </div>
    </div>
  );
}
