import { getNextMatchSnapshot } from "@/lib/football";

export async function GET() {
  try {
    const snapshot = await getNextMatchSnapshot();
    return Response.json(snapshot, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Football next-match route failed", error);
    return Response.json(
      { status: "error", match: null },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60",
        },
      },
    );
  }
}
