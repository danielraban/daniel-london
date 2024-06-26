import Badge from '../components/badge';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">about me</h1>
      <p className="prose prose-neutral dark:prose-invert">
        🚀 Senior Software Engineer by profession, explorer by passion. I thrive
        in the ever-evolving world of technology, specializing in full stack
        development with a toolkit encompassing{' '}
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
        . With a penchant for problem-solving and a knack for crafting elegant
        solutions, I'm constantly pushing boundaries to create innovative
        software solutions that leave a lasting impact.
      </p>
      <Link
        key={'/work'}
        href={'/work'}
        className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1"
      >
        view my cv
      </Link>
      <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      <p className="prose prose-neutral dark:prose-invert">
        🤖 Delving into the realm of artificial intelligence has become a
        newfound passion of mine. Beyond just coding, I'm fascinated by the
        ethical implications of AI and its potential to reshape our world.
        Exploring the ethical dimensions of AI is not just a professional
        interest but a personal mission, as I believe in leveraging technology
        responsibly for the betterment of society.
      </p>
      <Link
        key={'https://github.com/danielraban/'}
        href={'https://github.com/danielraban/'}
        rel="noopener noreferrer"
        target="_blank"
        className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1"
      >
        check out my github
      </Link>
      <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      <p className="prose prose-neutral dark:prose-invert">
        🎶 Beyond the lines of code, I'm deeply entrenched in the pulsating
        rhythms of techno and house music, where every beat tells a story.
        Cycling through the city streets, attending electrifying concerts, and
        jet-setting to new destinations fuel my adventurous spirit. Having
        called both the US and the UK home, I've savored the diverse flavors of
        Atlanta's BBQ and tacos, while also relishing the beauty of British
        landscapes.
      </p>
      <Link
        key={'/music'}
        href={'/music'}
        className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1"
      >
        listen to my sounds
      </Link>
      <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      <p className="prose prose-neutral dark:prose-invert">
        🎨 AI art is another frontier I've eagerly embraced, marveling at the
        fusion of creativity and algorithms. Through Python-powered LLMs (Large
        Language Models), I'm delving into the limitless possibilities of
        AI-generated art, experimenting with neural networks to unlock new forms
        of expression and creativity. Blending technology with artistry, I'm
        captivated by the collaborative dance between human ingenuity and
        machine intelligence.
      </p>
      <Link
        key={'/artwork'}
        href={'/artwork'}
        className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1"
      >
        see my artwork
      </Link>
      <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      ⚽ Living in the heart of East London, I'm not only surrounded by the
      vibrant pulse of the city but also by the spirit of West Ham United
      Football Club. Supporting my local team is a passion that runs deep,
      adding an extra layer of excitement to my life.
      <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      <p className="prose prose-neutral dark:prose-invert">
        💡 Embracing life with unyielding honesty and tenacity, I see each
        setback as a stepping stone for growth. I approach every challenge with
        an open mind, viewing failure not as defeat, but as an opportunity for
        learning and refinement. With a philosophy rooted in seizing every
        moment and immersing myself in different cultures, I'm on a perpetual
        journey of self-discovery and exploration.
      </p>
    </section>
  );
}
