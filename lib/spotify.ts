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
  progressMs: number;
  durationMs: number;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  image: string | null;
  url: string;
};

export type SpotifyAuthStatus = "ok" | "missing_env" | "revoked" | "error";

export const TIME_RANGES = ["short_term", "medium_term", "long_term"] as const;
export type SpotifyTimeRange = (typeof TIME_RANGES)[number];
export const DEFAULT_TIME_RANGE: SpotifyTimeRange = "medium_term";

export type SpotifySnapshot = {
  status: SpotifyAuthStatus;
  nowPlaying: NowPlaying | null;
  recentlyPlayed: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  topTracks: SpotifyTrack[];
  timeRange: SpotifyTimeRange;
};

export type NowPlayingSnapshot = {
  status: SpotifyAuthStatus;
  nowPlaying: NowPlaying | null;
};

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=10";
const TOP_LIMIT = 8;
const TOP_REVALIDATE_SECONDS = 3600;

type SpotifyImage = { url: string };
type SpotifyArtistPayload = {
  id?: string;
  name?: string;
  images?: SpotifyImage[];
  external_urls?: { spotify?: string };
};
type SpotifyTrackPayload = {
  id?: string;
  name?: string;
  duration_ms?: number;
  artists?: { name: string }[];
  album?: { name?: string; images?: SpotifyImage[] };
  external_urls?: { spotify?: string };
};

function isConfigured() {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN,
  );
}

export function parseTimeRange(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "short_term" || raw === "medium_term" || raw === "long_term") {
    return raw;
  }
  return DEFAULT_TIME_RANGE;
}

const getAccessToken = cache(
  async (): Promise<{ token: string | null; status: SpotifyAuthStatus }> => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      return { token: null, status: "missing_env" };
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
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        error_description?: string;
      } | null;
      console.error("Spotify token refresh failed", {
        status: response.status,
        error: payload?.error,
      });
      return {
        token: null,
        status: payload?.error === "invalid_grant" ? "revoked" : "error",
      };
    }

    const data = (await response.json()) as { access_token?: string };
    if (!data.access_token) {
      return { token: null, status: "error" };
    }

    return { token: data.access_token, status: "ok" };
  },
);

function mapTrack(
  track: SpotifyTrackPayload | null | undefined,
  playedAt?: string,
): SpotifyTrack | null {
  if (!track?.id || !track.name) {
    return null;
  }

  return {
    id: track.id,
    name: track.name,
    artists: (track.artists ?? []).map((artist) => artist.name).join(", "),
    album: track.album?.name ?? "",
    albumImage:
      track.album?.images?.[1]?.url ?? track.album?.images?.[0]?.url ?? null,
    url: track.external_urls?.spotify ?? `https://open.spotify.com/track/${track.id}`,
    playedAt,
  };
}

function mapArtist(artist: SpotifyArtistPayload): SpotifyArtist | null {
  if (!artist.id || !artist.name) {
    return null;
  }

  return {
    id: artist.id,
    name: artist.name,
    image: artist.images?.[1]?.url ?? artist.images?.[0]?.url ?? null,
    url: artist.external_urls?.spotify ?? `https://open.spotify.com/artist/${artist.id}`,
  };
}

async function getNowPlaying(token: string): Promise<NowPlaying | null> {
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (response.status === 204 || response.status === 202 || !response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    is_playing?: boolean;
    progress_ms?: number;
    currently_playing_type?: string;
    item: SpotifyTrackPayload | null;
  };

  if (data.currently_playing_type && data.currently_playing_type !== "track") {
    return null;
  }

  const track = mapTrack(data.item);
  if (!track) {
    return null;
  }

  return {
    ...track,
    isPlaying: Boolean(data.is_playing),
    progressMs: data.progress_ms ?? 0,
    durationMs: data.item?.duration_ms ?? 0,
  };
}

async function getRecentlyPlayed(token: string): Promise<SpotifyTrack[]> {
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Spotify recently played failed", { status: response.status });
    return [];
  }

  const data = (await response.json()) as {
    items?: { track: SpotifyTrackPayload; played_at: string }[];
  };

  return (data.items ?? [])
    .map((item) => mapTrack(item.track, item.played_at))
    .filter((track): track is SpotifyTrack => track !== null);
}

async function getTopArtists(
  token: string,
  timeRange: SpotifyTimeRange,
): Promise<SpotifyArtist[]> {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=${TOP_LIMIT}&time_range=${timeRange}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: TOP_REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    console.error("Spotify top artists failed", { status: response.status });
    return [];
  }

  const data = (await response.json()) as { items?: SpotifyArtistPayload[] };
  return (data.items ?? [])
    .map(mapArtist)
    .filter((artist): artist is SpotifyArtist => artist !== null);
}

async function getTopTracks(
  token: string,
  timeRange: SpotifyTimeRange,
): Promise<SpotifyTrack[]> {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=${TOP_LIMIT}&time_range=${timeRange}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: TOP_REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    console.error("Spotify top tracks failed", { status: response.status });
    return [];
  }

  const data = (await response.json()) as { items?: SpotifyTrackPayload[] };
  return (data.items ?? [])
    .map((track) => mapTrack(track))
    .filter((track): track is SpotifyTrack => track !== null);
}

async function withToken(): Promise<{
  token: string | null;
  status: SpotifyAuthStatus;
}> {
  if (!isConfigured()) {
    return { token: null, status: "missing_env" };
  }
  return getAccessToken();
}

export async function getNowPlayingSnapshot(): Promise<NowPlayingSnapshot> {
  const { token, status } = await withToken();
  if (!token) {
    return { status, nowPlaying: null };
  }

  return { status: "ok", nowPlaying: await getNowPlaying(token) };
}

export async function getSpotifySnapshot(
  timeRange: SpotifyTimeRange = DEFAULT_TIME_RANGE,
): Promise<SpotifySnapshot> {
  const empty: SpotifySnapshot = {
    status: "missing_env",
    nowPlaying: null,
    recentlyPlayed: [],
    topArtists: [],
    topTracks: [],
    timeRange,
  };

  const { token, status } = await withToken();
  if (!token) {
    return { ...empty, status };
  }

  const [nowPlaying, recentlyPlayed, topArtists, topTracks] = await Promise.all(
    [
      getNowPlaying(token),
      getRecentlyPlayed(token),
      getTopArtists(token, timeRange),
      getTopTracks(token, timeRange),
    ],
  );

  return {
    status: "ok",
    nowPlaying,
    recentlyPlayed,
    topArtists,
    topTracks,
    timeRange,
  };
}
