import type { Metadata } from "next";
import { uses } from "@/lib/content/uses";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Uses",
  description: `Tools, stack, and practices ${profile.name} works with.`,
};

export default function UsesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-pixel text-sm tracking-widest text-neon">USES</h1>
      <p className="pixel-panel p-5 leading-7">
        Loadout for shipping client work and my own products. The AI tools are
        part of the job, not a sticker on the laptop.
      </p>
      {uses.map((group) => (
        <section key={group.title} className="pixel-panel p-5">
          <h2 className="font-pixel mb-4 text-[10px] tracking-widest text-magenta">
            {group.title}
          </h2>
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
        </section>
      ))}
    </div>
  );
}
