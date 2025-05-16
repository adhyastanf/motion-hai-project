'use client';

import TaskTable from '@/components/ui/table-list-task/data-table';
import { useGetListProject } from '@/hooks/use-query';
import { columns } from './components/list-project-tables/columns';

export default function ListViewProject({ orgId }) {
  const { data : project, isLoading, isError } = useGetListProject(orgId)
  
  if(isLoading){
    return (
      <div>loading...</div>
      )
    }

  return <TaskTable columns={columns} data={project?.data} orgId={orgId} />;
}
