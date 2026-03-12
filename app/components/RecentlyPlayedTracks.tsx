import { getRecentlyPlayed } from '../lib/spotify';

const RecentlyPlayedTracks = async () => {
  const recentlyPlayed = await getRecentlyPlayed();

  return (
    <div>
      <h2 className="text-xl font-medium tracking-tighter mb-4">
        Recently Played
      </h2>
      <ul className="space-y-2">
        {recentlyPlayed.items.map((item) => (
          <li
            key={item.track.id}
            className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-lg flex items-center space-x-3"
          >
            <img
              src={item.track.album.images[0]?.url}
              alt={item.track.name}
              className="w-10 h-10 rounded-md flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-neutral-900 dark:text-neutral-100 font-medium text-sm truncate">
                {item.track.name}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm truncate">
                {item.track.artists.map((artist) => artist.name).join(', ')}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyPlayedTracks;
