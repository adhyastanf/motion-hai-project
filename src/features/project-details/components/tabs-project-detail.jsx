'use client';

import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetListTask, useGetMembers, useGetStatusTask } from '@/hooks/use-query';
import PageContainer from '@/components/layout/page-container';
import TaskListTableAction from '@/features/list-task/components/list-project-tables/list-task-table-action';
import ListViewTask from '@/features/list-task/list-view-task';
import DataCalendar from '@/features/calendar/data-calendar';
// import KanbanViewPage from '@/features/kanban/components/kanban-view-page';
import DataKanban from '@/features/board/data-board';
import TaskOverview from '@/features/overview-task/view-overview-task';

export default function TabsTask() {
  const { projectId, orgId } = useParams();
  const { data: tasks, isLoading } = useGetListTask(projectId);
  const { data: statusOptions } = useGetStatusTask();
  const { data: memberOptions } = useGetMembers(orgId);

  const tabs = [
    {
      name: 'Overview',
      value: 'overview',
      content: (
        <PageContainer scrollable={false}>
          <div className='flex flex-1 flex-col space-y-4'>
            <TaskOverview data={tasks} isLoading={isLoading} />
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
            <ListViewTask data={tasks} isLoading={isLoading} statusOptions={statusOptions} memberOptions={memberOptions} />
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
            <DataKanban data={tasks} isLoading={isLoading} statusOptions={statusOptions} memberOptions={memberOptions} />
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
            <DataCalendar data={tasks} isLoading={isLoading} statusOptions={statusOptions} memberOptions={memberOptions} />
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
