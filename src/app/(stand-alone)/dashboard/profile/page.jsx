import { getMe } from '@/app/actions';
import ProfileViewPage from '@/features/profile/components/profile-view-page';
import { auth } from '@/lib/auth';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

export default async function ProfilePage() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-me'],
    queryFn: () => getMe(user.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileViewPage user={user} />
    </HydrationBoundary>
  );
}
