import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { LoaderProvider } from '@/components/providers/loader-provider';
import LoadingScreen from '@/components/providers/loading-scree';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ListViewTask from '@/features/list-task/list-view-task';
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
      <LoaderProvider>
        <LoadingScreen />
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar session={session} />
          <SidebarInset>
          <Header session={session} />
            {children}
            </SidebarInset>
        </SidebarProvider>
      </LoaderProvider>
    </KBar>
  );
}
