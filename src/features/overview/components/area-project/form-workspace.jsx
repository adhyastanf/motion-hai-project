'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { generateSlug } from '@/lib/format';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function FormWorkspace() {
  const fields = [
    {
      name: 'workspace',
      label: 'Workspace',
      placeholder: 'Input your workspace',
      description: 'This is the name of your company, team or organization.',
    },
  ];

  const formSchema = z.object({
    workspace: z.string().min(2, {
      message: 'Workspace must be at least 2 characters.',
    }),
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspace: '',
    },
  });

  const disabled = Boolean(form.watch('workspace'));
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
          queryClient.invalidateQueries(['workspaces']);
          form.reset();
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

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {fields.map((val, idx) => {
          return (
            <FormField
              key={idx}
              control={form.control}
              name={val.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{val.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={val.placeholder} {...field} />
                  </FormControl>
                  <FormDescription>{val.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        {isLoading && (
          <Button disabled className='w-full'>
            <Loader2 className='animate-spin' />
            Please wait...
          </Button>
        )}

        {!isLoading && (
          <Button type='submit' disabled={!disabled} className='w-full'>
            Create Workspace
          </Button>
        )}
      </form>
    </Form>
  );
}
