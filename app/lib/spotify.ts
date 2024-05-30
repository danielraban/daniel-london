import { CurrentlyPlayingResponse, RecentlyPlayedResponse } from '../lib/spotify.model'; // Adjust the path as necessary

import axios from 'axios';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';
const CURRENTLY_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      TOKEN_ENDPOINT,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log(response.data, 'Access Token Response');
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch access token');
  }
};

export const getRecentlyPlayed = async (): Promise<RecentlyPlayedResponse> => {
  try {
    console.log('Fetching recently played tracks');
    const access_token = await getAccessToken();
    console.log('Access Token:', access_token);

    const response = await axios.get(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response.data, 'Recently Played Response');
    return response.data as RecentlyPlayedResponse;
  } catch (error) {
    console.error('Error fetching recently played tracks:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch recently played tracks');
  }
};

export const getCurrentlyPlaying = async (): Promise<CurrentlyPlayingResponse> => {
  try {
    console.log('Fetching currently playing track');
    const access_token = await getAccessToken();
    console.log('Access Token:', access_token);

    const response = await axios.get(CURRENTLY_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response.data, 'Currently Playing Response');
    return response.data as CurrentlyPlayingResponse;
  } catch (error) {
    console.error('Error fetching currently playing track:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch currently playing track');
  }
};
