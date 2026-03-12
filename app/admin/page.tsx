import Form from './form';
import { auth } from 'app/auth';
import { getGuestbookEntries } from 'app/db/queries';
import { env } from 'app/env';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin',
};

type GuestbookEntry = {
  id: string;
  body: string;
  created_by: string;
  updated_at: string;
};

export default async function GuestbookPage() {
  let session = await auth();
  if (session?.user?.email !== env.OWNER_EMAIL) {
    redirect('/');
  }

  let entries = (await getGuestbookEntries()) as unknown as GuestbookEntry[];

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">admin</h1>
      <Form entries={entries} />
    </section>
  );
}
