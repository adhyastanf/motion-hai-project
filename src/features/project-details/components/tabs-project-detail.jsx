'use client';

import PageContainer from '@/components/layout/page-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataCalendar from '@/features/calendar/data-calendar';
import TaskListTableAction from '@/features/list-task/components/list-project-tables/list-task-table-action';
import ListViewTask from '@/features/list-task/list-view-task';
import { useGetListTask, useGetMembers, useGetStatusTask } from '@/hooks/use-query';
import { useParams, useSearchParams } from 'next/navigation';
// import KanbanViewPage from '@/features/kanban/components/kanban-view-page';
import DataKanban from '@/features/board/data-board';
import TaskOverview from '@/features/overview-task/view-overview-task';
import { useMemo } from 'react';

export default function TabsTask() {
  // const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  // const [pageLimit] = useQueryState('limit', parseAsInteger.withDefault(10));
  // const [statusFilter] = useQueryState('status', searchParams.status.withDefault(''));
  // const [assigneeFilter] = useQueryState('assignee', searchParams.assignee.withDefault(''));

  const searchParams = useSearchParams()
  const assigneeFilter = searchParams.get('assignee')
  const page = searchParams.get('page')
  const statusFilter = searchParams.get('status')
  const pageLimit = searchParams.get('limit')

  const filters = useMemo(() => ({
    page: page || 1,
    limit: pageLimit || 10,
    status : statusFilter || '',
    assignee: assigneeFilter || ''
  }), [page, pageLimit, statusFilter, assigneeFilter]);
  
  const { projectId, orgId } = useParams();
  const { data: tasks, isLoading } = useGetListTask(projectId, filters);
  const { data: statusOptions } = useGetStatusTask();
  const { data: memberOptions } = useGetMembers(orgId);

  const tabs = [
    {
      name: 'Overview',
      value: 'overview',
      content: (
        <PageContainer scrollable={false}>
          <div className='flex flex-1 flex-col space-y-4'>
            <TaskOverview data={tasks?.allData} isLoading={isLoading} />
          </div>
        </PageContainer>
      ),
    },
    {
      name: 'Table',
      value: 'list',
      content: (
        <PageContainer scrollable={false}>
          <div className='flex flex-1 flex-col space-y-4'>
            <TaskListTableAction />
            <ListViewTask data={tasks?.data} isLoading={isLoading} statusOptions={statusOptions} memberOptions={memberOptions} totalData={tasks?.totalData} />
          </div>
        </PageContainer>
      ),
    },
    {
      name: 'Board',
      value: 'board',
      content: (
        <PageContainer scrollable={false}>
          <div className='flex flex-1 flex-col space-y-4'>
            <TaskListTableAction />
            <DataKanban data={tasks?.allData} isLoading={isLoading} statusOptions={statusOptions} memberOptions={memberOptions} />
          </div>
        </PageContainer>
      ),
    },
    {
      name: 'Calendar',
      value: 'calendar',
      content: (
        <PageContainer scrollable={false}>
          <div className='flex flex-1 flex-col space-y-4'>
            <TaskListTableAction />
            <DataCalendar data={tasks?.allData} isLoading={isLoading} statusOptions={statusOptions} memberOptions={memberOptions} />
          </div>
        </PageContainer>
      ),
    },
  ];

  return (
    <Tabs defaultValue={tabs[0].value} className='w-full'>
      <TabsList className='w-full p-0 bg-background justify-start border-b rounded-none'>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className='rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary'>
            <p className='text-[13px]'>{tab.name}</p>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className='relative'>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
