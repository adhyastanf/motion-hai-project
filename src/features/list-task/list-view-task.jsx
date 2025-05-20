'use client';

import TaskTable from '@/components/ui/table-list-task/data-table';
import { DataTableSkeleton } from '@/components/ui/table-list-task/table-skeleton';
import { useGetListTask } from '@/hooks/use-query';
import { searchParams } from '@/lib/searchparams';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { columns } from './components/list-project-tables/columns';

export default function ListViewTask({ data, isLoading, statusOptions, memberOptions }) {
  const [status] = useQueryState('status', searchParams.status.withOptions({ shallow: true }).withDefault(''));
  const [assignee] = useQueryState('assignee', searchParams.assignee.withOptions({ shallow: true }).withDefault(''));

  const filters = {
    ...(status && { status }),
    ...(assignee && { assignee }),
  };

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  return <TaskTable data={data} columns={columns} totalItems={data.length || 0} statusOptions={statusOptions} memberOptions={memberOptions} />;
}
