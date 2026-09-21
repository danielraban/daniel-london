import { cache } from "react";

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: string;
  album: string;
  albumImage: string | null;
  url: string;
  playedAt?: string;
};

export type NowPlaying = SpotifyTrack & {
  isPlaying: boolean;
};

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=10";

type SpotifyImage = { url: string };
type SpotifyArtist = { name: string };
type SpotifyTrackPayload = {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: { name: string; images: SpotifyImage[] };
  external_urls: { spotify: string };
};

function isConfigured() {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN,
  );
}

const getAccessToken = cache(async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
});

function mapTrack(track: SpotifyTrackPayload, playedAt?: string): SpotifyTrack {
  return {
    id: track.id,
    name: track.name,
    artists: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    albumImage: track.album.images[1]?.url ?? track.album.images[0]?.url ?? null,
    url: track.external_urls.spotify,
    playedAt,
  };
}

export async function getNowPlaying(): Promise<NowPlaying | null> {
  if (!isConfigured()) {
    return null;
  }

  const token = await getAccessToken();
  if (!token) {
    return null;
  }

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (response.status === 204 || response.status === 202 || !response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    is_playing: boolean;
    currently_playing_type?: string;
    item: SpotifyTrackPayload | null;
  };

  if (!data.item || data.currently_playing_type !== "track") {
    return null;
  }

  return {
    ...mapTrack(data.item),
    isPlaying: data.is_playing,
  };
}

export async function getRecentlyPlayed(): Promise<SpotifyTrack[]> {
  if (!isConfigured()) {
    return [];
  }

  const token = await getAccessToken();
  if (!token) {
    return [];
  }

  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as {
    items?: { track: SpotifyTrackPayload; played_at: string }[];
  };

  return (data.items ?? []).map((item) => mapTrack(item.track, item.played_at));
}
