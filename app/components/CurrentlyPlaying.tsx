// components/CurrentlyPlaying.tsx
'use client';

import { useEffect, useState } from 'react';

import { CurrentlyPlayingResponse } from '../lib/spotify.model';

const CurrentlyPlaying = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlayingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      try {
        const response = await fetch('/api/currently_playing');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: CurrentlyPlayingResponse = await response.json();
        setCurrentlyPlaying(data);
      } catch (error) {
        console.error('Failed to fetch currently playing track:', error);
        setError('Failed to fetch currently playing track');
      }
    };

    fetchCurrentlyPlaying();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!currentlyPlaying) {
    return <div className="text-center mt-4">Not currently listening to any tunes...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Currently Playing Track</h1>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
        <img
          src={currentlyPlaying.item.album.images[0]?.url}
          alt={currentlyPlaying.item.name}
          className="w-16 h-16 rounded-lg"
        />
        <div>
          <p className="text-gray-500 text-lg font-semibold">{currentlyPlaying.item.name}</p>
          <p className="text-gray-500">
            {currentlyPlaying.item.artists.map((artist) => artist.name).join(', ')}
          </p>
          <p className="text-gray-500 text-sm">{currentlyPlaying.item.album.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyPlaying;
