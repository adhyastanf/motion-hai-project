'use client';

import TaskTable from '@/components/ui/table-list-task/data-table';
import { DataTableSkeleton } from '@/components/ui/table-list-task/table-skeleton';
import { columns } from './components/list-project-tables/columns';

export default function ListViewTask({ data, isLoading, statusOptions, memberOptions, totalData }) {

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  return <TaskTable data={data} columns={columns} totalItems={totalData} statusOptions={statusOptions} memberOptions={memberOptions} totalData={totalData} />;
}
