'use client';

import { getListProject } from '@/app/actions';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import TaskTable from '@/components/ui/table-list-task/data-table';
import { useQuery } from '@tanstack/react-query';
import ProductTableAction from '../products/components/product-tables/product-table-action';
import { columns } from './components/list-project-tables/columns';

export default function ListViewProject({ orgId }) {
  console.log(orgId)
  const { data : project, isLoading, isError } = useQuery({
    queryKey: ['list-project', orgId],
    queryFn: () => getListProject(orgId),
    refetchOnWindowFocus: true
  });

  if(isLoading){
    return (
      <div>loading...</div>
    )
  }

  // const data = [
  //   {
  //     id: 1,
  //     title: 'Design Landing Page',
  //     subtasks: [
  //       { id: 11, title: 'Create wireframe', assignee: 'alice', status: 'To Do' },
  //       { id: 12, title: 'Make UI prototype', assignee: 'bob', status: 'To Do' },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'Build Auth System',
  //     subtasks: [{ id: 21, title: 'Setup Supabase', assignee: null, status: 'To Do' }],
  //   },
  // ];

  return <TaskTable columns={columns} data={project.data} />;
}
