import { getListProject, getListTask, getMemberOfOrganization, getStatusTask, getUserForWorkspace } from '@/app/actions';
import { authClient } from '@/lib/client/auth-client';
import { useQuery } from '@tanstack/react-query';

export function useGetListProject(orgId) {
  return useQuery({
    queryKey: ['list-project', orgId],
    queryFn: () => getListProject(orgId),
    refetchOnWindowFocus: true,
  });
}

export function useGetListTask(projectId, filters) {
  return useQuery({
    queryKey: ['list-task', projectId, filters],
    queryFn: () => getListTask(projectId, filters),
    refetchOnWindowFocus: 'always',
  });
}


export function useGetStatusTask() {
  return useQuery({
    queryKey: ['status-task'],
    queryFn: getStatusTask,
    refetchOnWindowFocus: true,
  });
}
export function useGetMembers(orgId) {
  return useQuery({
    queryKey: ['members', orgId],
    queryFn: () => getMemberOfOrganization(orgId),
    refetchOnWindowFocus: true,
  });
}

export function useGetUsers(orgId) {
  return useQuery({
    queryKey: ['users', orgId],
    queryFn: () => getUserForWorkspace(orgId),
    refetchOnWindowFocus: true,
  });
}


export function useGetOrganization(orgId) {
  return useQuery({
    queryFn: async () =>
      await authClient.organization.getFullOrganization({
        query: { organizationId: orgId },
      }),
    queryKey: ['workspace', orgId],
    refetchOnWindowFocus: true,
  });
}
