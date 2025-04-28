import { AreaProject } from "@/features/overview/components/area_project";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Project() {

  const projects = await auth.api.listOrganizations({
    headers: await headers(),
  });

  return <AreaProject projects={projects} />
}
