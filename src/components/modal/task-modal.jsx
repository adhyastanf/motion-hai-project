'use client';

import CommentsSection from '@/features/list-task/components/list-project-tables/comment-task';
import TaskForm from '@/features/list-task/task-form';
import { Modal } from '../ui/modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export default function ModalTask({ title, description, open, onClose, onConfirm, isLoading, form, disabled, initialData, statusOptions, memberOptions, buttonTextYes, memberId, type = 'create' }) {
  return (
    <Modal title={title} description={description} isOpen={open} onClose={onClose}>
      <div className='max-h-[80vh] overflow-y-auto pr-2'>
        {type === 'create' ? (
          <TaskForm form={form} onConfirm={onConfirm} isLoading={isLoading} disabled={disabled} statusOptions={statusOptions} memberOptions={memberOptions} buttonTextYes={buttonTextYes} />
        ) : (
          <Tabs defaultValue='task'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='task'>Task</TabsTrigger>
              <TabsTrigger value='comments'>Comments</TabsTrigger>
            </TabsList>
            <TabsContent value='task'>
              <TaskForm form={form} onConfirm={onConfirm} isLoading={isLoading} disabled={disabled} statusOptions={statusOptions} memberOptions={memberOptions} buttonTextYes={buttonTextYes} />
            </TabsContent>
            <TabsContent value='comments'>
              <CommentsSection taskId={initialData?.id} assigneeId={initialData?.assigneeId} memberId={memberId} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Modal>
  );
}
