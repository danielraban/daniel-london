import Badge from './components/badge';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <div>
      <section>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">
          welcome, i&apos;m daniel!
        </h1>
        <p className="prose prose-neutral dark:prose-invert">
          As a Senior Software Engineer specializing in full stack development,
          I wield a diverse toolkit that includes{' '}
          <span className="not-prose">
            <Badge href="https://spring.io/">
              <img
                className="!mr-1"
                style={{ width: 14, height: 14 }}
                src="/spring-boot.svg"
              />
              Java
            </Badge>
          </span>
          ,{' '}
          <Badge href="https://angular.io">
            <img
              className="!mr-1"
              style={{ width: 14, height: 14 }}
              src="/angular.svg"
            />
            Angular
          </Badge>
          ,{' '}
          <Badge href="https://react.dev">
            <svg
              width="14"
              height="14"
              role="img"
              aria-label="React logo"
              className="!mr-1"
            >
              <use href="/sprite.svg#react" />
            </svg>
            React
          </Badge>
          ,{' '}
          <Badge href="https://typescriptlang.org">
            <img
              className="!mr-1"
              style={{ width: 14, height: 14 }}
              src="/ts.svg"
            />
            Typescript
          </Badge>
          ,{' '}
          <Badge href="https://typescriptlang.org">
            <img
              className="!mr-1"
              style={{ width: 14, height: 14 }}
              src="/python.svg"
            />
            Python
          </Badge>
          , &{' '}
          <Badge href="https://nodejs.org/">
            <img
              className="!mr-1"
              style={{ width: 14, height: 14 }}
              src="/nodejs.svg"
            />
            Node
          </Badge>
          . My passion for technology extends into AI, where I explore its
          ethical implications and potential societal impacts. Beyond
          technology, I&apos;m deeply connected to the vibrant worlds of techno
          and house music, and revel in creating AI-generated art. Living in
          East London, I embrace every experience with honesty and tenacity,
          always ready to learn from life&apos;s challenges and explore new
          cultures.
        </p>
        <Link
          href="/about"
          className="mt-3 inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          read my full bio
          <span aria-hidden>→</span>
        </Link>
      </section>
      <hr className="my-8 border-neutral-200 dark:border-neutral-700" />
      <section>
        <div className="grid grid-cols-2 gap-3">
          <div className="overflow-hidden rounded-lg">
            <img
              className="h-auto w-full rounded-lg transition-transform duration-300 hover:scale-[1.02]"
              src="/images/aod.png"
              alt="Artwork"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              className="h-auto w-full rounded-lg transition-transform duration-300 hover:scale-[1.02]"
              src="/images/apoc.png"
              alt="Artwork"
            />
          </div>
        </div>
        <Link
          href="/artwork"
          className="mt-3 inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          see more of my artwork
          <span aria-hidden>→</span>
        </Link>
      </section>
    </div>
  );
}
