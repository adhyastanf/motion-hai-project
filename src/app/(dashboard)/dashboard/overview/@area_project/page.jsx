import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ButtonCreateProject from '@/features/overview/components/area-project/button-create-project';
import ProjectItem from '@/features/overview/components/area-project/project';
import { Suspense } from 'react';

export default async function ProjectPage() {
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
        <ButtonCreateProject />
        <Suspense fallback={'loading...'}>
          <ProjectItem />
        </Suspense>
      </CardContent>
    </Card>
  );
}
