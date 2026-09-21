import Image from "next/image";
import type { NowPlaying, SpotifyTrack } from "@/lib/spotify";

function AlbumArt({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) {
  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden border-[3px] border-cyan bg-void">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="80px"
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

export function NowPlayingCard({ track }: { track: NowPlaying | null }) {
  return (
    <section className="pixel-panel p-4 sm:p-5">
      <p className="font-pixel mb-4 text-[10px] tracking-widest text-magenta">
        {track ? (track.isPlaying ? "NOW PLAYING" : "PAUSED") : "NOW PLAYING: ---"}
      </p>
      {track ? (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 hover:text-cyan"
        >
          <AlbumArt src={track.albumImage} alt={`${track.album} cover`} />
          <div className="min-w-0">
            <p className="font-pixel truncate text-[11px] leading-5 text-text">
              {track.name}
            </p>
            <p className="truncate text-muted">{track.artists}</p>
            <p className="truncate text-sm text-neon">{track.album}</p>
          </div>
        </a>
      ) : (
        <p className="text-muted">No cassette in the deck. Check back when the stereo is on.</p>
      )}
    </section>
  );
}

export function RecentlyPlayedList({ tracks }: { tracks: SpotifyTrack[] }) {
  return (
    <section className="pixel-panel p-4 sm:p-5">
      <p className="font-pixel mb-4 text-[10px] tracking-widest text-cyan">
        RECENTLY PLAYED
      </p>
      {tracks.length === 0 ? (
        <p className="text-muted">SIGNAL LOST. No recent tracks to display.</p>
      ) : (
        <ol className="space-y-3">
          {tracks.map((track, index) => (
            <li key={`${track.id}-${track.playedAt ?? index}`}>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-cyan"
              >
                <span className="font-pixel w-6 shrink-0 text-[10px] text-magenta">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <AlbumArt src={track.albumImage} alt={`${track.album} cover`} />
                <div className="min-w-0">
                  <p className="truncate font-medium leading-5">{track.name}</p>
                  <p className="truncate text-sm text-muted">{track.artists}</p>
                </div>
              </a>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
