import { getMe } from '@/app/actions';
import ProfileViewPage from '@/features/profile/components/profile-view-page';
import { auth } from '@/lib/auth';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

export const metadata = {
  title: 'Hai Motion | My Profile',
  description: 'View and update your account information on your Hai Motion profile page.',
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
