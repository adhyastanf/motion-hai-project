'use client';

import { createProject, createTask } from '@/app/actions';
import ModalTask from '@/components/modal/task-modal';
import { Button } from '@/components/ui/button';
import { useGetMembers, useGetStatusTask } from '@/hooks/use-query';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusSquareIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ButtonCreateTask({ projectId, initialData, taskOptions = [], memberOptions = [] }) {
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
    assigne: initialData?.assigne || '',
    status: initialData?.status || '',
    due: initialData?.due || null,
    description: initialData?.description || '',
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: defaultValues,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { orgId } = useParams();
  const [modal, setModal] = useState(false);

  const disabledForm = Boolean(form.watch(['task', 'description']).every(Boolean));

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast({
        title: 'Task Created',
        description: 'Your task has been created successfully.',
      });
      queryClient.invalidateQueries({
        queryKey: ['list-project', orgId],
      });
      setModal(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: 'Failed to Create Task',
        variant: 'destructive',
      });
    },
  });

  async function onSubmit(values) {
    const body = {
      ...values, projectId
    }
    mutate(body);
  }

  return (
    <>
      <ModalTask title='Create Task' open={modal} onClose={() => setModal(false)} form={form} onConfirm={onSubmit} isLoading={isPending} disabled={disabledForm} taskOptions={taskOptions} memberOptions={memberOptions} />
      <Button className='flex gap-5 items-center self-start' variant='ghost' onClick={() => setModal(true)}>
        <PlusSquareIcon size={40} />
        <h1>Create Task</h1>
      </Button>
    </>
  );
}
