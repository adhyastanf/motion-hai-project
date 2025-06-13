import Abouthero from '@/components/landing-page/Abouthero';
import Aboutus from '@/components/landing-page/Aboutus';

export const metadata = {
  title: 'Hai Motion - About',
  description:
    'Over the years, we have built a strong reputation with our clients and aim to expand our company to new heights. Our team consists of talented photographers, videographers, editors, and designers working together to deliver creative and professional media solutions. We thrive on the joy of storytelling, the sincerity in moments, and the vibrant energy of life, aiming to craft experiences that resonate with our clients and their audiences.',
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
  openGraph: {
    title: 'Hai Motion - About',
    description: 'Discover our journey in delivering creative and professional media solutions. Meet our team of photographers, videographers, and storytellers.',
    url: 'https://haimotion.com/about',
    siteName: 'Hai Motion',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/about',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function HomePage() {
  return (
    <main>
      <Abouthero />
      <Aboutus />
    </main>
  );
}
