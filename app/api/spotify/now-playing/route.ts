import { getNowPlayingSnapshot } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snapshot = await getNowPlayingSnapshot();
    return Response.json(snapshot, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Spotify now-playing route failed", error);
    return Response.json(
      { status: "error", nowPlaying: null },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
