import type { ReactNode } from "react";
import { profile } from "@/lib/content/profile";
import { Nav } from "./nav";

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
        <footer className="mt-auto border-t-2 border-panel-2 pt-4 font-pixel text-[8px] leading-5 tracking-widest text-muted">
          INSERT COIN · {new Date().getFullYear()} · {profile.location.toUpperCase()}
        </footer>
      </div>
    </div>
  );
}
