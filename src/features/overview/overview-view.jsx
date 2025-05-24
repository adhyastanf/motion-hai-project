'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectItem from '@/features/overview/components/area-project/project';
import { useGetListProject } from '@/hooks/use-query';
import { PlusSquareIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ButtonModalProject from '../list-task/components/list-project-tables/modal-project';

export default function ViewOverviewWorspace({ users }) {
  const { orgId } = useParams();
  const [modal, setModal] = useState('');
  const { data: projects, isLoading: isLoadingProjects } = useGetListProject(orgId);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-8'>
        <div className='flex items-center justify-between flex-col space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>Hi, Welcome back, {users.name}</h2>
          <h2>Wednesday, March 19</h2>
          <h2>Good Afternoon, Hai Motion</h2>
        </div>

        <div className='grid grid-cols-1'>
          {/* <div className='col-span-4'>{area_task}</div> */}
          <div className='col-span-4 md:col-span-3'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle>
                  <h2>Projects</h2>
                </CardTitle>
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
