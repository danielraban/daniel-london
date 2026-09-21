import { PixelButton } from "./components/pixel-button";

export default function NotFound() {
  return (
    <div className="pixel-panel px-5 py-10 text-center">
      <p className="font-pixel text-[10px] tracking-widest text-magenta">
        ERROR 404
      </p>
      <h1 className="font-pixel mt-4 text-sm leading-7 text-neon">
        STAGE NOT FOUND
      </h1>
      <p className="mt-4 text-muted">This cartridge is empty.</p>
      <div className="mt-6 flex justify-center">
        <PixelButton href="/">CONTINUE</PixelButton>
      </div>
    </div>
  );
}
