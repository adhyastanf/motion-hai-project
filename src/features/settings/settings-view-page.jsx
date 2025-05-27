'use client';

import { createBulkMember } from '@/app/actions';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Modal } from '@/components/ui/modal';
import { useGetMembers, useGetOrganization, useGetUsers } from '@/hooks/use-query';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ButtonModalWorkspace from './components/modal-workspace';

const MODAL_CONSTANT = ['update', 'delete'];
export default function SettingsDashboardPage() {
  const { orgId } = useParams();
  const { toast } = useToast();
  const [modal, setModal] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [openBulkModal, setOpenBulkModal] = useState(false);
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const { data: members } = useGetMembers(orgId);
  const { data: organizations } = useGetOrganization(orgId);
  const { data: users } = useGetUsers(orgId);
  const queryClient = useQueryClient();

  async function handleUpdateRole(memberId, role) {
    await authClient.organization.updateMemberRole(
      {
        memberId,
        role,
        organizationId: orgId,
      },
      {
        onRequest: () => {
          toast({
            title: 'Please wait...',
          });
        },
        onSuccess: () => {
          toast({
            title: 'Role Updated',
            description: 'Role has been updated successfully.',
          });
          queryClient.invalidateQueries({
            queryKey: ['members', orgId],
          });
          queryClient.invalidateQueries({
            queryKey: ['users', orgId],
          });
        },
        onError: (ctx) => {
          toast({
            title: 'Something went wrong',
            description: ctx.error.message ?? 'Something went wrong.',
            variant: 'destructive',
          });
        },
      }
    );
  }

  async function handleDeleteMember(memberId) {
    await authClient.organization.removeMember(
      {
        memberIdOrEmail: memberId,
        organizationId: orgId,
      },
      {
        onRequest: () => {
          toast({
            title: 'Please waittttt...',
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['list-task'],
          });
          queryClient.invalidateQueries({
            queryKey: ['members', orgId],
          });
          queryClient.invalidateQueries({
            queryKey: ['users', orgId],
          });
          toast({
            title: 'Member Deleted',
            description: 'Member has been deleted successfully.',
          });
        },
        onError: (ctx) => {
          toast({
            title: 'Something went wrong',
            description: ctx.error.message ?? 'Something went wrong.',
            variant: 'destructive',
          });
        },
      }
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (values) => createBulkMember(values, orgId),
    onSuccess: () => {
      toast({
        title: 'Member Added',
        description: 'Member has been added successfully.',
      });

      queryClient.invalidateQueries({
        queryKey: ['members', orgId],
      });
      queryClient.invalidateQueries({
        queryKey: ['users', orgId],
      });
      setOpenBulkModal(false);
      setSelectedMembers([]);
    },
    onError: () => {
      toast({
        title: 'Failed to Added Member',
        variant: 'destructive',
      });
    },
  });

  async function handleLeaveOrganization() {
    await authClient.organization.leave(
      {
        organizationId: orgId,
      },
      {
        onRequest: () => {
          toast({ title: 'Leaving organization...' });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['list-task'],
          });
          queryClient.invalidateQueries({
            queryKey: ['members', orgId],
          });
          queryClient.invalidateQueries({
            queryKey: ['users', orgId],
          });
          toast({
            title: 'Left Organization',
            description: 'You have left the organization.',
          });
        },
        onError: (ctx) => {
          toast({
            title: 'Something went wrong',
            description: ctx.error.message ?? 'Failed to leave organization.',
            variant: 'destructive',
          });
        },
      }
    );
  }

  async function handleDeleteOrganization() {
    await authClient.organization.delete(
      {
        organizationId: orgId,
      },
      {
        onRequest: () => {
          toast({ title: 'Deleting organization...' });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['list-task'],
          });
          queryClient.invalidateQueries({
            queryKey: ['members', orgId],
          });
          queryClient.invalidateQueries({
            queryKey: ['users', orgId],
          });
          toast({
            title: 'Delete Organization',
            description: 'You have deleted the organization.',
          });
        },
        onError: (ctx) => {
          toast({
            title: 'Something went wrong',
            description: ctx.error.message ?? 'Failed to delete organization.',
            variant: 'destructive',
          });
        },
      }
    );
  }

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <h1 className='text-3xl font-bold'>Workspace Settings</h1>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Workspace Info</CardTitle>
              <CardDescription>Manage the name, description, and visibility of your workspace.</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setModal('update')}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModal('delete')}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {MODAL_CONSTANT.includes(modal) && <ButtonModalWorkspace modal={modal} setModal={setModal} initialData={organizations?.data} />}
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              Workspace Name: <strong className='capitalize'>{organizations?.data?.name}</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Members</CardTitle>
              <CardDescription>View and manage members in this workspace.</CardDescription>
            </div>
            <Button onClick={() => setOpenBulkModal(true)}>Add Member</Button>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2 text-sm'>
              {members?.map((member) => (
                <li key={member.id} className='flex justify-between items-center'>
                  <div>
                    <p>{member.name}</p>
                    <p className='text-muted-foreground text-xs'>{member.email}</p>
                  </div>

                  <div className='flex items-center gap-4'>
                    <span className='capitalize'>{member.role}</span>
                    {member.role !== 'owner' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <DotsVerticalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => handleUpdateRole(member.id, 'admin')}>Set as Admin</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateRole(member.id, 'member')}>Set as Member</DropdownMenuItem>
                          <DropdownMenuItem className='text-red-700' onClick={() => handleDeleteMember(member.id)}>
                            Remove {member.name}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className='space-y-2'>
          <Button variant='destructive' onClick={() => setLeaveConfirmOpen(true)}>
            Leave Organization
          </Button>

          <Button variant='destructive' onClick={() => setDeleteConfirmOpen(true)}>
            Delete Organization
          </Button>
        </div>

        <Modal title='Add Member' description={'Select Members To Add :'} isOpen={openBulkModal} onClose={() => setOpenBulkModal(false)}>
          <div className='space-y-4'>
            <ScrollArea className='h-40 rounded-md px-2'>
              <div className='space-y-2'>
                {users?.length > 0 ? (
                  users.map((user) => (
                    <label key={user.id} className='flex items-center gap-2 py-1'>
                      <Checkbox
                        checked={selectedMembers.includes(user.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedMembers((prev) => [...prev, user.id]);
                          } else {
                            setSelectedMembers((prev) => prev.filter((id) => id !== user.id));
                          }
                        }}
                      />
                      <span>{user.name}</span>
                    </label>
                  ))
                ) : (
                  <p className='text-muted-foreground text-sm'>No users available to invite.</p>
                )}
              </div>
            </ScrollArea>

            <Button
              className='w-full'
              onClick={() => {
                mutate(selectedMembers);
                toast({
                  title: 'Members selected',
                  description: `${selectedMembers.length} member(s) selected.`,
                });
              }}
              disabled={selectedMembers.length === 0 || isPending}
            >
              Add Member
            </Button>
          </div>
        </Modal>

        <Modal title='Leave Organization' description='Are you sure you want to leave this organization? You will lose access.' isOpen={leaveConfirmOpen} onClose={() => setLeaveConfirmOpen(false)}>
          <div className='flex justify-end gap-2 mt-4'>
            <Button variant='ghost' onClick={() => setLeaveConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleLeaveOrganization}>
              Leave
            </Button>
          </div>
        </Modal>

        {/* Modal Confirm Delete */}
        <Modal title='Delete Organization' description='This action cannot be undone. All data will be permanently deleted.' isOpen={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
          <div className='flex justify-end gap-2 mt-4'>
            <Button variant='ghost' onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteOrganization}>
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </PageContainer>
  );
}
