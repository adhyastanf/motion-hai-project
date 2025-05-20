'use client';

import { generateInvitationLink } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useGetMembers, useGetOrganization } from '@/hooks/use-query';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ButtonModalWorkspace from './components/modal-workspace';

const MODAL_CONSTANT = ['update', 'delete'];
export default function SettingsDashboardPage({ orgId }) {
  const { toast } = useToast();
  const [modal, setModal] = useState('');
  const [invitationLink, setInvitationLink] = useState(null);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { data: members } = useGetMembers(orgId);
  const { data: organizations } = useGetOrganization(orgId);
  const queryClient = useQueryClient();

  const handleGenerateLink = async () => {
    const link = await generateInvitationLink(orgId);
    setInvitationLink(`http://localhost:3000/dashboard/accept-invite/${link}`);
  };

  const handleCopyLink = async () => {
    if (invitationLink) {
      await navigator.clipboard.writeText(invitationLink);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    }
  };

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
            title: 'Please wait...',
          });
        },
        onSuccess: () => {
          toast({
            title: 'Member Deleted',
            description: 'Member has been deleted successfully.',
          });
          queryClient.invalidateQueries({
            queryKey: ['members', orgId],
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

  return (
    <div className='p-6 space-y-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold'>Workspace Settings</h1>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <div>
            <CardTitle>Workspace Info</CardTitle>
            <CardDescription>Manage the name, description, and visibility of your workspace.</CardDescription>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm' onClick={() => setModal('update')}>
              Edit
            </Button>
            <Button variant='destructive' size='sm' onClick={() => setModal('delete')}>
              Delete
            </Button>
          </div>
          {MODAL_CONSTANT.includes(modal) && <ButtonModalWorkspace modal={modal} setModal={setModal} initialData={organizations?.data} />}
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            Workspace Name: <strong>{organizations?.data?.name}</strong>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>View and manage members in this workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2 text-sm'>
            {members?.data?.map((member) => (
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

      <Card>
        <CardHeader>
          <CardTitle>Invite Member</CardTitle>
          <CardDescription>Generate and share a link for inviting a member to join this workspace.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {invitationLink ? (
            <div className='space-y-2'>
              <p className='text-sm'>Share this invitation link:</p>
              <p className='font-semibold'>{invitationLink}</p>
              <Button onClick={handleCopyLink} variant='outline'>
                {isLinkCopied ? 'Link Copied!' : 'Copy Link'}
              </Button>
            </div>
          ) : (
            <Button onClick={handleGenerateLink} variant='outline'>
              Generate Invitation Link
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
