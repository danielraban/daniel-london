import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <div>
      <section>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">welcome</h1>
        <p className="prose prose-neutral dark:prose-invert">
          As a Senior Software Engineer specializing in full stack development,
          I wield a diverse toolkit that includes Java, Angular, React,
          TypeScript, Python, and NodeJS. My passion for technology extends into
          AI, where I explore its ethical implications and potential societal
          impacts. Beyond technology, I'm deeply connected to the vibrant worlds
          of techno and house music, and revel in creating AI-generated art.
          Living in East London, I embrace every experience with honesty and
          tenacity, always ready to learn from life's challenges and explore new
          cultures.
        </p>
        <Link
          key={'/about'}
          href={'/about'}
          className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1"
        >
          read my full bio
        </Link>
      </section>
      <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      <section>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
              alt=""
            />
          </div>
        </div>
        <Link
          key={'/art'}
          href={'/art'}
          className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1"
        >
          see more of my artwork
        </Link>
      </section>
    </div>
  );
}
