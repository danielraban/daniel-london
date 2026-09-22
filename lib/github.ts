import { cache } from "react";
import { featuredRepos, githubUser, type FeaturedRepo } from "@/lib/content/github";

const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const REVALIDATE_SECONDS = 3600;

export type GitHubAuthStatus = "ok" | "missing_token" | "error";

export type RepoCartridge = {
  title: string;
  description: string;
  language: string | null;
  stars: number | null;
  url: string;
  updatedAt: string | null;
  status: "LIVE" | "PRIVATE";
  fullName: string;
};

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type ContributionGrid = {
  total: number;
  weeks: ContributionWeek[];
};

export type SaveSlot = {
  slot: number;
  title: string;
  fullName: string;
  message: string | null;
  url: string;
  at: string | null;
};

export type GitHubSnapshot = {
  status: GitHubAuthStatus;
  gridStatus: GitHubAuthStatus;
  cartridges: RepoCartridge[];
  slots: SaveSlot[];
  grid: ContributionGrid | null;
};

function token() {
  return process.env.GITHUB_TOKEN?.trim() ?? "";
}

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "daniel.london",
  };
  const auth = token();
  if (auth) {
    headers.Authorization = `Bearer ${auth}`;
  }
  return headers;
}

async function githubFetch(url: string) {
  return fetch(url, {
    headers: githubHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });
}

function mapLevel(level: string | undefined): ContributionDay["level"] {
  switch (level) {
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    default:
      return 0;
  }
}

function fallbackCartridge(featured: FeaturedRepo): RepoCartridge {
  return {
    title: featured.title,
    description: featured.fallbackDescription,
    language: featured.fallbackLanguage,
    stars: null,
    url: featured.fallbackUrl,
    updatedAt: null,
    status: featured.fallbackStatus,
    fullName: `${featured.owner}/${featured.name}`,
  };
}

async function getRepoCartridge(featured: FeaturedRepo): Promise<RepoCartridge> {
  const fallback = fallbackCartridge(featured);

  try {
    const response = await githubFetch(
      `${GITHUB_API}/repos/${featured.owner}/${featured.name}`,
    );

    if (!response.ok) {
      return fallback;
    }

    const data = (await response.json()) as {
      description?: string | null;
      language?: string | null;
      stargazers_count?: number;
      html_url?: string;
      pushed_at?: string;
    };

    return {
      title: featured.title,
      description: data.description || featured.fallbackDescription,
      language: data.language ?? featured.fallbackLanguage,
      stars: data.stargazers_count ?? 0,
      url: data.html_url ?? fallback.url,
      updatedAt: data.pushed_at ?? null,
      status: "LIVE",
      fullName: fallback.fullName,
    };
  } catch {
    return fallback;
  }
}

async function getSaveSlot(
  featured: FeaturedRepo,
  index: number,
): Promise<SaveSlot> {
  const empty: SaveSlot = {
    slot: index + 1,
    title: featured.title,
    fullName: `${featured.owner}/${featured.name}`,
    message: null,
    url: featured.fallbackUrl,
    at: null,
  };

  try {
    const response = await githubFetch(
      `${GITHUB_API}/repos/${featured.owner}/${featured.name}/commits?per_page=1`,
    );

    if (!response.ok) {
      return empty;
    }

    const commits = (await response.json()) as {
      html_url?: string;
      commit?: {
        message?: string;
        author?: { date?: string };
        committer?: { date?: string };
      };
    }[];
    const commit = commits[0];
    const message = commit?.commit?.message?.split("\n")[0]?.trim();

    if (!commit || !message) {
      return empty;
    }

    return {
      ...empty,
      message,
      url: commit.html_url ?? empty.url,
      at: commit.commit?.committer?.date ?? commit.commit?.author?.date ?? null,
    };
  } catch {
    return empty;
  }
}

async function getContributionGrid(): Promise<{
  status: GitHubAuthStatus;
  grid: ContributionGrid | null;
}> {
  if (!token()) {
    return { status: "missing_token", grid: null };
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        ...githubHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query ($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { login: githubUser },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return { status: "error", grid: null };
    }

    const payload = (await response.json()) as {
      errors?: { message?: string }[];
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions?: number;
              weeks?: {
                contributionDays?: {
                  date?: string;
                  contributionCount?: number;
                  contributionLevel?: string;
                }[];
              }[];
            };
          };
        };
      };
    };

    if (payload.errors?.length || !payload.data?.user) {
      return { status: "error", grid: null };
    }

    const calendar =
      payload.data.user.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return { status: "error", grid: null };
    }

    return {
      status: "ok",
      grid: {
        total: calendar.totalContributions ?? 0,
        weeks: (calendar.weeks ?? []).map((week) => ({
          days: (week.contributionDays ?? []).map((day) => ({
            date: day.date ?? "",
            count: day.contributionCount ?? 0,
            level: mapLevel(day.contributionLevel),
          })),
        })),
      },
    };
  } catch {
    return { status: "error", grid: null };
  }
}

export const getGitHubSnapshot = cache(async (): Promise<GitHubSnapshot> => {
  const [cartridges, slots, heatmap] = await Promise.all([
    Promise.all(featuredRepos.map(getRepoCartridge)),
    Promise.all(featuredRepos.map(getSaveSlot)),
    getContributionGrid(),
  ]);

  return {
    status: token() ? "ok" : "missing_token",
    gridStatus: heatmap.status,
    cartridges,
    slots,
    grid: heatmap.grid,
  };
});

export function formatRelative(iso: string, now = Date.now()) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) {
    return "";
  }
  const seconds = Math.max(0, Math.round((now - then) / 1000));
  if (seconds < 60) {
    return "JUST NOW";
  }
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes}M AGO`;
  }
  const hours = Math.round(minutes / 60);
  if (hours < 48) {
    return `${hours}H AGO`;
  }
  const days = Math.round(hours / 24);
  if (days < 14) {
    return `${days}D AGO`;
  }
  const weeks = Math.round(days / 7);
  if (weeks < 8) {
    return `${weeks}W AGO`;
  }
  return `${Math.round(days / 30)}MO AGO`;
}
