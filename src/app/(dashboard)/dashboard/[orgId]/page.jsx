import ViewOverviewWorspace from '@/features/overview/overview-view';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const metadata = {
  title: 'Hai Motion | Overview',
  description: 'Get a quick overview of your projects, tasks, and team performance in one place.',
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function OverviewWorspace() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  return <ViewOverviewWorspace users={user} />;
}
