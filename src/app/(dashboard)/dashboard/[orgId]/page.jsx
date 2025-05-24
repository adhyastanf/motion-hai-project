import ViewOverviewWorspace from '@/features/overview/overview-view';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function OverviewWorspace() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(user)

  return <ViewOverviewWorspace users={user}/>;
}
