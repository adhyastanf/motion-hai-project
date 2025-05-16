// app/accept-invite/[inviteId]/page.tsx

import { and, eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db/drizzle';
import { invitations, members, organizations } from '@/lib/db/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { acceptInvitation } from '@/app/actions';
import Link from 'next/link';

export default async function AcceptInvitePage({ params }) {
  const { inviteId } = await params;

  const [invitation] = await db
    .select({
      id: invitations.id,
      email: invitations.email,
      role: invitations.role,
      organizationId: invitations.organizationId,
      isActive: invitations.isActive,
    })
    .from(invitations)
    .where(eq(invitations.id, inviteId))
    .limit(1);

  if (!invitation || !invitation.isActive) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    redirect('/sign-in');
  }

  const [membership] = await db
    .select()
    .from(members)
    .where(and(eq(members.organizationId, invitation.organizationId), eq(members.userId, userId)));

  if (membership) {
    redirect(`/dashboard/project/${invitation.organizationId}`);
  }

  const [org] = await db.select({ name: organizations.name }).from(organizations).where(eq(organizations.id, invitation.organizationId)).limit(1);

  return (
    <div className='max-w-xl mx-auto mt-20 p-6 border rounded shadow'>
      <h1 className='text-2xl font-bold mb-4'>You're Invited!</h1>
      <p className='mb-2'>
        You've been invited to join <strong>{org?.name || 'a workspace'}</strong> as a <strong>{invitation.role}</strong>.
      </p>

      {invitation.email && (
        <p className='text-sm text-muted-foreground mb-4'>
          Invitation sent to: <strong>{invitation.email}</strong>
        </p>
      )}

      <div className='flex gap-4 mt-6'>
        <Link href='/dashboard/overview' className='flex-1'>
          <Button variant='outline' className='w-full'>
            Cancel
          </Button>
        </Link>
        <form
          className='flex-1'
          action={async () => {
            'use server';
            await acceptInvitation(userId, invitation.organizationId, inviteId);
          }}
        >
          <Button type='submit' className='w-full'>
            Accept Invitation
          </Button>
        </form>
      </div>
    </div>
  );
}
