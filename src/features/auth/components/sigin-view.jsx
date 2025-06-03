import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import UserAuthLoginForm from './user-auth-login-form';
import UserAuthRegisterForm from './user-auth-register-form';
import Logo from '../../../components/assets/aboutlogo.webp';

export default function SignViewPage({ mode }) {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link href='/examples/authentication' className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 hidden md:right-8 md:top-8')}>
        Login
      </Link>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <Image src={Logo} alt='Logo Hai Motion' width={200} height={200} />
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>&ldquo;This starter template has saved me countless hours of work and helped me deliver projects to my clients faster than ever before.&rdquo;</p>
            <footer className='text-sm'>Random Dude</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>{mode === 'login' ? 'Sign in your account' : 'Create your an account'}</h1>
            <p className='text-sm text-muted-foreground'>Enter your email below</p>
          </div>
          {mode === 'login' ? (
            <>
              <UserAuthLoginForm />
              <div className='text-center'>
                <Link href='/forget-password' className='text-sm text-blue-600 hover:underline'>
                  Forgot password?
                </Link>
              </div>
            </>
          ) : (
            <UserAuthRegisterForm />
          )}

          <p className='text-center text-sm text-muted-foreground'>
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <Link href='/sign-up' className='text-primary underline underline-offset-4'>
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href='/sign-in' className='text-primary underline underline-offset-4'>
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
