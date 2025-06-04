import About from "@/components/landing-page/About";
import Homehero from "@/components/landing-page/Homehero";
import Portfolio from "@/components/landing-page/Portofolio";
import Client from "@/components/landing-page/Client";
import Faq from "@/components/landing-page/Faq";
import Services from "@/components/landing-page/Services";
import Abouthome from "@/components/landing-page/Abouthome";
import CompanyProfile from "@/components/landing-page/Companyprofile";

export const metadata = {
  title: 'Hai Motion - Home',
  description: 'Welcome to Hai Motion - Luxury Experiences, Redefined',
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