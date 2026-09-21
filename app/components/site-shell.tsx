import type { ReactNode } from "react";
import Link from "next/link";
import { profile } from "@/lib/content/profile";
import { Nav } from "./nav";
import { StereoHud } from "./stereo-hud";
import { MatchHud } from "./match-hud";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-full">
      <div className="crt-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-6 sm:px-6">
        <header className="mb-4 flex items-baseline justify-between gap-4 font-pixel text-[10px] tracking-widest text-muted">
          <span className="text-cyan">{profile.handle}</span>
          <span>PLAYER 1</span>
        </header>
        <Nav />
        <main className="flex-1 pb-10">{children}</main>
        <footer className="mt-auto space-y-3 border-t-2 border-panel-2 pt-4">
          <StereoHud />
          <MatchHud />
          <div className="flex flex-wrap items-center justify-between gap-3 font-pixel text-[8px] leading-5 tracking-widest text-muted">
            <span>
              INSERT COIN · {new Date().getFullYear()} ·{" "}
              {profile.location.toUpperCase()}
            </span>
            <Link href="/uses" className="text-cyan hover:text-magenta">
              USES
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
