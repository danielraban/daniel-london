'use client';

import React, { useEffect, useState } from 'react';

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp: string;
}

export default function ArtPage() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const API_URL = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setPosts(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">artwork</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">artwork</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          Couldn't load artwork right now.
        </p>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">artwork</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          No posts yet.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">artwork</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="group overflow-hidden rounded-lg">
            <img
              src={post.media_url}
              className="h-auto w-full rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
              alt={post.caption || 'Artwork'}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
