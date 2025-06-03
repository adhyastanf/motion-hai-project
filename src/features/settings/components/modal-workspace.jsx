'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import ModalInput from '@/components/modal/input-modal';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ButtonModalWorkspace({ modal, setModal, initialData }) {
  const formSchema = z.object({
    workspace: z.string().min(2, {
      message: 'Workspace must be at least 2 characters.',
    }),
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { orgId } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspace: initialData?.name || '',
    },
  });

  const disabledForm = Boolean(form.watch(['workspace']).every(Boolean));

  async function onSubmit(values) {
    if (modal === 'update') {
      await authClient.organization.update(
        {
          data: {
            name: values.workspace,
          },
          organizationId: orgId,
        },
        {
          onRequest: () => {
            toast({
              title: 'Please wait...',
            });
          },
          onSuccess: () => {
            toast({
              title: 'Project Updated',
              description: 'Your project has been updated successfully.',
            });
            queryClient.invalidateQueries({
              queryKey: ['workspace', orgId],
            });
            form.reset();
            setModal('');
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
    } else if (modal === 'delete') {
      await authClient.organization.delete(
        {
          organizationId: orgId,
        },
        {
          onRequest: () => {
            toast({
              title: 'Please wait...',
            });
            setLoading(true);
          },
          onSuccess: () => {
            toast({
              title: 'Project deleted',
              description: 'Your project has been deleted successfully.',
            });
            queryClient.invalidateQueries({
              queryKey: ['workspace', orgId],
            });
            setLoading(false);
            setModal('');
          },
          onError: (ctx) => {
            toast({
              title: 'Something went wrong',
              description: ctx.error.message ?? 'Something went wrong.',
              variant: 'destructive',
            });
            setLoading(false)
            setModal('');
          },
        }
      );
    }
  }

  const fields = [
    {
      name: 'workspace',
      label: 'Workspace',
      placeholder: 'Input workspace',
      description: 'This is the name of your workspace in organization.',
    },
  ];

  return (
    <>
      <ModalInput
        title='Update a Workspace'
        description={'This is the name of your company, team or organization.'}
        fields={fields}
        open={modal === 'update'}
        onClose={() => setModal('')}
        form={form}
        onConfirm={onSubmit}
        isLoading={form.formState.isSubmitting}
        disabled={disabledForm}
        buttonYesText='Update Workspace'
      />
      <AlertModal
        title={`Are you sure to delete workspace "${initialData?.name}"?`}
        description='This action cannot be undone. This will permanently delete your project.'
        isOpen={modal === 'delete'}
        onClose={() => setModal('')}
        onConfirm={onSubmit}
        isLoading={loading}
      />
    </>
  );
}
