import { PixelButton } from "./pixel-button";
import type {
  ContributionGrid,
  GitHubAuthStatus,
  RepoCartridge,
  SaveSlot,
} from "@/lib/github";
import { formatRelative } from "@/lib/github";

export function RepoCartridges({ cartridges }: { cartridges: RepoCartridge[] }) {
  return (
    <section className="space-y-4">
      <h2 className="font-pixel text-[10px] tracking-widest text-cyan">
        CARTRIDGES
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {cartridges.map((repo) => (
          <article
            key={repo.fullName}
            className="pixel-panel flex flex-col p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3
                className={
                  repo.title.length > 14
                    ? "text-xl leading-6 text-neon"
                    : "font-pixel text-[11px] leading-5 text-neon"
                }
              >
                {repo.title.length > 14
                  ? repo.title
                  : repo.title.toUpperCase()}
              </h3>
              <span
                className={`font-pixel shrink-0 px-2 py-1 text-[8px] ${
                  repo.status === "LIVE"
                    ? "bg-cyan text-void"
                    : "bg-magenta text-void"
                }`}
              >
                {repo.status}
              </span>
            </div>
            <p className="flex-1 text-sm text-muted">{repo.description}</p>
            <p className="font-pixel mt-3 text-[8px] tracking-widest text-magenta">
              {[repo.language, repo.stars !== null ? `${repo.stars} XP` : null]
                .filter(Boolean)
                .join(" · ")
                .toUpperCase() || "TYPE SCRIPT"}
            </p>
            <div className="mt-4">
              <PixelButton href={repo.url}>PLAY</PixelButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PowerGrid({
  grid,
  status,
}: {
  grid: ContributionGrid | null;
  status: GitHubAuthStatus;
}) {
  return (
    <section className="pixel-panel p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-pixel text-[10px] tracking-widest text-magenta">
          POWER GRID
        </h2>
        {grid ? (
          <p className="font-pixel text-[8px] tracking-widest text-cyan">
            {grid.total} XP THIS YEAR
          </p>
        ) : null}
      </div>
      {status !== "ok" || !grid ? (
        <p className="text-muted">
          GRID OFFLINE. Add a GitHub token to light the cells.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div
            className="power-grid"
            aria-hidden="true"
          >
            {grid.weeks.map((week, weekIndex) => (
              <div key={week.days[0]?.date ?? weekIndex} className="power-week">
                {week.days.map((day) => (
                  <span
                    key={day.date}
                    className={`power-cell power-cell-${day.level}`}
                    title={`${day.date}: ${day.count}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function ContinueSlots({ slots }: { slots: SaveSlot[] }) {
  return (
    <section className="pixel-panel p-4 sm:p-5">
      <h2 className="font-pixel mb-4 text-[10px] tracking-widest text-cyan">
        CONTINUE?
      </h2>
      <ol className="space-y-4">
        {slots.map((slot, index) => {
          const loaded = Boolean(slot.message && slot.at);
          const inner = (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-pixel text-[8px] tracking-widest text-magenta">
                  SLOT {String(slot.slot).padStart(2, "0")}
                </p>
                <p className="font-pixel text-[8px] tracking-widest text-cyan">
                  {loaded && slot.at ? formatRelative(slot.at) : "— NO FILE —"}
                </p>
              </div>
              <h3
                className={
                  slot.title.length > 14
                    ? "mt-2 text-xl leading-6 text-neon"
                    : "font-pixel mt-2 text-[11px] leading-5 text-neon"
                }
              >
                {slot.title.length > 14
                  ? slot.title
                  : slot.title.toUpperCase()}
              </h3>
              {loaded ? (
                <p className="mt-1 leading-6">{slot.message}</p>
              ) : null}
            </>
          );

          return (
            <li
              key={slot.fullName}
              className={index > 0 ? "border-t-2 border-panel-2 pt-4" : undefined}
            >
              {loaded ? (
                <a
                  href={slot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-cyan"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
