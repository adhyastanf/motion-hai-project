'use client';

import ModalInput from '@/components/modal/input-modal';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { generateSlug } from '@/lib/format';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ButtonCreateWorkspace({ modal, setModal }) {
  const formSchema = z.object({
    workspace: z.string().min(2, {
      message: 'Workspace must be at least 2 characters.',
    }),
  });

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspace: '',
    },
  });

  const disabledForm = Boolean(form.watch('workspace'));
  async function onSubmit(values) {
    await authClient.organization.create(
      {
        name: values.workspace,
        slug: generateSlug(values.workspace),
      },
      {
        onRequest: () => {
          toast({
            title: 'Please wait...',
          });
        },
        onSuccess: () => {
          toast({
            title: 'You has create workspace',
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

  const fields = [
    {
      name: 'workspace',
      label: 'Workspace',
      placeholder: 'Input your workspace',
      description: 'This is the name of your company, team or organization.',
    },
  ];

  return <ModalInput title='Create Workspace' fields={fields} open={modal} onClose={() => setModal(false)} form={form} onConfirm={onSubmit} isLoading={form.formState.isSubmitting} disabled={disabledForm} />;
}
