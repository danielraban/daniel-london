"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/work", label: "WORK" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/lab", label: "LAB" },
  { href: "/music", label: "MUSIC" },
  { href: "/contact", label: "CONTACT" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="pixel-panel mb-6 flex flex-wrap items-center gap-1 px-2 py-2"
    >
      {items.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`font-pixel px-2 py-2 text-[10px] leading-none tracking-widest ${
              active
                ? "bg-magenta text-void"
                : "text-neon hover:bg-panel-2 hover:text-cyan"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {active ? `>${item.label}` : item.label}
          </Link>
        );
      })}
    </nav>
  );
}
