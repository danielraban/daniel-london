import Image from "next/image";

export function AlbumArt({
  src,
  alt,
  size = "md",
}: {
  src: string | null;
  alt: string;
  size?: "hud" | "sm" | "md";
}) {
  const box =
    size === "hud"
      ? "h-8 w-8 border-2"
      : size === "sm"
        ? "h-12 w-12 border-2"
        : "h-20 w-20 border-[3px]";
  const px = size === "hud" ? 32 : size === "sm" ? 48 : 80;

  return (
    <div
      className={`relative shrink-0 overflow-hidden border-cyan bg-void ${box}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${px}px`}
          className="object-cover [image-rendering:pixelated]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-pixel text-[8px] text-muted">
          N/A
        </div>
      )}
    </div>
  );
}

export function Equalizer({ playing }: { playing: boolean }) {
  return (
    <div className={`eq ${playing ? "eq-playing" : ""}`} aria-hidden="true">
      <span className="eq-bar" />
      <span className="eq-bar" />
      <span className="eq-bar" />
      <span className="eq-bar" />
      <span className="eq-bar" />
    </div>
  );
}
