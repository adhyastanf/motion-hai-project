'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/client/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
// import GithubSignInButton from './github-auth-button';

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
  const router = useRouter()
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl');
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
        callbackURL: '/signIn',
      },
      {
        onRequest: () => {
          toast({
            title: 'Please wait...',
          });
        },
        onSuccess: (ctx) => {
          toast({
            title: 'You has Registered',
          });
          router.push('/signIn')
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Enter your name...' disabled={isLoadingForm} {...field} />
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
                  <Input type='email' placeholder='Enter your email...' disabled={isLoadingForm} {...field} />
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
                  <Input type='password' placeholder='Enter your password...' disabled={isLoadingForm} {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Confirm your password...' disabled={isLoadingForm} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoadingForm} className='ml-auto w-full' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
      {/* <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </div>
      </div>
      <GithubSignInButton /> */}
    </>
  );
}
