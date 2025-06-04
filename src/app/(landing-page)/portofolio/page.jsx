import Portofoliohero from "@/components/landing-page/Portofoliohero";
import Portofoliopage from "@/components/landing-page/Portofoliopage";

export const metadata = {
  title: 'Hai Motion - Portofolio',
  description: 'Setiap cerita yang kami produksi bukan sekadar proyek, melainkan karya yang menghubungkan brand dengan audiens lewat pesan yang kuat dan visual yang bermakna. Inilah beberapa momen berharga yang telah kami bantu wujudkan',
};

export default function Home() {
  return (
    <main>

    <Portofoliohero />
    <Portofoliopage />

    </main>
  );
}