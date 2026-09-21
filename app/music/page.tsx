import type { Metadata } from "next";
import { NowPlayingCard, RecentlyPlayedList } from "../components/spotify-hud";
import { getSpotifySnapshot } from "@/lib/spotify";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Music",
  description: `What ${profile.name} is listening to on Spotify.`,
};

export const dynamic = "force-dynamic";

export default async function MusicPage() {
  const { status, nowPlaying, recentlyPlayed } = await getSpotifySnapshot();

  return (
    <div className="space-y-6">
      <h1 className="font-pixel text-sm tracking-widest text-neon">MUSIC</h1>
      <p className="text-muted">
        Techno, house, and whatever else is in the deck. Live from Spotify.
      </p>
      <NowPlayingCard track={nowPlaying} status={status} />
      <RecentlyPlayedList tracks={recentlyPlayed} status={status} />
    </div>
  );
}
