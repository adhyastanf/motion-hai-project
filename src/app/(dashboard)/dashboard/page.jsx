import { getWorkspace } from '@/app/actions';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Hai Motion | Dashboard',
  description: 'Redirecting to your Hai Motion workspace dashboard...',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/dashboard',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function Dashboard() {
  const workspaces = await getWorkspace();
  if (workspaces.length === 0) {
    redirect('/dashboard/create');
  } else {
    const workspace = workspaces[0];
    return redirect(`/dashboard/${workspace?.id}`);
  }
}
