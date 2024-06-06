'use client';

import { PlayHistory, RecentlyPlayedResponse } from '../lib/spotify.model';
import { useEffect, useState } from 'react';

const RecentlyPlayedTracks = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<PlayHistory[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch('/api/recently_played');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: RecentlyPlayedResponse = await response.json();
        setRecentlyPlayed(data.items || []);
      } catch (error) {
        console.error('Failed to fetch recently played tracks:', error);
        setError('Failed to fetch recently played tracks');
      }
    };

    fetchRecentlyPlayed();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!recentlyPlayed) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Recently Played Tracks</h1>
      <ul className="space-y-4">
        {recentlyPlayed.map((item) => (
          <li key={item.track.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img
              src={item.track.album.images[0]?.url}
              alt={item.track.name}
              className="w-16 h-16 rounded-lg"
            />
            <div>
              <p className="text-gray-500 text-lg font-semibold">{item.track.name}</p>
              <p className="text-gray-500">
                {item.track.artists.map((artist) => artist.name).join(', ')}
              </p>
              <p className="text-gray-500 text-sm">{item.track.album.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyPlayedTracks;
