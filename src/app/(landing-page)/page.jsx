import About from "@/components/landing-page/About";
import Homehero from "@/components/landing-page/Homehero";
import Portfolio from "@/components/landing-page/Portofolio";
import Client from "@/components/landing-page/Client";
import Faq from "@/components/landing-page/Faq";
import Services from "@/components/landing-page/Services";
import Abouthome from "@/components/landing-page/Abouthome";
import CompanyProfile from "@/components/landing-page/Companyprofile";


export default function Home() {
  return (
    <>

    <Homehero />
    <Abouthome />
    <CompanyProfile />
    <About />
    <Portfolio />
    <Services />
    <Faq />
    <Client />

    </>
  );
}