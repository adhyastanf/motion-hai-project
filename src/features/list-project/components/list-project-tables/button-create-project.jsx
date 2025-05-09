'use client';

import { createProject } from '@/app/actions';
import ModalInput from '@/components/modal/input-modal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusSquareIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ButtonCreateProject() {
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
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: '',
      description: '',
    },
  });

  const disabledForm = Boolean(form.watch(['project', 'description']).every(Boolean));

  const { mutate, isPending } = useMutation({
    mutationFn:  createProject,
    onSuccess: () => {
      toast({
        title: 'Project Created',
        description: 'Your project has been created successfully.',
      });
      queryClient.invalidateQueries({
        queryKey: ['list-project', orgId],
      });
      setModal(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: 'Failed to Create Project',
        variant: 'destructive',
      });
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
      <ModalInput title='Make a Project' fields={fields} open={modal} onClose={() => setModal(false)} form={form} onConfirm={onSubmit} isLoading={isPending} disabled={disabledForm} />
      <Button className='flex gap-5 items-center self-start' variant='ghost' onClick={() => setModal(true)}>
        <PlusSquareIcon size={40} />
        <h1>Create Project</h1>
      </Button>
    </>
  );
}
