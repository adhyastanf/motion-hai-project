'use client';

import CommentsSection from '@/features/list-project/components/list-project-tables/comment-task';
import TaskForm from '@/features/list-project/task-form';
import { useParams } from 'next/navigation';
import { Modal } from '../ui/modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export default function ModalTask({ title, description, open, onClose, onConfirm, isLoading, form, disabled, initialData, taskOptions = [], memberOptions = [] }) {

  return (
    <Modal title={title} description={description} isOpen={open} onClose={onClose}>
      <Tabs defaultValue='task'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='task'>Task</TabsTrigger>
          <TabsTrigger value='comments'>Comments</TabsTrigger>
        </TabsList>
        <TabsContent value='task'>
          <TaskForm form={form} onConfirm={onConfirm} isLoading={isLoading} disabled={disabled} taskOptions={taskOptions} memberOptions={memberOptions} />
        </TabsContent>
        <TabsContent value='comments'>
          <CommentsSection taskId={initialData?.id} assigneeId={initialData?.assigneeId} />
        </TabsContent>
      </Tabs>
    </Modal>
  );
}
