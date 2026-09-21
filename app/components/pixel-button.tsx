import type { ReactNode } from "react";
import Link from "next/link";
import { profile } from "@/lib/content/profile";

type PixelButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "cyan" | "magenta";
  download?: boolean;
  external?: boolean;
};

export function PixelButton({
  href,
  children,
  variant = "cyan",
  download,
  external,
}: PixelButtonProps) {
  const className = `pixel-button ${variant === "magenta" ? "pixel-button-magenta" : ""}`;

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      >
        {children}
      </a>
    );
  }

  if (download) {
    return (
      <a href={href} className={className} download={profile.cvFilename}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
