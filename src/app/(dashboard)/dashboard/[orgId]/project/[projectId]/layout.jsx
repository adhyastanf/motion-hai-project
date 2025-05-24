import { getListProject, getListTask } from '@/app/actions';
import NotFound from '@/app/not-found';
import { OrgSwitcher } from '@/components/org-switcher';
import { auth } from '@/lib/auth';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

export default async function ProjectLayout({ children, params }) {
  const { session } = await auth.api.getSession({
    headers: await headers(),
  });

  const { orgId, projectId } = await params;

  const tasks = await getListTask(projectId);

  const projects = await getListProject(orgId);

  const checkProject = projects.data.find((project) => project?.id === projectId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['list-project', orgId],
    queryFn: () => getListProject(orgId),
  });

  return (
    <>
      {checkProject ? (
        <>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <OrgSwitcher />
          </HydrationBoundary>
          {children}
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}
