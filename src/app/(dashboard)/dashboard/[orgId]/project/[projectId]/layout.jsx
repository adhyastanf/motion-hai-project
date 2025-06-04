import { getListProject } from '@/app/actions';
import NotFound from '@/app/not-found';
import { OrgSwitcher } from '@/components/org-switcher';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function ProjectLayout({ children, params }) {
  
  const { orgId, projectId } = await params;
  
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
