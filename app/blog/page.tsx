import Link from 'next/link';
import { Suspense } from 'react';
import ViewCounter from './view-counter';
import { getBlogPosts } from 'app/db/blog';
import { getViewsCount } from 'app/db/queries';

export const metadata = {
  title: 'Blog',
  description:
    'Read my thoughts on software development, design, fashion, music, and more',
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my blog
      </h1>
      {allBlogs
        .sort((a, b) =>
          new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ? -1
            : 1
        )
        .map((post) => (
          <Link
            key={post.slug}
            className="group flex flex-col mb-6"
            href={`/blog/${post.slug}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:underline underline-offset-2 decoration-neutral-400 dark:decoration-neutral-600">
                {post.metadata.title}
              </p>
              <p className="text-neutral-500 dark:text-neutral-500 text-sm shrink-0 tabular-nums">
                {new Date(post.metadata.publishedAt).toLocaleDateString(
                  'en-US',
                  { month: 'short', year: 'numeric' }
                )}
              </p>
            </div>
            <Suspense fallback={<p className="text-neutral-500 text-sm h-5" />}>
              <Views slug={post.slug} />
            </Suspense>
          </Link>
        ))}
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}
