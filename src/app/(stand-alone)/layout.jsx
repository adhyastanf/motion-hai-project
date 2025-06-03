import KBar from '@/components/kbar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { cookies, headers } from 'next/headers';

export const metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn',
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
