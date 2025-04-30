import { getListProject } from '@/app/actions';
import ListProject from '@/features/list-project/list-detail';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function ListDetailProject({ params }) {
  const { projectId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['list-project', projectId],
    queryFn: () => getListProject(projectId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListProject projectId={projectId}/>
    </HydrationBoundary>
  );
}
