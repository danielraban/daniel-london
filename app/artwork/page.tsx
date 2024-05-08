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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (posts.length === 0) return <p>No data fetched</p>;

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Artwork</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
        {posts.map(post => (
          <div key={post.id}>
            <img
              src={post.media_url}
              className="h-auto max-w-full rounded-lg"
              alt={`Post caption: ${post.caption || 'Instagram post'}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
