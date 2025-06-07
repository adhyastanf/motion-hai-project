import KBar from '@/components/kbar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { cookies, headers } from 'next/headers';

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

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        {/* <AppSidebar session={session} /> */}
        <SidebarInset>
          <Header session={session} />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
