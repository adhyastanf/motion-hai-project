import { getListProject, getStatusTask } from '@/app/actions';
import { useQuery } from '@tanstack/react-query';

export function useGetListProject(orgId) {
  return  useQuery({
    queryKey: ['list-project', orgId],
    queryFn: () => getListProject(orgId),
    refetchOnWindowFocus: true
  });
}

export function useGetStatusTask() {
  return  useQuery({
    queryKey: ['status-task'],
    queryFn: getStatusTask,
    refetchOnWindowFocus: true
  });
}

