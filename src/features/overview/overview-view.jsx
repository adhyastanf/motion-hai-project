'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProjectItem from '@/features/overview/components/area-project/project';
import { useGetListProject } from '@/hooks/use-query';
import { format } from 'date-fns';
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
          <h2>{format(new Date(), 'EEEE, MMMM yyyy')}</h2>
          <h2>Hai Motion</h2>
        </div>

        <div className='grid grid-cols-1'>
          <div className='col-span-4 md:col-span-3'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle>
                  <h2>Projects</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[350px] pr-4'>
                  <div className='flex flex-col gap-3'>
                    <ButtonModalProject modal={modal} setModal={setModal} />
                    <Button
                      className='flex gap-5 items-center self-start'
                      variant='ghost'
                      onClick={() => setModal('create')}
                    >
                      <PlusSquareIcon size={40} />
                      <h1>Create Project</h1>
                    </Button>
                    <ProjectItem projects={projects} isLoading={isLoadingProjects} />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
