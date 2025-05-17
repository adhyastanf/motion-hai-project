'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ButtonCreateProject from '@/features/overview/components/area-project/button-create-workspace';
import ProjectItem from '@/features/overview/components/area-project/project';
import { useGetListProject } from '@/hooks/use-query';
import { PlusCircle, PlusSquareIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ButtonModalProject from '../list-project/components/list-project-tables/modal-project';

export default function ViewOverviewWorspace() {
  const { orgId } = useParams();
  const [modal, setModal] = useState('');
  const { data: projects, isLoading: isLoadingProjects } = useGetListProject(orgId);
  //   const session = await auth.api.getSession({
  //     headers: await headers(),
  //   });

  const EmptyState = (
    <div>
      <h2>Tidak ada proyek yang aktif Mulailah dengan membuat proyek pertamamu di sini.</h2>
      <Button>
        Create Project
        <PlusCircle />
      </Button>
    </div>
  );

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>Hi, Welcome back 👋</h2>
        </div>
        {/* My Project Section */}

        {/* {EmptyState} */}

        {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            {sales}
          </div>
        </div> */}

        <h2>Wednesday, March 19</h2>
        <h2>Good Afternoon, Hai Motion</h2>

        <div>
          <p>My Week</p>
          <p>Tasks completed</p>
          <p>Collaborator</p>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          {/* <div className='col-span-4'>{area_task}</div> */}
          <div className='col-span-4 md:col-span-3'>
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
                <ButtonModalProject modal={modal} setModal={setModal} />
                <Button className='flex gap-5 items-center self-start' variant='ghost' onClick={() => setModal('create')}>
                  <PlusSquareIcon size={40} />
                  <h1>Create Project</h1>
                </Button>
                <ProjectItem projects={projects} isLoading={isLoadingProjects} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
