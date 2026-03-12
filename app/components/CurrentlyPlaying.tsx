import { getCurrentlyPlaying } from '../lib/spotify';

const CurrentlyPlaying = async () => {
  const currentlyPlaying = await getCurrentlyPlaying();

  if (!currentlyPlaying) {
    return (
      <div className="text-center mt-4 text-neutral-500 dark:text-neutral-400">
        Not currently listening to any tunes...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-medium tracking-tighter mb-4">
        Currently Playing
      </h2>
      <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg flex items-center space-x-4">
        <img
          src={currentlyPlaying.item.album.images[0]?.url}
          alt={currentlyPlaying.item.name}
          className="w-14 h-14 rounded-md flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-neutral-900 dark:text-neutral-100 font-medium truncate">
            {currentlyPlaying.item.name}
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm truncate">
            {currentlyPlaying.item.artists.map((artist) => artist.name).join(', ')}
          </p>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm truncate">
            {currentlyPlaying.item.album.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyPlaying;
