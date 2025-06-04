import Abouthero from "@/components/landing-page/Abouthero";
import Aboutus from "@/components/landing-page/Aboutus";

export const metadata = {
  title: 'Hai Motion - About',
  description: 'Over the years, we have built a strong reputation with our clients and aim to expand our company to new heights. Our team consists of talented photographers, videographers, editors, and designers working together to deliver creative and professional media solutions. We thrive on the joy of storytelling, the sincerity in moments, and the vibrant energy of life, aiming to craft experiences that resonate with our clients and their audiences.',
};

export default function HomePage() {
 return (
      <main>
        <Abouthero />
        <Aboutus />
      </main>
  );
}
