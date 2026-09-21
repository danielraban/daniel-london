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

export type SpotifyAuthStatus = "ok" | "missing_env" | "revoked" | "error";

export type SpotifySnapshot = {
  status: SpotifyAuthStatus;
  nowPlaying: NowPlaying | null;
  recentlyPlayed: SpotifyTrack[];
};

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=10";

type SpotifyImage = { url: string };
type SpotifyArtist = { name: string };
type SpotifyTrackPayload = {
  id?: string;
  name?: string;
  artists?: SpotifyArtist[];
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

export async function getSpotifySnapshot(): Promise<SpotifySnapshot> {
  if (!isConfigured()) {
    return { status: "missing_env", nowPlaying: null, recentlyPlayed: [] };
  }

  const { token, status } = await getAccessToken();
  if (!token) {
    return { status, nowPlaying: null, recentlyPlayed: [] };
  }

  const [nowPlaying, recentlyPlayed] = await Promise.all([
    getNowPlaying(token),
    getRecentlyPlayed(token),
  ]);

  return { status: "ok", nowPlaying, recentlyPlayed };
}
