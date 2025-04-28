import { authClient } from "@/lib/client/auth-client";
import { useQuery } from "@tanstack/react-query";

export function useGetListProject(){
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => await authClient.organization.list(),
      })
}