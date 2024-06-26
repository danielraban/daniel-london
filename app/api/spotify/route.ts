import { NextRequest, NextResponse } from 'next/server';

import { RecentlyPlayedResponse } from '../../lib/spotify.model';
import { getRecentlyPlayed } from '../../lib/spotify';

export const revalidate = 0;

export async function GET(req: NextRequest) {
  console.log(req);
  try {
    const data: RecentlyPlayedResponse = await getRecentlyPlayed();
    console.log('data', data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch recently played tracks' }, { status: 500 });
  }
}
