import { auth } from 'app/auth';
import { getGuestbookEntries } from 'app/db/queries';
import { SignIn, SignOut } from './buttons';
import { Suspense } from 'react';
import Form from './form';

export const metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
};

export default function GuestbookPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        sign my guestbook
      </h1>
      <Suspense>
        <GuestbookForm />
        <GuestbookEntries />
      </Suspense>
    </section>
  );
}

async function GuestbookForm() {
  let session = await auth();

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

async function GuestbookEntries() {
  let entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="flex flex-col space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {entry.created_by}
            </span>
            <span className="text-xs text-neutral-400 dark:text-neutral-600 tabular-nums">
              {new Date(entry.updated_at as string).toLocaleDateString(
                'en-US',
                { month: 'short', day: 'numeric', year: 'numeric' }
              )}
            </span>
          </div>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 break-words">
            {entry.body}
          </p>
        </div>
      ))}
    </div>
  );
}
