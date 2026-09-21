import type { Metadata } from "next";
import {
  HighScores,
  NowPlayingCard,
  PlaylistDeck,
  RecentlyPlayedList,
} from "../components/spotify-hud";
import { playlists } from "@/lib/content/music";
import { getSpotifySnapshot, parseTimeRange } from "@/lib/spotify";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Music",
  description: `What ${profile.name} is listening to on Spotify.`,
};

export const dynamic = "force-dynamic";

export default async function MusicPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string | string[] }>;
}) {
  const { range } = await searchParams;
  const timeRange = parseTimeRange(range);
  const { status, nowPlaying, recentlyPlayed, topArtists, topTracks } =
    await getSpotifySnapshot(timeRange);

  return (
    <div className="space-y-6">
      <h1 className="font-pixel text-sm tracking-widest text-neon">MUSIC</h1>
      <p className="text-muted">
        Techno, house, and whatever else is in the deck. Live from Spotify.
      </p>
      <NowPlayingCard track={nowPlaying} status={status} />
      <PlaylistDeck playlists={playlists} />
      <HighScores
        artists={topArtists}
        tracks={topTracks}
        status={status}
        timeRange={timeRange}
      />
      <RecentlyPlayedList tracks={recentlyPlayed} status={status} />
    </div>
  );
}
