'use client';

import { createTask, deleteTask, updateTask } from '@/app/actions';
import { AlertModal } from '@/components/modal/alert-modal';
import ModalTask from '@/components/modal/task-modal';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ButtonCreateTask({ modal, setModal, projectId, taskId, initialData, taskOptions = [], memberOptions = [] }) {
  const formSchema = z.object({
    task: z.string().min(2, {
      message: 'Product name must be at least 2 characters.',
    }),
    assigne: z.string().optional(),
    status: z.string().optional(),
    due: z.any().optional(),
    description: z.string().min(10, {
      message: 'Description must be at least 10 characters.',
    }),
  });

  const defaultValues = {
    task: initialData?.name || '',
    assigne: initialData?.assigneeId || '',
    status: initialData?.statusId || '',
    due: initialData?.dueDate || null,
    description: initialData?.description || '',
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: defaultValues,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { orgId } = useParams();

  const disabledForm = Boolean(form.watch(['task', 'description']).every(Boolean));

  const { mutate, isPending } = useMutation({
    mutationFn: async (body) => {
      if (modal === 'create') {
        return await createTask(body);
      } else if (modal === 'update') {
        return await updateTask({ ...body, taskId });
      } else if (modal === 'delete') {
        return await deleteTask(taskId);
      }
    },
    onSuccess: () => {
      if (modal === 'create') {
        toast({
          title: 'Task Created',
          description: 'Your task has been created successfully.',
        });
      } else if (modal === 'update') {
        toast({
          title: 'Task Updated',
          description: 'Your task has been updated successfully.',
        });
      } else if (modal === 'delete') {
        toast({
          title: 'Task Deleted',
          description: 'Your task has been deleted successfully.',
        });
      }
      queryClient.invalidateQueries({
        queryKey: ['list-project', orgId],
      });
      setModal('');
      form.reset();
    },
    onError: () => {
      if (modal === 'create') {
        toast({
          title: 'Failed to Create Task',
          variant: 'destructive',
        });
      } else if (modal === 'update') {
        toast({
          title: 'Failed to Update Task',
          variant: 'destructive',
        });
      } else if (modal === 'delete') {
        toast({
          title: 'Failed to Delete Task',
          variant: 'destructive',
        });
      }
    },
  });

  async function onSubmit(values) {
    const body = {
      ...values,
      projectId,
    };
    mutate(body);
  }

  function handleClose() {
    setModal('');
    form.reset();
  }

  return (
    <>
      <ModalTask title='Create Task' open={modal === 'create'} onClose={handleClose} form={form} onConfirm={onSubmit} isLoading={isPending} disabled={disabledForm} taskOptions={taskOptions} memberOptions={memberOptions} />
      <ModalTask title='Update Task' open={modal === 'update'} onClose={handleClose} form={form} onConfirm={onSubmit} isLoading={isPending} disabled={disabledForm} taskOptions={taskOptions} memberOptions={memberOptions} initialData={initialData} />
      <AlertModal
        title={`Are you sure to delete task "${initialData?.name}"?`}
        description='This action cannot be undone. This will permanently delete your task.'
        isOpen={modal === 'delete'}
        onClose={() => setModal('')}
        onConfirm={onSubmit}
        isLoading={isPending}
      />
    </>
  );
}
