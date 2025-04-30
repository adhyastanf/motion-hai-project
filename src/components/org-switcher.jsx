'use client';

import { Check, ChevronDown, GalleryVerticalEnd } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useParams, useRouter } from 'next/navigation';
import { authClient } from '@/lib/client/auth-client';

export function OrgSwitcher({ projects }) {
  const params = useParams();
  const router = useRouter();

  const defaultProject = projects.find((org) => org.id === params.projectId);

  const handleProjectSwitch = async (project) => {
    await authClient.organization.setActive({
      organizationId: project.id,
    });
    router.push(`/dashboard/project/${project.id}`);
  };

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
                <span className=''>{defaultProject.name}</span>
              </div>
              <ChevronDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width]' align='start'>
            {projects.map((project) => (
              <DropdownMenuItem key={project.id} onSelect={() => handleProjectSwitch(project)}>
                {project.name} {project.id === defaultProject.id && <Check className='ml-auto' />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
