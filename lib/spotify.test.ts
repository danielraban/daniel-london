import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_TIME_RANGE,
  formatMs,
  getNowPlayingSnapshot,
  getSpotifySnapshot,
  mapArtist,
  mapTrack,
  parseTimeRange,
} from "@/lib/spotify";

function jsonResponse(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  const status = init.status ?? (init.ok === false ? 500 : 200);
  return {
    ok: init.ok ?? (status >= 200 && status < 300),
    status,
    json: async () => body,
  } as Response;
}

const trackPayload = {
  id: "track-1",
  name: "Strobe",
  duration_ms: 634000,
  artists: [{ name: "deadmau5" }, { name: "Kaskade" }],
  album: {
    name: "For Lack of a Better Name",
    images: [
      { url: "https://example.com/large.jpg" },
      { url: "https://example.com/medium.jpg" },
    ],
  },
  external_urls: { spotify: "https://open.spotify.com/track/track-1" },
};

function stubSpotifyEnv() {
  vi.stubEnv("SPOTIFY_CLIENT_ID", "id");
  vi.stubEnv("SPOTIFY_CLIENT_SECRET", "secret");
  vi.stubEnv("SPOTIFY_REFRESH_TOKEN", "refresh");
}

function clearSpotifyEnv() {
  vi.stubEnv("SPOTIFY_CLIENT_ID", "");
  vi.stubEnv("SPOTIFY_CLIENT_SECRET", "");
  vi.stubEnv("SPOTIFY_REFRESH_TOKEN", "");
}

describe("parseTimeRange", () => {
  it("accepts each valid range", () => {
    expect(parseTimeRange("short_term")).toBe("short_term");
    expect(parseTimeRange("medium_term")).toBe("medium_term");
    expect(parseTimeRange("long_term")).toBe("long_term");
  });

  it("falls back to the default for unknown or missing values", () => {
    expect(parseTimeRange("nope")).toBe(DEFAULT_TIME_RANGE);
    expect(parseTimeRange(undefined)).toBe("medium_term");
  });

  it("reads the first value from an array", () => {
    expect(parseTimeRange(["long_term"])).toBe("long_term");
    expect(parseTimeRange(["nope"])).toBe(DEFAULT_TIME_RANGE);
  });
});

describe("formatMs", () => {
  it("formats minutes and zero-padded seconds", () => {
    expect(formatMs(0)).toBe("0:00");
    expect(formatMs(1000)).toBe("0:01");
    expect(formatMs(65000)).toBe("1:05");
    expect(formatMs(125000)).toBe("2:05");
  });

  it("clamps negative values to 0:00", () => {
    expect(formatMs(-4000)).toBe("0:00");
  });
});

describe("mapTrack", () => {
  it("returns null when id or name is missing", () => {
    expect(mapTrack(null)).toBeNull();
    expect(mapTrack({ name: "Strobe" })).toBeNull();
    expect(mapTrack({ id: "track-1" })).toBeNull();
  });

  it("joins artists and prefers the medium album image", () => {
    expect(mapTrack(trackPayload, "2026-01-17T12:00:00Z")).toEqual({
      id: "track-1",
      name: "Strobe",
      artists: "deadmau5, Kaskade",
      album: "For Lack of a Better Name",
      albumImage: "https://example.com/medium.jpg",
      url: "https://open.spotify.com/track/track-1",
      playedAt: "2026-01-17T12:00:00Z",
    });
  });

  it("falls back to the first image and a constructed Spotify URL", () => {
    expect(
      mapTrack({
        id: "track-2",
        name: "Ghosts n Stuff",
        artists: [{ name: "deadmau5" }],
        album: {
          name: "Random Album Title",
          images: [{ url: "https://example.com/only.jpg" }],
        },
      }),
    ).toEqual({
      id: "track-2",
      name: "Ghosts n Stuff",
      artists: "deadmau5",
      album: "Random Album Title",
      albumImage: "https://example.com/only.jpg",
      url: "https://open.spotify.com/track/track-2",
      playedAt: undefined,
    });
  });
});

describe("mapArtist", () => {
  it("returns null when id or name is missing", () => {
    expect(mapArtist({ name: "Four Tet" })).toBeNull();
    expect(mapArtist({ id: "artist-1" })).toBeNull();
  });

  it("prefers the second image and falls back to a Spotify URL", () => {
    expect(
      mapArtist({
        id: "artist-1",
        name: "Four Tet",
        images: [
          { url: "https://example.com/large.jpg" },
          { url: "https://example.com/medium.jpg" },
        ],
      }),
    ).toEqual({
      id: "artist-1",
      name: "Four Tet",
      image: "https://example.com/medium.jpg",
      url: "https://open.spotify.com/artist/artist-1",
    });
  });
});

describe("Spotify snapshots", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    clearSpotifyEnv();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns missing_env when Spotify credentials are absent", async () => {
    await expect(getNowPlayingSnapshot()).resolves.toEqual({
      status: "missing_env",
      nowPlaying: null,
    });

    await expect(getSpotifySnapshot()).resolves.toEqual({
      status: "missing_env",
      nowPlaying: null,
      recentlyPlayed: [],
      topArtists: [],
      topTracks: [],
      timeRange: DEFAULT_TIME_RANGE,
    });
  });

  it("marks the session revoked when token refresh returns invalid_grant", async () => {
    stubSpotifyEnv();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ error: "invalid_grant" }, { ok: false, status: 400 }),
      ),
    );

    await expect(getNowPlayingSnapshot()).resolves.toEqual({
      status: "revoked",
      nowPlaying: null,
    });
  });

  it("treats a 204 now-playing response as nothing on the deck", async () => {
    stubSpotifyEnv();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/token")) {
          return jsonResponse({ access_token: "tok" });
        }
        if (url.includes("currently-playing")) {
          return jsonResponse(null, { status: 204 });
        }
        return jsonResponse({}, { ok: false, status: 404 });
      }),
    );

    await expect(getNowPlayingSnapshot()).resolves.toEqual({
      status: "ok",
      nowPlaying: null,
    });
  });

  it("ignores now-playing payloads that are not tracks", async () => {
    stubSpotifyEnv();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/token")) {
          return jsonResponse({ access_token: "tok" });
        }
        return jsonResponse({
          is_playing: true,
          currently_playing_type: "episode",
          item: trackPayload,
        });
      }),
    );

    await expect(getNowPlayingSnapshot()).resolves.toEqual({
      status: "ok",
      nowPlaying: null,
    });
  });

  it("maps a playing track through getSpotifySnapshot", async () => {
    stubSpotifyEnv();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/token")) {
          return jsonResponse({ access_token: "tok" });
        }
        if (url.includes("currently-playing")) {
          return jsonResponse({
            is_playing: true,
            progress_ms: 12000,
            currently_playing_type: "track",
            item: trackPayload,
          });
        }
        if (url.includes("recently-played")) {
          return jsonResponse({
            items: [{ track: trackPayload, played_at: "2026-01-17T12:00:00Z" }],
          });
        }
        if (url.includes("top/artists")) {
          return jsonResponse({
            items: [{ id: "artist-1", name: "Four Tet" }],
          });
        }
        if (url.includes("top/tracks")) {
          return jsonResponse({ items: [trackPayload] });
        }
        return jsonResponse({}, { ok: false, status: 404 });
      }),
    );

    await expect(getSpotifySnapshot("short_term")).resolves.toEqual({
      status: "ok",
      nowPlaying: {
        ...mapTrack(trackPayload),
        isPlaying: true,
        progressMs: 12000,
        durationMs: 634000,
      },
      recentlyPlayed: [mapTrack(trackPayload, "2026-01-17T12:00:00Z")],
      topArtists: [mapArtist({ id: "artist-1", name: "Four Tet" })],
      topTracks: [mapTrack(trackPayload)],
      timeRange: "short_term",
    });
  });
});
