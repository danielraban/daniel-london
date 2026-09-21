"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NowPlayingSnapshot } from "@/lib/spotify";
import { AlbumArt, Equalizer } from "./album-art";

export function StereoHud() {
  const [payload, setPayload] = useState<NowPlayingSnapshot | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/spotify/now-playing", {
          signal: controller.signal,
          cache: "no-store",
        });
        const data = (await response.json()) as NowPlayingSnapshot;
        if (!cancelled) {
          setPayload(data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        if (!cancelled) {
          setPayload({ status: "error", nowPlaying: null });
        }
      }
    }

    void load();
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void load();
      }
    }, 20_000);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearInterval(id);
    };
  }, []);

  const status = payload?.status ?? "ok";
  const track = payload?.nowPlaying ?? null;
  const authFailed = payload !== null && status !== "ok";
  const label = authFailed
    ? "STEREO OFF"
    : track
      ? track.isPlaying
        ? "ON AIR"
        : "PAUSED"
      : "STEREO OFF";
  const detail = track ? `${track.name} — ${track.artists}` : "";
  const aria = track
    ? `${label}: ${track.name} by ${track.artists}. Open music.`
    : "Stereo off. Open music.";

  return (
    <Link
      href="/music"
      aria-label={aria}
      className="flex min-w-0 items-center gap-2 text-muted hover:text-cyan"
    >
      {track ? (
        <AlbumArt
          src={track.albumImage}
          alt={`${track.album} cover`}
          size="hud"
        />
      ) : null}
      <span
        className={`font-pixel shrink-0 text-[8px] tracking-widest ${
          track?.isPlaying ? "animate-blink text-magenta" : "text-cyan"
        }`}
      >
        {label}
      </span>
      <Equalizer playing={Boolean(track?.isPlaying)} />
      {detail ? (
        <span className="min-w-0 truncate font-pixel text-[8px] tracking-widest">
          {detail}
        </span>
      ) : null}
    </Link>
  );
}
