"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { NextMatch, NextMatchSnapshot } from "@/lib/football";

function formatKickoff(iso: string) {
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

function Crest({ src, alt }: { src: string | null; alt: string }) {
  return (
    <div className="relative h-5 w-5 shrink-0 overflow-hidden bg-void">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="20px"
          className="object-contain"
          unoptimized
        />
      ) : null}
    </div>
  );
}

function matchLine(match: NextMatch) {
  const live = match.status === "IN_PLAY" || match.status === "PAUSED";
  if (live && match.homeScore !== null && match.awayScore !== null) {
    return `${match.homeTla} ${match.homeScore}-${match.awayScore} ${match.awayTla}`;
  }
  return `${match.homeTla} vs ${match.awayTla} · ${formatKickoff(match.utcDate)}`;
}

export function MatchHud() {
  const [payload, setPayload] = useState<NextMatchSnapshot | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/football/next-match", {
          signal: controller.signal,
        });
        const data = (await response.json()) as NextMatchSnapshot;
        if (!cancelled) {
          setPayload(data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        if (!cancelled) {
          setPayload({ status: "error", match: null });
        }
      }
    }

    void load();
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void load();
      }
    }, 5 * 60_000);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearInterval(id);
    };
  }, []);

  const match = payload?.match ?? null;
  if (!match) {
    return null;
  }

  const live = match.status === "IN_PLAY" || match.status === "PAUSED";
  const line = matchLine(match);

  return (
    <div
      aria-label={`West Ham next match: ${line}.`}
      className="flex min-w-0 items-center gap-2 text-muted"
    >
      <Crest src={match.homeCrest} alt={match.homeTla} />
      <Crest src={match.awayCrest} alt={match.awayTla} />
      <span
        className={`font-pixel shrink-0 text-[8px] tracking-widest ${
          live ? "animate-blink text-magenta" : "text-cyan"
        }`}
      >
        {live ? "IN PLAY" : "NEXT BOSS"}
      </span>
      <span className="min-w-0 truncate font-pixel text-[8px] tracking-widest">
        {line}
      </span>
    </div>
  );
}
