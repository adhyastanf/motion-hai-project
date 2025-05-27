import ViewOverviewWorspace from '@/features/overview/overview-view';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function OverviewWorspace() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });


  return <ViewOverviewWorspace users={user}/>;
}
