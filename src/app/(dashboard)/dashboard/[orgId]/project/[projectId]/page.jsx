import TabsTask from '@/features/project-details/components/tabs-project-detail';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function DetailProject({ params }) {
  const { orgId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const org = await auth.api.getFullOrganization({
    headers: await headers(),
    query: {
      organizationId: orgId,
    },
  });

  const myId = org.members.find(member => member.userId === session.user.id);

  return <TabsTask memberId={myId.id} />;
}
