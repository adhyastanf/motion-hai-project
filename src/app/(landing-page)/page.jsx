import About from '@/components/landing-page/About';
import Homehero from '@/components/landing-page/Homehero';
import Portfolio from '@/components/landing-page/Portofolio';
import Client from '@/components/landing-page/Client';
import Faq from '@/components/landing-page/Faq';
import Services from '@/components/landing-page/Services';
import Abouthome from '@/components/landing-page/Abouthome';
import CompanyProfile from '@/components/landing-page/Companyprofile';

export const metadata = {
  title: 'Hai Motion - Home',
  description: 'Welcome to Hai Motion — Luxury Experiences, Redefined. We craft visual stories that elevate brands and inspire audiences.',
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
    title: 'Hai Motion - Creativity in Motion, Brand in Action',
    description: 'Experience stunning visual storytelling with Hai Motion. Photography, videography, and brand experiences that redefine quality.',
    url: 'https://haimotion.com',
    siteName: 'Hai Motion',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/',
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
      <Homehero />
      <Abouthome />
      <CompanyProfile />
      <About />
      <Portfolio />
      <Services />
      <Faq />
      <Client />
    </main>
  );
}
