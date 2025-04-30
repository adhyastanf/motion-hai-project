'use client';

import ModalCreateProject from '@/components/modal/project-modal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { generateSlug } from '@/lib/format';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusSquareIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ButtonCreateProject() {
  const formSchema = z.object({
    project: z.string().min(2, {
      message: 'Project must be at least 2 characters.',
    }),
  });

  const { toast } = useToast();
  const router = useRouter();
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
        onSuccess: () => {
          toast({
            title: 'You has create project',
          });
          router.refresh();
          form.reset();
          setModal(false);
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
    <>
      <ModalCreateProject open={modal} onClose={() => setModal(false)} form={form} onConfirm={onSubmit} isLoading={form.formState.isSubmitting} disabled={disabledForm} />
      <Button className='flex gap-5 items-center self-start' variant='ghost' onClick={() => setModal(true)}>
        <PlusSquareIcon size={40} />
        <h1>Create Project</h1>
      </Button>
    </>
  );
}
