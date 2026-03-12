import { env } from '../env';
import { CurrentlyPlayingResponse, RecentlyPlayedResponse } from './spotify.model';

const basic = Buffer.from(
  `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const RECENTLY_PLAYED_ENDPOINT =
  'https://api.spotify.com/v1/me/player/recently-played';
const CURRENTLY_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing';

const getAccessToken = async (): Promise<string> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch access token');
  }

  const data = await response.json() as { access_token: string };
  return data.access_token;
};

export const getRecentlyPlayed = async (): Promise<RecentlyPlayedResponse> => {
  const access_token = await getAccessToken();
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recently played tracks');
  }

  return response.json() as Promise<RecentlyPlayedResponse>;
};

export const getCurrentlyPlaying = async (): Promise<CurrentlyPlayingResponse | null> => {
  const access_token = await getAccessToken();
  const response = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || !response.ok) {
    return null;
  }

  return response.json() as Promise<CurrentlyPlayingResponse>;
};
