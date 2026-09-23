const WEST_HAM_ID = "133636";
const NEXT_EVENTS = `https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=${WEST_HAM_ID}`;
const LAST_EVENTS = `https://www.thesportsdb.com/api/v1/json/123/eventslast.php?id=${WEST_HAM_ID}`;
const REVALIDATE_SECONDS = 300;

export type FootballStatus = "ok" | "error";

export type NextMatch = {
  homeTla: string;
  awayTla: string;
  homeCrest: string | null;
  awayCrest: string | null;
  utcDate: string;
  status: "SCHEDULED" | "TIMED" | "IN_PLAY" | "PAUSED" | "OTHER";
  homeScore: number | null;
  awayScore: number | null;
  competition: string | null;
};

export type NextMatchSnapshot = {
  status: FootballStatus;
  match: NextMatch | null;
};

export type SportsDbEvent = {
  strTimestamp?: string;
  dateEvent?: string;
  strTime?: string;
  strHomeTeam?: string;
  strAwayTeam?: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  strStatus?: string | null;
  intHomeScore?: string | number | null;
  intAwayScore?: string | number | null;
  strLeague?: string;
};

const TEAM_TLA: Record<string, string> = {
  "West Ham United": "WHU",
  "West Ham": "WHU",
  "Queens Park Rangers": "QPR",
  "Manchester United": "MUN",
  "Manchester City": "MCI",
  "Tottenham Hotspur": "TOT",
  "Nottingham Forest": "NFO",
  "Sheffield United": "SHU",
  "Sheffield Wednesday": "SHW",
  "Blackburn Rovers": "BLB",
  "Birmingham City": "BIR",
  "Leicester City": "LEI",
  "Leeds United": "LEE",
  "Norwich City": "NOR",
  "Coventry City": "COV",
  "Swansea City": "SWA",
  "Cardiff City": "CAR",
  "Stoke City": "STK",
  "Derby County": "DER",
  "Hull City": "HUL",
  "Ipswich Town": "IPS",
  "Middlesbrough": "MID",
  "Millwall": "MIL",
  "Preston North End": "PNE",
  "Oxford United": "OXF",
  "Portsmouth": "POR",
  "Charlton Athletic": "CHA",
  "Watford": "WAT",
  "Wrexham": "WRX",
  "Bolton Wanderers": "BOL",
  "Fulham": "FUL",
};

export function teamTla(name: string | undefined) {
  if (!name) {
    return "???";
  }
  if (TEAM_TLA[name]) {
    return TEAM_TLA[name];
  }
  const cleaned = name.replace(/^(AFC|FC)\s+/i, "").trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}${parts[2]?.[0] ?? parts[0][1] ?? ""}`.toUpperCase();
  }
  return cleaned.slice(0, 3).toUpperCase();
}

export function toIso(event: SportsDbEvent) {
  if (event.strTimestamp) {
    return event.strTimestamp.endsWith("Z")
      ? event.strTimestamp
      : `${event.strTimestamp}Z`;
  }
  if (event.dateEvent && event.strTime) {
    return `${event.dateEvent}T${event.strTime}Z`;
  }
  return event.dateEvent ? `${event.dateEvent}T12:00:00Z` : "";
}

export function parseScore(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function mapStatus(status: string | null | undefined): NextMatch["status"] {
  const code = (status ?? "NS").toUpperCase();
  if (code === "1H" || code === "2H" || code === "ET" || code === "P" || code === "LIVE") {
    return "IN_PLAY";
  }
  if (code === "HT") {
    return "PAUSED";
  }
  if (code === "NS" || code === "TBD") {
    return "TIMED";
  }
  return "OTHER";
}

export function mapEvent(event: SportsDbEvent): NextMatch | null {
  const utcDate = toIso(event);
  if (!utcDate || !event.strHomeTeam || !event.strAwayTeam) {
    return null;
  }

  const status = mapStatus(event.strStatus);
  const live = status === "IN_PLAY" || status === "PAUSED";

  return {
    homeTla: teamTla(event.strHomeTeam),
    awayTla: teamTla(event.strAwayTeam),
    homeCrest: event.strHomeTeamBadge || null,
    awayCrest: event.strAwayTeamBadge || null,
    utcDate,
    status,
    homeScore: live ? parseScore(event.intHomeScore) : null,
    awayScore: live ? parseScore(event.intAwayScore) : null,
    competition: event.strLeague ?? null,
  };
}

export function formatKickoff(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(",", "")
    .toUpperCase();
}

export function matchLine(match: NextMatch) {
  const live = match.status === "IN_PLAY" || match.status === "PAUSED";
  if (live && match.homeScore !== null && match.awayScore !== null) {
    return `${match.homeTla} ${match.homeScore}-${match.awayScore} ${match.awayTla}`;
  }
  return `${match.homeTla} vs ${match.awayTla} · ${formatKickoff(match.utcDate)}`;
}

async function fetchEvents(url: string, key: "events" | "results") {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok) {
    console.error("TheSportsDB fetch failed", { url, status: response.status });
    return [] as SportsDbEvent[];
  }
  const data = (await response.json()) as Partial<Record<typeof key, SportsDbEvent[]>>;
  return data[key] ?? [];
}

export async function getNextMatchSnapshot(): Promise<NextMatchSnapshot> {
  try {
    const [upcoming, recent] = await Promise.all([
      fetchEvents(NEXT_EVENTS, "events"),
      fetchEvents(LAST_EVENTS, "results"),
    ]);

    const live = [...recent, ...upcoming]
      .map(mapEvent)
      .filter((match): match is NextMatch => match !== null)
      .find((match) => match.status === "IN_PLAY" || match.status === "PAUSED");

    const next = upcoming
      .map(mapEvent)
      .filter((match): match is NextMatch => match !== null)
      .sort(
        (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime(),
      )[0];

    return { status: "ok", match: live ?? next ?? null };
  } catch (error) {
    console.error("TheSportsDB next match failed", error);
    return { status: "error", match: null };
  }
}
