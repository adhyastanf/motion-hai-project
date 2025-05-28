import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { LoaderProvider } from '@/components/providers/loader-provider';
import LoadingScreen from '@/components/providers/loading-scree';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies, headers } from 'next/headers';
import { getListProject } from '../actions';

export const metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn',
};

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <KBar>
      <LoaderProvider>
        <LoadingScreen />
        <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
      </LoaderProvider>
    </KBar>
  );
}
