import { authClient } from "@/lib/client/auth-client";
import { useQuery } from "@tanstack/react-query";

export function useGetListProject(initialData){
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
          const list = await authClient.organization.list()
          return list.data
        },
        initialData
      })
}