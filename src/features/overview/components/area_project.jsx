'use client';

import ModalCreateProject from '@/components/modal/project-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { generateSlug } from '@/lib/format';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusSquareIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  project: z.string().min(2, {
    message: 'Project must be at least 2 characters.',
  }),
}); 


export function AreaProject({projects}) {
  const { toast } = useToast()
  const router = useRouter()

  const [modal, setModal] = useState(false);

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        project: '',
      },
    });
  
    const disabledForm = Boolean(form.watch('project'));
  
    async function onSubmit(values) {
      await authClient.organization.create(
        {
          name: values.project,
          slug: generateSlug(values.project),
        },
        {
          onRequest: () => {
            toast({
              title: 'Please wait...',
            });
          },
          onSuccess: async () => {
            toast({
              title: 'Your workspace has created',
            });
            router.refresh()
            form.reset();
            setModal(false)
          },
          onError: (ctx) => {
            toast({
              title: 'Something went wrong',
              description: ctx.error.message ?? 'Something went wrong.',
              variant: 'destructive',
            });
          },
        }
      );
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
        <ModalCreateProject open={modal} onClose={() => setModal(false)} form={form} onConfirm={onSubmit} isLoading={form.isSubmitting} disabled={disabledForm} />
        <Button className='flex gap-5 items-center self-start' variant='ghost' onClick={() => setModal(true)}>
          <PlusSquareIcon size={40} />
          <h1>Create Project</h1>
        </Button>
        <ProjectItem data={projects} />
      </CardContent>
    </Card>
  );
}

function ProjectItem({ data, isLoading = false }) {

  if(isLoading){
    return <p>Loading....</p>
  }

  return (
    <>
      {data?.map((project) => {
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
