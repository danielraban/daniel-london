import type { Metadata } from "next";
import { PixelButton } from "../components/pixel-button";
import { DownloadCv } from "../components/download-cv";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.name} in ${profile.location}.`,
};

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-pixel text-sm tracking-widest text-neon">CONTACT</h1>
      <section className="pixel-panel p-5 sm:p-6">
        <p className="leading-7">
          Based in {profile.location}. Best reach is email. Phone stays on the CV.
        </p>
        <p className="font-pixel mt-4 text-[10px] tracking-widest text-cyan">
          {profile.email.toUpperCase()}
        </p>
      </section>
      <div className="flex flex-wrap gap-3">
        <PixelButton href={`mailto:${profile.email}`}>EMAIL</PixelButton>
        <PixelButton href={profile.linkedin} variant="magenta">
          LINKEDIN
        </PixelButton>
        <PixelButton href={profile.github}>GITHUB</PixelButton>
        <DownloadCv variant="cyan" />
      </div>
    </div>
  );
}
