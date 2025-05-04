import PageContainer from '@/components/layout/page-container';
import ProjectListTableAction from '@/features/list-project/components/list-project-tables/list-project-table-action';
import ListProject from '@/features/list-project/list-view-project';

export default async function ListDetailProject({ params }) {
  const { orgId } = await params;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <ProjectListTableAction />
          <ListProject orgId={orgId} />
      </div>
    </PageContainer>
  );
}
