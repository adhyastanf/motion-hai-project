import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ButtonCreateProject from '@/features/overview/components/area-project/button-create-workspace';
import ProjectItem from '@/features/overview/components/area-project/project';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function ProjectPage() {
  const { session } = await auth.api.getSession({
    headers: await headers(),
  });

  // console.log(session);

  // const projects = await auth.api.listOrganizations({
  //   headers: await headers(),
  // });

  // const projects = await getListProject(session.activeOrganizationId);
  // console.log(projects);

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>
          <h2>Projects</h2>
        </CardTitle>
        <CardDescription>
          <h2>Recents</h2>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        {/* <ButtonCreateProject /> */}
        <ProjectItem orgId={session.activeOrganizationId} />
      </CardContent>
    </Card>
  );
}
