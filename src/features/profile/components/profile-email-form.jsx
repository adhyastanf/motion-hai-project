'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
});

export default function ProfileEmailForm({user}) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user.email,
    },
    mode: 'onChange',
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values){
    await authClient.changeEmail(
      {
        newEmail: values.email,
        callbackURL:'/dashboard'
      },
      {
        onRequest: () => {
          toast({
            title: 'Please wait...',
          });
        },
        onSuccess: () => {
          toast({
            title: 'Change email link verification sent!',
            description: `Check your email`,
          });
          router.refresh()
          setIsEditing(false)
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
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex-1'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  {isEditing ? (
                    <>
                      <FormControl>
                        <Input type='email' disabled={isSubmitting} {...field} />
                      </FormControl>
                      <FormMessage />
                    </>
                  ) : (
                    <p className='text-sm font-medium mt-1'>{field.value}</p>
                  )}
                </FormItem>
              )}
            />
          </div>

          {!isEditing && (
            <Button type='button' variant='outline' size='icon' onClick={() => setIsEditing(true)} className='mt-7'>
              <Pencil className='w-4 h-4' />
            </Button>
          )}
        </div>

        {isEditing && (
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={handleCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
