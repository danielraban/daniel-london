'use client';

import CurrentlyPlaying from '../components/CurrentlyPlaying';
import RecentlyPlayedTracks from '../components/RecentlyPlayedTracks';

const MusicPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <CurrentlyPlaying />
      <RecentlyPlayedTracks />
    </div>
  );
};

export default MusicPage;
