import Badge from '../components/badge';
import React from 'react';

const jobs = [
  {
    role: 'Senior Software Engineer',
    company: 'Builder.ai',
    location: 'London',
    period: 'Oct 2023 — Mar 2024',
    bullets: [
      'Developed features and components in Angular, React, TypeScript, and Ruby on Rails.',
      'Increased UI code coverage using Jest.',
      'Implemented best practices for RxJS and component interaction.',
      'Contributed to code reviews and pair programming.',
      'Provided technical solutions to product and architected fullstack solutions with engineers.',
      'Led team meetings and ran demos to product stakeholders.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'The Home Depot',
    location: 'Atlanta',
    period: 'Jul 2021 — Aug 2023',
    bullets: [
      'Senior Fullstack Engineer on the OrderUp! team, responsible for retiring legacy systems and porting features to modern UI and microservice architecture.',
      'Designed and developed web applications for Major Appliances, Protection Plans, and Parts & Services, transacting billions in revenue with NX, Angular, TypeScript, NGRX, RxJS, Spring Boot, Cypress, GCP, and Jenkins.',
      'Maintained 95% UI code coverage and 90% microservice coverage.',
      'Delivered revenue-generating features to production.',
      'Debugged and hot-fixed critical issues to prevent loss of sales.',
    ],
  },
  {
    role: 'Lead Software Engineer',
    company: 'Hathway',
    location: 'Atlanta',
    period: 'Oct 2020 — Jul 2021',
    bullets: [
      'Led multiple teams building Angular and native food ordering apps using TypeScript, NGRX, RxJS, Jasmine, Karma, AWS, Node.js, Cordova, and Capacitor.',
      'Introduced TDD, CI/CD, agile best practices, code review, and story pointing.',
      'Enabled engineers to break down features into self-managed user stories.',
      'Notable apps: PandaExpress, Raising Cane\'s, Hardee\'s, and Carl\'s Jr.',
    ],
  },
  {
    role: 'Senior Software Engineer I',
    company: 'CallRail',
    location: 'Atlanta',
    period: 'Aug 2018 — Oct 2020',
    bullets: [
      'Developed a new product from scratch over one year generating annual recurring revenue, on a team of three engineers.',
      'Coded daily in Ruby on Rails, RSpec, Angular 5–9, TypeScript, Elasticsearch, Docker, and GitHub.',
      'Built reporting algorithms, API design for clients, and third-party integrations.',
    ],
  },
];

export default function Page() {
  return (
    <>
      <section className="mb-8">
        <h1 className="font-medium text-2xl mb-4 tracking-tighter">work</h1>
        <p className="prose prose-neutral dark:prose-invert">
          Dynamic and results-driven Fullstack Software Engineer with a passion
          for crafting customer-focused solutions. I specialise in the full
          software development lifecycle — from sleek interface design to
          complex system integration.
        </p>
        <hr className="my-6 border-neutral-200 dark:border-neutral-700" />
        <p className="prose prose-neutral dark:prose-invert">
          Specialising in{' '}
          <span className="not-prose">
            <Badge href="https://developer.mozilla.org/en-US/docs/Web/HTML">
              <img className="!mr-1" style={{ width: 14, height: 14 }} src="/html.svg" />
              HTML
            </Badge>
          </span>
          ,{' '}
          <Badge href="https://developer.mozilla.org/en-US/docs/Web/CSS">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/css.svg" />
            CSS
          </Badge>
          ,{' '}
          <Badge href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/javascript.svg" />
            JavaScript
          </Badge>
          ,{' '}
          <Badge href="https://spring.io/">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/spring-boot.svg" />
            Java
          </Badge>
          ,{' '}
          <Badge href="https://angular.io">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/angular.svg" />
            Angular
          </Badge>
          ,{' '}
          <Badge href="https://react.dev">
            <svg width="14" height="14" role="img" aria-label="React logo" className="!mr-1">
              <use href="/sprite.svg#react" />
            </svg>
            React
          </Badge>
          ,{' '}
          <Badge href="https://typescriptlang.org">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/ts.svg" />
            TypeScript
          </Badge>
          ,{' '}
          <Badge href="https://python.org">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/python.svg" />
            Python
          </Badge>
          ,{' '}
          <Badge href="https://nodejs.org/">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/nodejs.svg" />
            Node
          </Badge>
          ,{' '}
          <Badge href="https://ngrx.io/">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/ngrx.svg" />
            NgRX
          </Badge>
          ,{' '}
          <Badge href="https://redux.js.org/">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/redux.svg" />
            Redux
          </Badge>
          ,{' '}
          <Badge href="https://rxjs.dev/">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/rxjs.svg" />
            RxJS
          </Badge>
          {' & '}
          <Badge href="https://rubyonrails.org/">
            <img className="!mr-1" style={{ width: 14, height: 14 }} src="/ruby.svg" />
            Ruby on Rails
          </Badge>
          .
        </p>
      </section>
      <hr className="my-6 border-neutral-200 dark:border-neutral-700" />
      <section>
        <h1 className="font-medium text-2xl mb-6 tracking-tighter">
          experience
        </h1>
        <div className="space-y-10">
          {jobs.map((job, i) => (
            <div key={i}>
              <div className="mb-3">
                <h2 className="font-medium text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {job.role}{' '}
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                    at {job.company}
                  </span>
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {job.location} · {job.period}
                </p>
              </div>
              <ul className="space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                {job.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-neutral-300 dark:text-neutral-600 mt-0.5 select-none">–</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {i < jobs.length - 1 && (
                <hr className="mt-8 border-neutral-200 dark:border-neutral-700" />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
