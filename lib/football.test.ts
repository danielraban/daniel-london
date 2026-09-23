import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  formatKickoff,
  getNextMatchSnapshot,
  mapEvent,
  mapStatus,
  matchLine,
  parseScore,
  teamTla,
  toIso,
  type NextMatch,
  type SportsDbEvent,
} from "@/lib/football";

function event(overrides: Partial<SportsDbEvent> = {}): SportsDbEvent {
  return {
    strTimestamp: "2026-01-17T15:00:00Z",
    strHomeTeam: "West Ham United",
    strAwayTeam: "Arsenal",
    strHomeTeamBadge: "https://example.com/whu.png",
    strAwayTeamBadge: "https://example.com/ars.png",
    strStatus: "NS",
    intHomeScore: null,
    intAwayScore: null,
    strLeague: "Premier League",
    ...overrides,
  };
}

function jsonResponse(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  const status = init.status ?? (init.ok === false ? 500 : 200);
  return {
    ok: init.ok ?? (status >= 200 && status < 300),
    status,
    json: async () => body,
  } as Response;
}

function mockSportsDb({
  upcoming = [],
  recent = [],
}: {
  upcoming?: SportsDbEvent[];
  recent?: SportsDbEvent[];
} = {}) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("eventsnext")) {
        return jsonResponse({ events: upcoming });
      }
      if (url.includes("eventslast")) {
        return jsonResponse({ results: recent });
      }
      return jsonResponse({}, { ok: false, status: 404 });
    }),
  );
}

const scheduledMatch: NextMatch = {
  homeTla: "WHU",
  awayTla: "MUN",
  homeCrest: null,
  awayCrest: null,
  utcDate: "2026-01-17T15:00:00Z",
  status: "TIMED",
  homeScore: null,
  awayScore: null,
  competition: "Premier League",
};

describe("teamTla", () => {
  it("returns mapped abbreviations", () => {
    expect(teamTla("West Ham United")).toBe("WHU");
    expect(teamTla("West Ham")).toBe("WHU");
    expect(teamTla("Queens Park Rangers")).toBe("QPR");
  });

  it("returns ??? when the name is missing", () => {
    expect(teamTla(undefined)).toBe("???");
    expect(teamTla("")).toBe("???");
  });

  it("strips AFC/FC prefixes before falling back", () => {
    expect(teamTla("AFC Bournemouth")).toBe("BOU");
    expect(teamTla("FC Barcelona")).toBe("BAR");
  });

  it("builds a three-letter fallback from multi-word names", () => {
    expect(teamTla("Brighton & Hove Albion")).toBe("B&H");
    expect(teamTla("Crystal Palace")).toBe("CPR");
  });

  it("slices a single unmapped word to three letters", () => {
    expect(teamTla("Arsenal")).toBe("ARS");
  });
});

describe("toIso", () => {
  it("keeps timestamps that already end in Z", () => {
    expect(toIso({ strTimestamp: "2026-01-17T15:00:00Z" })).toBe(
      "2026-01-17T15:00:00Z",
    );
  });

  it("appends Z when the timestamp is missing it", () => {
    expect(toIso({ strTimestamp: "2026-01-17T15:00:00" })).toBe(
      "2026-01-17T15:00:00Z",
    );
  });

  it("combines dateEvent and strTime", () => {
    expect(toIso({ dateEvent: "2026-01-17", strTime: "15:00:00" })).toBe(
      "2026-01-17T15:00:00Z",
    );
  });

  it("defaults a date-only event to noon UTC", () => {
    expect(toIso({ dateEvent: "2026-01-17" })).toBe("2026-01-17T12:00:00Z");
  });

  it("returns an empty string when no date is present", () => {
    expect(toIso({})).toBe("");
  });
});

describe("parseScore", () => {
  it("parses numbers and numeric strings", () => {
    expect(parseScore(2)).toBe(2);
    expect(parseScore("2")).toBe(2);
    expect(parseScore(0)).toBe(0);
  });

  it("returns null for empty or invalid values", () => {
    expect(parseScore("")).toBeNull();
    expect(parseScore(null)).toBeNull();
    expect(parseScore(undefined)).toBeNull();
    expect(parseScore("abc")).toBeNull();
    expect(parseScore(Number.NaN)).toBeNull();
  });
});

describe("mapStatus", () => {
  it.each(["1H", "2H", "ET", "P", "LIVE", "live"])(
    "maps %s to IN_PLAY",
    (status) => {
      expect(mapStatus(status)).toBe("IN_PLAY");
    },
  );

  it("maps HT to PAUSED", () => {
    expect(mapStatus("HT")).toBe("PAUSED");
    expect(mapStatus("ht")).toBe("PAUSED");
  });

  it("maps NS, TBD, and missing status to TIMED", () => {
    expect(mapStatus("NS")).toBe("TIMED");
    expect(mapStatus("TBD")).toBe("TIMED");
    expect(mapStatus(null)).toBe("TIMED");
    expect(mapStatus(undefined)).toBe("TIMED");
  });

  it("maps anything else to OTHER", () => {
    expect(mapStatus("FT")).toBe("OTHER");
    expect(mapStatus("AET")).toBe("OTHER");
  });
});

describe("mapEvent", () => {
  it("returns null when teams or date are missing", () => {
    expect(mapEvent(event({ strHomeTeam: undefined }))).toBeNull();
    expect(mapEvent(event({ strAwayTeam: undefined }))).toBeNull();
    expect(
      mapEvent(
        event({
          strTimestamp: undefined,
          dateEvent: undefined,
          strTime: undefined,
        }),
      ),
    ).toBeNull();
  });

  it("maps TLAs, crests, and competition for a timed fixture", () => {
    expect(mapEvent(event())).toEqual({
      homeTla: "WHU",
      awayTla: "ARS",
      homeCrest: "https://example.com/whu.png",
      awayCrest: "https://example.com/ars.png",
      utcDate: "2026-01-17T15:00:00Z",
      status: "TIMED",
      homeScore: null,
      awayScore: null,
      competition: "Premier League",
    });
  });

  it("includes scores only when the match is live or paused", () => {
    expect(
      mapEvent(
        event({
          strStatus: "LIVE",
          intHomeScore: "2",
          intAwayScore: 1,
        }),
      ),
    ).toMatchObject({
      status: "IN_PLAY",
      homeScore: 2,
      awayScore: 1,
    });

    expect(
      mapEvent(
        event({
          strStatus: "HT",
          intHomeScore: "1",
          intAwayScore: "1",
        }),
      ),
    ).toMatchObject({
      status: "PAUSED",
      homeScore: 1,
      awayScore: 1,
    });

    expect(
      mapEvent(
        event({
          strStatus: "NS",
          intHomeScore: "0",
          intAwayScore: "0",
        }),
      ),
    ).toMatchObject({
      status: "TIMED",
      homeScore: null,
      awayScore: null,
    });
  });
});

describe("formatKickoff", () => {
  it("formats a GMT kickoff in Europe/London", () => {
    expect(formatKickoff("2026-01-17T15:00:00Z")).toBe("SAT 15:00");
  });

  it("shifts a BST kickoff into London time", () => {
    expect(formatKickoff("2026-06-20T14:00:00Z")).toBe("SAT 15:00");
  });

  it("returns an empty string for invalid dates", () => {
    expect(formatKickoff("not-a-date")).toBe("");
  });
});

describe("matchLine", () => {
  it("shows the live score when both sides have totals", () => {
    expect(
      matchLine({
        ...scheduledMatch,
        status: "IN_PLAY",
        homeScore: 2,
        awayScore: 1,
      }),
    ).toBe("WHU 2-1 MUN");
  });

  it("falls back to kickoff when a live match is missing scores", () => {
    expect(
      matchLine({
        ...scheduledMatch,
        status: "PAUSED",
        homeScore: null,
        awayScore: 1,
      }),
    ).toBe("WHU vs MUN · SAT 15:00");
  });

  it("shows teams and kickoff for a scheduled match", () => {
    expect(matchLine(scheduledMatch)).toBe("WHU vs MUN · SAT 15:00");
  });
});

describe("getNextMatchSnapshot", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("prefers a live or paused match from recent events over upcoming", async () => {
    mockSportsDb({
      upcoming: [event({ strTimestamp: "2026-01-24T15:00:00Z", strStatus: "NS" })],
      recent: [
        event({
          strTimestamp: "2026-01-17T15:00:00Z",
          strStatus: "LIVE",
          intHomeScore: "1",
          intAwayScore: "0",
        }),
      ],
    });

    await expect(getNextMatchSnapshot()).resolves.toEqual({
      status: "ok",
      match: mapEvent(
        event({
          strTimestamp: "2026-01-17T15:00:00Z",
          strStatus: "LIVE",
          intHomeScore: "1",
          intAwayScore: "0",
        }),
      ),
    });
  });

  it("treats a paused match as live", async () => {
    mockSportsDb({
      upcoming: [event({ strAwayTeam: "Fulham" })],
      recent: [event({ strStatus: "HT", intHomeScore: 0, intAwayScore: 0 })],
    });

    const snapshot = await getNextMatchSnapshot();
    expect(snapshot.match?.status).toBe("PAUSED");
    expect(snapshot.match?.awayTla).toBe("ARS");
  });

  it("picks the earliest upcoming fixture when nothing is live", async () => {
    mockSportsDb({
      upcoming: [
        event({
          strTimestamp: "2026-02-01T15:00:00Z",
          strAwayTeam: "Fulham",
        }),
        event({
          strTimestamp: "2026-01-24T12:00:00Z",
          strAwayTeam: "Chelsea",
        }),
      ],
    });

    const snapshot = await getNextMatchSnapshot();
    expect(snapshot).toMatchObject({
      status: "ok",
      match: {
        awayTla: "CHE",
        utcDate: "2026-01-24T12:00:00Z",
      },
    });
  });

  it("returns ok with no match when both lists are empty", async () => {
    mockSportsDb();
    await expect(getNextMatchSnapshot()).resolves.toEqual({
      status: "ok",
      match: null,
    });
  });

  it("returns error when fetch throws", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("network"))),
    );

    await expect(getNextMatchSnapshot()).resolves.toEqual({
      status: "error",
      match: null,
    });
  });
});
