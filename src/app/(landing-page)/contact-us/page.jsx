import Contact from '@/components/landing-page/Contact';
import Contacthero from '@/components/landing-page/Contacthero';

export const metadata = {
  title: 'Hai Motion - Contact Us',
  description: 'Every line, every step — make it count. Reach out to us for inquiries, collaborations, or just to say hello.',
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
    title: 'Hai Motion - Contact Us',
    description: 'Connect with us for collaborations, partnerships, or support. Let’s create something meaningful together.',
    url: 'https://haimotion.com/contact-us',
    siteName: 'Hai Motion',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/contact-us',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function Home() {
  return (
    <main>
      <Contacthero />
      <Contact />
    </main>
  );
}
