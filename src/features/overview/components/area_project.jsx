'use client';

import { createProject } from '@/app/actions';
import ModalCreateProject from '@/components/modal/project-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetListProject } from '@/hooks/use-query';
import { useToast } from '@/hooks/use-toast';
import { generateSlug } from '@/lib/format';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusSquareIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  project: z.string().min(2, {
    message: 'Project must be at least 2 characters.',
  }),
});

export function AreaProject() {
  const { toast } = useToast();

  const { data: projects, isLoading } = useGetListProject();

  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: '',
    },
  });

  const disabledForm = Boolean(form.watch('project'));

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      if(data.error){
        return toast({
          title: 'Something went wrong',
          description: data.error ?? 'Something went wrong.',
          variant: 'destructive',
        });
      }
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: 'Your workspace has created',
      });
      setModal(false);
      form.reset();
    },
  });

  async function onSubmit(values) {
    mutate({ name: values.project, slug: generateSlug(values.project) });
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>
          <h2>Projects</h2>
        </CardTitle>
        <CardDescription>
          <h2>Recents</h2>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <ModalCreateProject open={modal} onClose={() => setModal(false)} form={form} onConfirm={onSubmit} isLoading={isPending} disabled={disabledForm} />
        <Button className='flex gap-5 items-center self-start' variant='ghost' onClick={() => setModal(true)}>
          <PlusSquareIcon size={40} />
          <h1>Create Project</h1>
        </Button>
        <ProjectItem data={projects?.data} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}

function ProjectItem({ data, isLoading = false }) {
  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <>
      {data.map((project) => {
        const initials = project.name
          .split(' ')
          .map((word) => word[0])
          .join('');
        return (
          <div className='flex gap-3 items-center' key={project.id}>
            <Avatar className='rounded-md'>
              <AvatarImage src={project?.logo} alt={project.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <h1>{project.name}</h1>
          </div>
        );
      })}
    </>
  );
}
