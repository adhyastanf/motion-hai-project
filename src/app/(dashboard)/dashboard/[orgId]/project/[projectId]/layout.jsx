import { OrgSwitcher } from '@/components/org-switcher';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import HeadersDetailProject from '@/features/project-details/components/headers-projects';
import NavDetailProject from '@/features/project-details/components/tabs-project-detail';
import PageContainer from '@/components/layout/page-container';
import { getListProject } from '@/app/actions';

export default async function ProjectLayout({ children, params }) {
  const { session } = await auth.api.getSession({
    headers: await headers(),
  });

  const { orgId } = await params;

  // const projects = await auth.api.listOrganizations({
  //   headers: await headers(),
  // });

  const projects = await getListProject(session.activeOrganizationId);
  console.log(projects)

  try {
    // await auth.api.getFullOrganization({
    //   headers: await headers(),
    //   query: {
    //     organizationId: orgId,
    //   },
    // });

    return (
      // <PageContainer>
      <div>
        {/* <HeadersDetailProject projects={projects} /> */}
        <NavDetailProject />
        {children}
      </div>
      // </PageContainer>
    );
  } catch (error) {
    redirect('/dashboard/overview');
  }
}
