'use client';

import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';

export function OrgSwitcher({ projects, defaultProject, onProjectSwitch }) {
  const [selectedProject, setSelectedProject] = useState( defaultProject || (projects.length > 0 ? projects[0] : undefined));

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]);
    } else {
      setSelectedProject(undefined);
    }
  }, [projects]);

  const handleProjectSwitch = (project) => {
    setSelectedProject(project);
    if (onProjectSwitch) {
      onProjectSwitch(project.id);
    }
  };

  if (!selectedProject) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <div className='bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                <GalleryVerticalEnd className='size-4' />
              </div>
              <div className='flex flex-col gap-0.5 leading-none'>
                <span className='font-semibold'>Hai Motion</span>
                <span className=''>{selectedProject.name}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width]' align='start'>
            {projects.map((project) => (
              <DropdownMenuItem key={project.id} onSelect={() => handleProjectSwitch(project)}>
                {project.name} {project.id === selectedProject.id && <Check className='ml-auto' />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
