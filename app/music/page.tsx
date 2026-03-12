import { Suspense } from 'react';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import RecentlyPlayedTracks from '../components/RecentlyPlayedTracks';

export const metadata = {
  title: 'Music',
};

export default function MusicPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">music</h1>
      <div className="space-y-8">
        <Suspense
          fallback={
            <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg animate-pulse h-20" />
          }
        >
          <CurrentlyPlaying />
        </Suspense>
        <Suspense
          fallback={
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-lg animate-pulse h-16"
                />
              ))}
            </div>
          }
        >
          <RecentlyPlayedTracks />
        </Suspense>
      </div>
    </section>
  );
}
