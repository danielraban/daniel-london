import Badge from '../components/badge';
import React from 'react';
export default function Page() {
  return (
    <>
      <section className="mb-4">
        <h1 className="font-medium text-2xl mb-4 tracking-tighter">work</h1>
        <p className="prose prose-neutral dark:prose-invert">
          🚀 Hey there! I'm a dynamic and results-driven Fullstack Software
          Engineer with a knack for thinking outside the box. My passion lies in
          crafting customer-focused solutions that make a real impact. From
          brainstorming innovative ideas to bringing them to life through
          design, development, and implementation, I thrive in the fast-paced
          world of software development.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <p className="prose prose-neutral dark:prose-invert">
          💻 Specializing in the entire software development lifecycle, I'm your
          go-to guru for designing sleek interfaces, integrating complex
          systems, and solving integration puzzles with finesse. My toolbox is
          packed with the latest tech goodies, including HTML, CSS, JavaScript,
          <span className="not-prose">
          <Badge href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
              <img
                className="!mr-1"
                style={{ width: 14, height: 14 }}
                src="/javascript.svg"
              />
              JavaScript
            </Badge>
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
          ,{' '}
          <Badge href="https://nodejs.org/">
            <img
              className="!mr-1"
              style={{ width: 14, height: 14 }}
              src="/nodejs.svg"
            />
            Node
          </Badge>
          ,{' '}
          <Badge href="https://ngrx.io/">
              <img
                className="!mr-1"
                style={{ width: 14, height: 14 }}
                src="/ngrx.svg"
              />
              NgRX
            </Badge>,{' '}
            
            <Badge href="https://redux.js.org/">
              <img
                className="!mr-1"
                style={{ width: 14, height: 14 }}
                src="/redux.svg"
              />
              Redux
            </Badge>,{' '}
            <Badge href="https://rxjs.dev/">
              <img
                className="!mr-1"
                style={{ width: 14, height: 14 }}
                src="/rxjs.svg"
              />
              RxJS
            </Badge>,{'&' }
            <Badge href="https://rubyonrails.org/">
              <img
                className="!mr-1"
                style={{ width: 14, height: 14 }}
                src="/ruby.svg"
              />
              Ruby on Rails
            </Badge>. Whether it's diving deep into database analysis or architecting
          cutting-edge solutions, I'm always up for the challenge.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <p className="prose prose-neutral dark:prose-invert">
          📝 Beyond just coding, I excel in translating ideas into actionable
          plans, crafting meticulous documentation, and conducting thorough
          architectural research. With top-notch communication skills, I'm
          equally comfortable presenting my ideas in boardrooms or collaborating
          with teammates in brainstorming sessions. Whether flying solo on
          independent projects or leading the charge as a mentor, I thrive in
          environments where creativity and collaboration intersect.
        </p>
      </section>
      <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      <section>
        <h1 className="font-medium text-2xl mb-4 tracking-tighter">
          recent experience
        </h1>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <div className="prose prose-neutral dark:prose-invert">
          <h2 className="font-medium text-lg mb-1 tracking-tighter">
            Senior Software Engineer at Builder.ai
          </h2>
          <h3 className="font-small text-lg mb-1 tracking-tighter">London</h3>
          <h3 className="font-small text-sm mb-1 tracking-tighter">
            October 2023 — March 2024
          </h3>
          <ul className="list-disc">
            <li>
              As a senior software engineer at Builder.ai I was responsible
              developing features and components in Angular, React, Typescript
              and Ruby on Rails.
            </li>
            <li>Increased code coverage across the UI using Jest</li>
            <li>
              Implemented best practices for RxJS and component interaction
            </li>
            <li>Contributed to code reviews</li>
            <li>
              Provided technical solutions to product and architected fullstack
              solutions with engineers
            </li>
            <li>Pair programming</li>
            <li>
              Lead team meetings with engineers and ran demos to product
              stakeholders
            </li>
          </ul>
        </div>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <div className="prose prose-neutral dark:prose-invert">
          <h2 className="font-medium text-lg mb-1 tracking-tighter">
            Senior Software Engineer at The Home Depot
          </h2>
          <h3 className="font-small text-lg mb-1 tracking-tighter">Atlanta</h3>
          <h3 className="font-small text-sm mb-1 tracking-tighter">
            July 2021 — August 2023
          </h3>
          <ul className="list-disc">
            <li>
              Senior Fullstack Engineer on the OrderUp! team. I was responsible
              for the retirement of legacy systems and porting over all their
              features into modern UI’s, and microservice architecture while
              maintaining backward compatibilit
            </li>
            <li>
              Designed, architected, and developed web applications, integrating
              the sales of Major Appliances, Protection Plans, and Parts and
              Services transacting billions of dollars in revenue with modern
              technologies such as NX, Angular, Typescript, NGRX, RXJS,
              Springboot, Cypress, GCP, and Jenkins.
            </li>
            <li>
              Wrote testable code that maintained 95% code coverage throughout
              the UI code base and 90% code coverage in micro-services
            </li>
            <li>Increased revenue based on features deployed to production.</li>
            <li>
              Debugged and hot-fixed code when necessary, saving loss of sales
              throughout iterations.
            </li>
            <li>
              Pair programmed to ensure engineers were able complete features.
            </li>
          </ul>
        </div>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <div className="prose prose-neutral dark:prose-invert">
          <h2 className="font-medium text-lg mb-1 tracking-tighter">
            Lead Software Engineer at Hathway
          </h2>
          <h3 className="font-small text-lg mb-1 tracking-tighter">Atlanta</h3>
          <h3 className="font-small text-sm mb-1 tracking-tighter">
            October 2020 — July 2021
          </h3>
          <ul className="list-disc">
            <li>
              Lead multiple teams for angular and native applications focused in
              the food ordering space utilizing Typescript, Angular, NGRX, RXJS,
              Jasmine, Karma, AWS, NodeJS, Cordova, and Capacitor.
            </li>
            <li>
              During my time here I implemented TDD, CICD, agile best practices,
              code review, and story pointing.
            </li>
            <li>
              I enabled the engineers to breakdown features into workable user
              stories, which eventually enabled them to become self managed.
            </li>
            <li>
              Some App Store highlights include: PandaExpress, RaisingCanes,
              Hardee’s and Carl’s Jr.
            </li>
            <li>
              Pair programmed to ensure engineers were able complete features.
            </li>
          </ul>
        </div>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <div className="prose prose-neutral dark:prose-invert">
          <h2 className="font-medium text-lg mb-1 tracking-tighter">
            Senior Software Engineer I as CallRail
          </h2>
          <h3 className="font-small text-lg mb-1 tracking-tighter">Atlanta</h3>
          <h3 className="font-small text-sm mb-1 tracking-tighter">
            August 2018 — October 2020
          </h3>
          <ul className="list-disc">
            <li>
              Develop and code a new product over the course of one year which
              generated annual recurring revenue, on a team of 3 engineers.
            </li>
            <li>
              During my time at CallRail I was a Senior Engineer,coding daily in
              Ruby on Rails, RSPEC, Angular 5-9, TypeScript, ElasticSearch,
              Docker, CSS, HTML5, TDD, and GitHub.
            </li>
            <li>
              Supported the core application; developing reporting algorithms
              for our users, API design for clients to leverage, and third party
              integrations.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
