  import Providers from '@/components/layout/providers';
  import { NuqsAdapter } from 'nuqs/adapters/next/app';
  import { Lato } from 'next/font/google';
  import NextTopLoader from 'nextjs-toploader';
  import './globals.css';
  import { Toaster } from '@/components/ui/toaster';

  export const metadata = {
    title: 'Next Shadcn',
    description: 'Basic dashboard with Next.js and Shadcn'
  };

  const lato = Lato({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    display: 'swap'
  });

  export default async function RootLayout({
    children
  }) {

    return (
      <html lang='en' className={`${lato.className}`} suppressHydrationWarning>
        <body className={'overflow-auto'}>
          <NextTopLoader showSpinner={false} />
          <NuqsAdapter>
            <Providers>
              {children}
              <Toaster />
            </Providers>
          </NuqsAdapter>
        </body>
      </html>
    );
  }
