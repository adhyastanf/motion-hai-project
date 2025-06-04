import Contact from "@/components/landing-page/Contact";
import Contacthero from "@/components/landing-page/Contacthero";

export const metadata = {
  title: 'Hai Motion - Contact Us',
  description: 'Every line, every step — make it count.',
};

export default function Home() {
  return (
    <main>

    <Contacthero />
    <Contact />

    </main>
  );
}