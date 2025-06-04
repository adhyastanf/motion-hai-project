'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),

    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),

    password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(32, { message: 'Password must be at most 32 characters' }),

    confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function UserAuthRegisterForm() {
  const { toast } = useToast();
  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const isLoadingForm = form.formState.isSubmitting;

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    await authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => {
          toast({
            title: 'Please wait...',
          });
        },
        onSuccess: () => {
          toast({
            title: '"Verification link has been sent to your mail"',
          });
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Enter Your Name' disabled={isLoadingForm} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='Enter Your Email' disabled={isLoadingForm} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Enter your password' disabled={isLoadingForm} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Confirm Your Password' disabled={isLoadingForm} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoadingForm} className='ml-auto w-full' type='submit'>
          Register
        </Button>
      </form>
    </Form>
  );
}
