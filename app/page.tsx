import { DownloadCv } from "./components/download-cv";
import { PixelButton } from "./components/pixel-button";
import { profile } from "@/lib/content/profile";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="pixel-panel px-4 py-8 text-center sm:px-8 sm:py-10">
        <p className="font-pixel mb-4 text-[10px] tracking-[0.3em] text-cyan">
          STAGE 1
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

      <section className="pixel-panel p-5 sm:p-6">
        <p className="text-lg leading-7">{profile.summary}</p>
        <p className="font-pixel animate-blink mt-6 text-center text-[10px] tracking-widest text-cyan">
          PRESS START
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <PixelButton href="/about">ENTER</PixelButton>
          <DownloadCv />
        </div>
      </section>
    </div>
  );
}
