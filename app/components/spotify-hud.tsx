import Link from "next/link";
import {
  formatMs,
  type NowPlaying,
  type SpotifyArtist,
  type SpotifyAuthStatus,
  type SpotifyTimeRange,
  type SpotifyTrack,
} from "@/lib/spotify";
import { PixelButton } from "./pixel-button";
import { AlbumArt, Equalizer } from "./album-art";
import type { Playlist } from "@/lib/content/music";

function ProgressBar({
  progressMs,
  durationMs,
}: {
  progressMs: number;
  durationMs: number;
}) {
  const pct =
    durationMs > 0 ? Math.min(100, (progressMs / durationMs) * 100) : 0;

  return (
    <div className="mt-4">
      <div className="h-2 border-2 border-cyan bg-void">
        <div
          className="h-full bg-magenta"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="font-pixel mt-2 flex justify-between text-[8px] tracking-widest text-muted">
        <span>{formatMs(progressMs)}</span>
        <span>{formatMs(durationMs)}</span>
      </p>
    </div>
  );
}

export function NowPlayingCard({
  track,
  status,
}: {
  track: NowPlaying | null;
  status: SpotifyAuthStatus;
}) {
  const authFailed = status !== "ok";

  return (
    <section className="pixel-panel p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-pixel text-[10px] tracking-widest text-magenta">
          {authFailed
            ? "STEREO UNPLUGGED"
            : track
              ? track.isPlaying
                ? "NOW PLAYING"
                : "PAUSED"
              : "NOW PLAYING: ---"}
        </p>
        <Equalizer playing={Boolean(track?.isPlaying)} />
      </div>
      {authFailed ? (
        <p className="text-muted">
          Spotify login expired. Once a new refresh token is on Vercel, this
          cartridge will play again.
        </p>
      ) : track ? (
        <>
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
          <ProgressBar
            progressMs={track.progressMs}
            durationMs={track.durationMs}
          />
        </>
      ) : (
        <p className="text-muted">
          No cassette in the deck. Check back when the stereo is on.
        </p>
      )}
    </section>
  );
}

export function RecentlyPlayedList({
  tracks,
  status,
}: {
  tracks: SpotifyTrack[];
  status: SpotifyAuthStatus;
}) {
  return (
    <section className="pixel-panel p-4 sm:p-5">
      <p className="font-pixel mb-4 text-[10px] tracking-widest text-cyan">
        RECENTLY PLAYED
      </p>
      {status !== "ok" ? (
        <p className="text-muted">SIGNAL LOST. Spotify needs a new login.</p>
      ) : tracks.length === 0 ? (
        <p className="text-muted">No recent tracks to display.</p>
      ) : (
        <TrackList tracks={tracks} />
      )}
    </section>
  );
}

function TrackList({ tracks }: { tracks: SpotifyTrack[] }) {
  return (
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
            <AlbumArt
              src={track.albumImage}
              alt={`${track.album} cover`}
              size="sm"
            />
            <div className="min-w-0">
              <p className="truncate font-medium leading-5">{track.name}</p>
              <p className="truncate text-sm text-muted">{track.artists}</p>
            </div>
          </a>
        </li>
      ))}
    </ol>
  );
}

const RANGE_TABS: { id: SpotifyTimeRange; label: string }[] = [
  { id: "short_term", label: "THIS MONTH" },
  { id: "medium_term", label: "THIS SEASON" },
  { id: "long_term", label: "ALL TIME" },
];

export function HighScores({
  artists,
  tracks,
  status,
  timeRange,
}: {
  artists: SpotifyArtist[];
  tracks: SpotifyTrack[];
  status: SpotifyAuthStatus;
  timeRange: SpotifyTimeRange;
}) {
  const empty = artists.length === 0 && tracks.length === 0;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-pixel text-[10px] tracking-widest text-magenta">
          HIGH SCORES
        </h2>
        <nav aria-label="Score range" className="flex flex-wrap gap-2">
          {RANGE_TABS.map((tab) => {
            const active = tab.id === timeRange;
            return (
              <Link
                key={tab.id}
                href={`/music?range=${tab.id}`}
                scroll={false}
                className={`font-pixel border-2 px-3 py-2 text-[10px] leading-none tracking-widest ${
                  active
                    ? "border-magenta bg-magenta text-void"
                    : "border-panel-2 text-text hover:border-cyan hover:text-cyan"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {status !== "ok" ? (
        <div className="pixel-panel p-4 sm:p-5">
          <p className="text-muted">SIGNAL LOST. Spotify needs a new login.</p>
        </div>
      ) : empty ? (
        <div className="pixel-panel p-4 sm:p-5">
          <p className="text-muted">
            Scores locked. Re-auth the stereo with top-listen access.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="pixel-panel p-4 sm:p-5">
            <p className="font-pixel mb-4 text-[10px] tracking-widest text-cyan">
              TOP ARTISTS
            </p>
            {artists.length === 0 ? (
              <p className="text-muted">No artists in this range.</p>
            ) : (
              <ol className="grid grid-cols-2 gap-3">
                {artists.map((artist, index) => (
                  <li key={artist.id}>
                    <a
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-cyan"
                    >
                      <AlbumArt
                        src={artist.image}
                        alt={`${artist.name} photo`}
                      />
                      <p className="font-pixel mt-2 text-[8px] leading-4 text-magenta">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="truncate text-sm">{artist.name}</p>
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div className="pixel-panel p-4 sm:p-5">
            <p className="font-pixel mb-4 text-[10px] tracking-widest text-cyan">
              TOP TRACKS
            </p>
            {tracks.length === 0 ? (
              <p className="text-muted">No tracks in this range.</p>
            ) : (
              <TrackList tracks={tracks} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export function PlaylistDeck({ playlists }: { playlists: Playlist[] }) {
  return (
    <section className="space-y-4">
      <h2 className="font-pixel text-[10px] tracking-widest text-cyan">
        THE DECK
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {playlists.map((playlist) => (
          <article key={playlist.url} className="pixel-panel flex flex-col p-4">
            <h3 className="font-pixel text-[11px] leading-5 text-neon">
              {playlist.name.toUpperCase()}
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted">{playlist.tagline}</p>
            <div className="mt-4">
              <PixelButton href={playlist.url}>PLAY</PixelButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
