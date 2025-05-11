'use client';

import { createProject, deleteProject, updateProject } from '@/app/actions';
import { AlertModal } from '@/components/modal/alert-modal';
import ModalInput from '@/components/modal/input-modal';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ButtonModalProject({ modal, setModal, projectId, initialData }) {
  const formSchema = z.object({
    project: z.string().min(2, {
      message: 'Project must be at least 2 characters.',
    }),
    description: z.string().min(2, {
      message: 'description must be at least 2 characters.',
    }),
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { orgId } = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: initialData?.name || '',
      description: initialData?.description || '',
    },
  });

  const disabledForm = Boolean(form.watch(['project', 'description']).every(Boolean));

  const { mutate, isPending } = useMutation({
    mutationFn: async (body) => {
      if (modal === 'create') {
        return await createProject(body);
      } else if (modal === 'update') {
        return await updateProject({ ...body, projectId });
      } else if (modal === 'delete') {
        return await deleteProject(projectId);
      }
    },
    onSuccess: () => {
      if (modal === 'create') {
        toast({
          title: 'Project Created',
          description: 'Your project has been created successfully.',
        });
      } else if (modal === 'update') {
        toast({
          title: 'Project Updated',
          description: 'Your project has been updated successfully.',
        });
      } else if (modal === 'delete') {
        toast({
          title: 'Project Deleted',
          description: 'Your project has been deleted successfully.',
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
          title: 'Failed to Create Project',
          variant: 'destructive',
        });
      } else if (modal === 'update') {
        toast({
          title: 'Failed to Update Project',
          variant: 'destructive',
        });
      } else if (modal === 'delete') {
        toast({
          title: 'Failed to Deleted Project',
          variant: 'destructive',
        });
      }
    },
  });

  async function onSubmit(values) {
    const body = {
      project: values.project,
      description: values.description,
      orgId,
    };
    mutate(body);
  }

  const fields = [
    {
      name: 'project',
      label: 'Project',
      placeholder: 'Input project',
      description: 'This is the name of your project in organization.',
    },
    {
      name: 'description',
      label: 'Description',
      placeholder: 'Input description',
      description: 'This is the name of your description project in organization.',
    },
  ];

  return (
    <>
      <ModalInput title='Make a Project' fields={fields} open={modal === 'create'} onClose={() => setModal('')} form={form} onConfirm={onSubmit} isLoading={isPending} disabled={disabledForm} />
      <ModalInput title='Update a Project' fields={fields} open={modal === 'update'} onClose={() => setModal('')} form={form} onConfirm={onSubmit} isLoading={isPending} disabled={disabledForm} />
      <AlertModal
        title={`Are you sure to delete project "${initialData?.name}"?`}
        description='This action cannot be undone. This will permanently delete your project.'
        isOpen={modal === 'delete'}
        onClose={() => setModal('')}
        onConfirm={onSubmit}
        isLoading={isPending}
      />
    </>
  );
}
