'use client';

import { Button } from '@/components/ui/button';
import { DataTableFilterAssignee } from '@/components/ui/table-list-task/data-table-filter-assignee';
import { DataTableFilterStatus } from '@/components/ui/table-list-task/data-table-filter-status';
import { DataTableResetFilter } from '@/components/ui/table-list-task/data-table-reset';
import { useGetMembers, useGetStatusTask } from '@/hooks/use-query';
import { PlusSquareIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ButtonModalTask from './modal-task';
import { useProductTableFilters } from './use-task-table-filters';

export default function TaskListTableAction() {
  const { orgId } = useParams();
  const [modal, setModal] = useState('');
  const { data: statusOptions } = useGetStatusTask();
  const { data: memberOptions } = useGetMembers(orgId);

  const { isAnyFilterActive, resetFilters, setStatusFilter, statusFilter, setAssigneeFilter, assigneeFilter } = useProductTableFilters();
  return (
    <div>
      <div className='flex flex-wrap items-center gap-4 justify-between'>
        <div className='flex items-center gap-4'>
          <DataTableFilterStatus filterValue={statusFilter} setFilterValue={setStatusFilter} options={statusOptions} />
          <DataTableFilterAssignee filterValue={assigneeFilter} setFilterValue={setAssigneeFilter} options={memberOptions} />
          <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
        </div>
        <Button className='flex gap-5 items-center self-start' variant='default' onClick={() => setModal('create')}>
          <PlusSquareIcon size={40} />
          <h1>Create Task</h1>
        </Button>
      </div>
      <ButtonModalTask modal={modal} setModal={setModal} statusOptions={statusOptions} memberOptions={memberOptions} />
    </div>
  );
}
