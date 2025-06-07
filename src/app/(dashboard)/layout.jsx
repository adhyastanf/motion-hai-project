import KBar from '@/components/kbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Hai Motion | Dashboard',
  description: 'Manage your content, view insights, and control your media production workflow in the Hai Motion Dashboard.',
  openGraph: {
    title: 'Hai Motion | Dashboard',
    description: 'Hai Motion Dashboard gives you control over projects, clients, and creative media content—all in one place.',
    url: 'https://haimotion.com/dashboard',
    siteName: 'Hai Motion',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/dashboard',
  },
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

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
    </KBar>
  );
}
