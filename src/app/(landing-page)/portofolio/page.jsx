import Portofoliohero from '@/components/landing-page/Portofoliohero';
import Portofoliopage from '@/components/landing-page/Portofoliopage';

export const metadata = {
  title: 'Hai Motion - Portofolio',
  description:
    'Setiap cerita yang kami produksi bukan sekadar proyek, melainkan karya yang menghubungkan brand dengan audiens lewat pesan yang kuat dan visual yang bermakna. Inilah beberapa momen berharga yang telah kami bantu wujudkan.',
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
    title: 'Hai Motion - Portofolio',
    description:
      'Lihat kumpulan karya terbaik kami yang telah menghubungkan brand dengan audiens melalui visual yang bermakna.',
    url: 'https://haimotion.com/portofolio',
    siteName: 'Hai Motion',
    locale: 'id_ID',
    type: 'website',
  },
  alternates: {
    canonical: '/portofolio',
  },
};

// Hindari warning viewport
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function Home() {
  return (
    <main>
      <Portofoliohero />
      <Portofoliopage />
    </main>
  );
}
