'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ButtonModalProject from '@/features/list-task/components/list-project-tables/modal-project';
import { useGetListProject } from '@/hooks/use-query';
import { Check, ChevronDown, GalleryVerticalEnd, Pencil } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';

export function OrgSwitcher() {
  const params = useParams();
  const router = useRouter();
  const [modal, setModal] = useState('');
  const { data: projects } = useGetListProject(params.orgId);

  const defaultProject = projects.data.find((project) => project.id === params.projectId);

  const [selectedProject] = projects.data.filter((project) => project.id === params.projectId);

  const handleProjectSwitch = async (project) => {
    router.push(`/dashboard/${params.orgId}/project/${project.id}`);
  };

  return (
    <div>
      <div className='flex items-center justify-between w-full gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='w-full md:w-auto justify-start md:justify-between gap-2 text-sm font-medium px-3 py-2 truncate'>
              <div className='bg-primary text-white flex items-center justify-center rounded-md p-1'>
                <GalleryVerticalEnd className='size-4' />
              </div>
              <div className='block truncate text-left'>
                <p className='font-semibold truncate capitalize text-xs'>{defaultProject?.name}</p>
                <p className='truncate capitalize text-xs'>{defaultProject?.description}</p>
              </div>
              <ChevronDown className='ml-auto size-4' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] max-w-xs' align='start'>
            {projects.data.map((project) => (
              <DropdownMenuItem key={project.id} onSelect={() => handleProjectSwitch(project)} className='truncate capitalize'>
                {project.name}
                {project.id === defaultProject?.id && <Check className='ml-auto size-4' />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='shrink-0'>
              <Pencil size={4} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => {
                setModal('update');
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setModal('delete');
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ButtonModalProject modal={modal} setModal={setModal} projectId={selectedProject?.id} initialData={selectedProject}router={router} />
    </div>
  );
}
