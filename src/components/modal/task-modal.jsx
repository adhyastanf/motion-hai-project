'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Modal } from '../ui/modal';

const formSchema = z.object({
    task: z.string().min(2, {
      message: 'Task must be at least 2 characters.',
    }),
  }); 

export default function ModalCreateTask({ open, onClose, onConfirm, isLoading, disabled, title }) {
    const { toast } = useToast()
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        task: '',
      },
    });
  
    const watchForm = Boolean(form.watch('task'));
  
    async function onSubmit(values) {
      await authClient.organization.create(
        {
          name: 'My Organization',
          slug: 'my-orgs',
        },
        {
          onRequest: () => {
            toast({
              title: 'Please wait...',
            });
          },
          onSuccess: () => {
            toast({
              title: 'Your task has created',
            });
            form.reset();
            onClose()
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
      <Modal title={title} isOpen={open} onClose={onClose} >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='task'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Create your task' {...field} />
                    </FormControl>
                    <FormDescription>This is the name of your company, team or organization.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {form.formState.isSubmitting && (
                <Button disabled className='w-full'>
                  <Loader2 className='animate-spin' />
                  Please wait...
                </Button>
              )}

              {!form.formState.isSubmitting && (
                <Button type='submit' disabled={!watchForm} className='w-full'>
                  Continue
                </Button>
              )}
            </form>
          </Form>
      </Modal>
    );
  }