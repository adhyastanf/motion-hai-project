import { authClient } from '@/lib/client/auth-client';
import { useQuery } from '@tanstack/react-query';

export function useGetListProject() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await authClient.organization.list()
      return res.data
    },
  });
}
