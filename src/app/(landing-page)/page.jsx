import About from "@/components/landing-page/About";
import Homehero from "@/components/landing-page/Homehero";
import Portfolio from "@/components/landing-page/Portfolio";
import Client from "@/components/landing-page/Client";
import Faq from "@/components/landing-page/Faq";
import Services from "@/components/landing-page/Services";


export default function Home() {
  return (
    <>

    <Homehero />
    <About />
    <Portfolio />
    <Services />
    <Faq />
    <Client />

    </>
  );
}