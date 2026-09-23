import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { featuredRepos } from "@/lib/content/github";
import {
  fallbackCartridge,
  formatRelative,
  getGitHubSnapshot,
  mapLevel,
} from "@/lib/github";

function jsonResponse(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  const status = init.status ?? (init.ok === false ? 500 : 200);
  return {
    ok: init.ok ?? (status >= 200 && status < 300),
    status,
    json: async () => body,
  } as Response;
}

describe("formatRelative", () => {
  const now = Date.parse("2026-06-15T12:00:00.000Z");

  function isoAgo(ms: number) {
    return new Date(now - ms).toISOString();
  }

  it("returns an empty string for invalid dates", () => {
    expect(formatRelative("not-a-date", now)).toBe("");
  });

  it("clamps future timestamps to JUST NOW", () => {
    expect(formatRelative(new Date(now + 60_000).toISOString(), now)).toBe(
      "JUST NOW",
    );
  });

  it("uses JUST NOW under a minute", () => {
    expect(formatRelative(isoAgo(10_000), now)).toBe("JUST NOW");
    expect(formatRelative(isoAgo(59_000), now)).toBe("JUST NOW");
  });

  it("uses minutes under an hour", () => {
    expect(formatRelative(isoAgo(60_000), now)).toBe("1M AGO");
    expect(formatRelative(isoAgo(5 * 60_000), now)).toBe("5M AGO");
  });

  it("uses hours under 48 hours", () => {
    expect(formatRelative(isoAgo(2 * 60 * 60_000), now)).toBe("2H AGO");
    expect(formatRelative(isoAgo(47 * 60 * 60_000), now)).toBe("47H AGO");
  });

  it("uses days under 14 days", () => {
    expect(formatRelative(isoAgo(48 * 60 * 60_000), now)).toBe("2D AGO");
    expect(formatRelative(isoAgo(13 * 24 * 60 * 60_000), now)).toBe("13D AGO");
  });

  it("uses weeks under 8 weeks", () => {
    expect(formatRelative(isoAgo(14 * 24 * 60 * 60_000), now)).toBe("2W AGO");
    expect(formatRelative(isoAgo(7 * 7 * 24 * 60 * 60_000), now)).toBe("7W AGO");
  });

  it("uses months after 8 weeks", () => {
    expect(formatRelative(isoAgo(8 * 7 * 24 * 60 * 60_000), now)).toBe("2MO AGO");
    expect(formatRelative(isoAgo(90 * 24 * 60 * 60_000), now)).toBe("3MO AGO");
  });
});

describe("mapLevel", () => {
  it("maps GitHub quartiles onto 0-4", () => {
    expect(mapLevel("FIRST_QUARTILE")).toBe(1);
    expect(mapLevel("SECOND_QUARTILE")).toBe(2);
    expect(mapLevel("THIRD_QUARTILE")).toBe(3);
    expect(mapLevel("FOURTH_QUARTILE")).toBe(4);
  });

  it("defaults unknown levels to 0", () => {
    expect(mapLevel(undefined)).toBe(0);
    expect(mapLevel("NONE")).toBe(0);
    expect(mapLevel("FOO")).toBe(0);
  });
});

describe("fallbackCartridge", () => {
  it("builds a static cartridge from featured repo copy", () => {
    const featured = featuredRepos[0];
    expect(fallbackCartridge(featured)).toEqual({
      title: featured.title,
      description: featured.fallbackDescription,
      language: featured.fallbackLanguage,
      stars: null,
      url: featured.fallbackUrl,
      updatedAt: null,
      status: featured.fallbackStatus,
      fullName: `${featured.owner}/${featured.name}`,
    });
  });
});

describe("getGitHubSnapshot", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("GITHUB_TOKEN", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns missing_token and fallbacks when there is no token and fetches fail", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse({}, { ok: false, status: 401 })),
    );

    await expect(getGitHubSnapshot()).resolves.toEqual({
      status: "missing_token",
      gridStatus: "missing_token",
      cartridges: featuredRepos.map(fallbackCartridge),
      slots: featuredRepos.map((featured, index) => ({
        slot: index + 1,
        title: featured.title,
        fullName: `${featured.owner}/${featured.name}`,
        message: null,
        url: featured.fallbackUrl,
        at: null,
      })),
      grid: null,
    });
  });

  it("uses fallback cartridges and empty slots when repo requests fail", async () => {
    vi.stubEnv("GITHUB_TOKEN", "token");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse({}, { ok: false, status: 502 })),
    );

    const snapshot = await getGitHubSnapshot();
    expect(snapshot.status).toBe("ok");
    expect(snapshot.gridStatus).toBe("error");
    expect(snapshot.cartridges).toEqual(featuredRepos.map(fallbackCartridge));
    expect(snapshot.slots.every((slot) => slot.message === null)).toBe(true);
    expect(snapshot.grid).toBeNull();
  });
});
