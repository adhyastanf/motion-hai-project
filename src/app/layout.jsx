  import Providers from '@/components/layout/providers';
  import { NuqsAdapter } from 'nuqs/adapters/next/app';
  import { Lato } from 'next/font/google';
  import NextTopLoader from 'nextjs-toploader';
  import './globals.css';
  import { Toaster } from '@/components/ui/toaster';

  export const metadata = {
    title: 'Hai Motion | Discover Creativity in Motion',
    description: 'Hai Motion is a platform for showcasing creativity and innovation in motion. Explore, engage, and experience the next generation of motion design.',
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL('https://haimotion.com'), // ganti dengan domain asli
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'Hai Motion',
      description: 'Discover Creativity in Motion.',
      url: 'https://haimotion.com',
      siteName: 'Hai Motion',
      locale: 'en_US',
      type: 'website',
    },
  };

  export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
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
