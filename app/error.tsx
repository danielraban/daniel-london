"use client";

import { PixelButton } from "./components/pixel-button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pixel-panel px-5 py-10 text-center">
      <p className="font-pixel text-[10px] tracking-widest text-magenta">
        SYSTEM ERROR
      </p>
      <h1 className="font-pixel mt-4 text-sm leading-7 text-neon">
        GAME OVER
      </h1>
      <p className="mt-4 text-muted">Something crashed this stage.</p>
      <div className="mt-6 flex justify-center">
        <button type="button" className="pixel-button" onClick={reset}>
          RETRY
        </button>
      </div>
      <div className="mt-3 flex justify-center">
        <PixelButton href="/" variant="magenta">
          HOME
        </PixelButton>
      </div>
    </div>
  );
}
