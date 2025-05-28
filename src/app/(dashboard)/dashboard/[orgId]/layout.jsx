import { getListProject } from '@/app/actions';
import NotFound from '@/app/not-found';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db/drizzle';
import { members, organizations } from '@/lib/db/schema';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardDetailLayout({ children, params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { orgId } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['list-project', orgId],
    queryFn: () => getListProject(orgId),
  });

  const workspace = await db.select().from(members).innerJoin(organizations, eq(members.organizationId, orgId)).where(eq(members.userId, session.user.id));

  const isEmpty = workspace.length === 0;

  if(isEmpty){
    redirect('/dashboard')
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppSidebar session={session} isEmpty={isEmpty} />
      <SidebarInset>
        <Header session={session} isEmpty={isEmpty} />
        {children}
      </SidebarInset>
    </HydrationBoundary>
  );
}
