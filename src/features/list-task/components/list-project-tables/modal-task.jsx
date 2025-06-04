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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export default function ButtonModalTask({ modal, setModal, taskId, initialData, memberOptions = [], statusOptions = [], memberId }) {
  const formSchema = z.object({
    task: z.string().min(2, {
      message: 'Product name must be at least 2 characters.',
    }),
    // files: z
    // .any()
    // .refine((files) => files?.length == 1, 'Image is required.')
    // .refine(
    //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //   `Max file size is 5MB.`
    // )
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   '.jpg, .jpeg, .png and .webp files are accepted.'
    // ),
    brand: z.string().min(2, {
      message: 'Brand must be at least 2 characters.',
    }),
    assigne: z.string().optional(),
    status: z.string().min(1, {
      message: 'Status is required.',
    }),
    due: z.any().optional(),
    link: z.any().optional(),
    description: z.string().min(2, {
      message: 'Description must be at least 2 characters.',
    }),
  });

  const defaultValues = {
    task: initialData?.name || '',
    assigne: initialData?.assigneeId || '',
    // files: [],
    brand: initialData?.brand || '',
    status: initialData?.statusId || '',
    due: initialData?.dueDate || null,
    description: initialData?.description || '',
    link: initialData?.link || '',
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: defaultValues,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { projectId, orgId } = useParams();

  const disabledForm = Boolean(form.watch(['task', 'description']).every(Boolean));

  const { mutate, isPending } = useMutation({
    mutationFn: async (body) => {
      if (modal === 'create') {
        return await createTask({ ...body, taskId, orgId, projectId });
      } else if (modal === 'update') {
        return await updateTask({ ...body, taskId, orgId, projectId });
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
      queryClient.invalidateQueries({ queryKey: ['list-task', projectId] });
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
      <ModalTask
        title='Create Task'
        open={modal === 'create'}
        onClose={handleClose}
        form={form}
        onConfirm={onSubmit}
        isLoading={isPending}
        disabled={disabledForm}
        statusOptions={statusOptions}
        memberOptions={memberOptions}
        buttonTextYes='Create Task'
      />
      <ModalTask
        title='Update Task'
        open={modal === 'update'}
        onClose={handleClose}
        form={form}
        onConfirm={onSubmit}
        isLoading={isPending}
        disabled={disabledForm}
        statusOptions={statusOptions}
        memberOptions={memberOptions}
        initialData={initialData}
        buttonTextYes='Update Task'
        memberId={memberId}
        type='update'
      />
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
