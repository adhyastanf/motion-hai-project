'use client';

import { getWorkspace } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ButtonCreateWorkspace from '@/features/overview/components/area-project/button-create-workspace';
import { authClient } from '@/lib/client/auth-client';
import { useQuery } from '@tanstack/react-query';
import { Check, LayoutGrid, Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function WorkspaceDropdown() {
  const [modal, setModal] = useState(false);
  const { orgId } = useParams();
  const router = useRouter();
  const { data: workspaces } = useQuery({
    queryKey: ['workspaces'],
    queryFn: getWorkspace,
  });

  const defaultProject = workspaces?.find((org) => org?.id === orgId);

  const handleWorkspaceSwitch = async (workspace) => {
    await authClient.organization.setActive({
      organizationId: workspace.id,
    });
    router.push(`/dashboard/${workspace.id}`);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='flex items-center space-x-2'>
            <LayoutGrid size={16} />
            <span className='hidden md:inline-block'>Select Workspace</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-56'>
          <DropdownMenuLabel>My Workspaces</DropdownMenuLabel>
          {workspaces.map((workspace) => {
            return (
              <DropdownMenuItem key={workspace.id} onSelect={() => handleWorkspaceSwitch(workspace)} className='capitalize'>
                {workspace.name}
                {workspace?.id === defaultProject?.id && <Check className='ml-auto' />}
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setModal(true)} className='text-primary'>
            <Plus size={16} className='mr-2' />
            Create Workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ButtonCreateWorkspace modal={modal} setModal={setModal} />
    </>
  );
}
