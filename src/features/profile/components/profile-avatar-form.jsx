'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  imageUrl: z.string().optional(),
});

export default function ProfileAvatarForm({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      imageUrl: '',
    },
    mode: 'onChange',
  });
 
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    await authClient.updateUser(
      {
        name: values.name,
      },
      {
        onRequest: () => {
          toast({
            title: 'Please wait...',
          });
        },
        onSuccess: () => {
          toast({
            title: 'Update user information!',
            description: `Your user information updated`,
          });
          setIsEditing(false)
          router.refresh()
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
        <div className='flex items-center gap-4'>
          <Avatar className='h-16 w-16'>
            <AvatarImage src={form.watch('imageUrl')} />
            <AvatarFallback>{form.watch('name')?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className='flex-1'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  {isEditing ? (
                    <>
                      <FormControl>
                        <Input disabled={isSubmitting} {...field} />
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
            <Button type='button' variant='outline' size='icon' onClick={() => setIsEditing(true)} className='self-start mt-6'>
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
