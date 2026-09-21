import { PixelButton } from "./pixel-button";
import { profile } from "@/lib/content/profile";

export function DownloadCv({ variant = "magenta" }: { variant?: "cyan" | "magenta" }) {
  return (
    <PixelButton href={profile.cvPath} variant={variant} download>
      DOWNLOAD CV
    </PixelButton>
  );
}
