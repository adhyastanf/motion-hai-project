import About from "@/components/landing-page/About";
import Contact from "@/components/landing-page/Contact";
import Homehero from "@/components/landing-page/Homehero";
import Portfolio from "@/components/landing-page/Portfolio";
import Client from "@/components/landing-page/Client";
import Association from "@/components/landing-page/Association";


export default function Home() {
  return (
    <>

    <Homehero />
    <About />
    <Portfolio />
    <Client />
    <Association />
    <Contact />

    </>
  );
}