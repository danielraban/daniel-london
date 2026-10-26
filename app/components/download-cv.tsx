import { PixelButton } from "./pixel-button";
import { profile } from "@/lib/content/profile";

export function DownloadCv({ variant = "magenta" }: { variant?: "cyan" | "magenta" }) {
  return (
    <div className="flex flex-wrap gap-3">
      <PixelButton href={profile.cvPath} variant={variant} external>
        VIEW CV
      </PixelButton>
      <PixelButton href={profile.cvPath} variant={variant} download>
        DOWNLOAD CV
      </PixelButton>
    </div>
  );
}
