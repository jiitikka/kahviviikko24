import Image from "next/image";
import Hero from "./components/Hero";
import SectionContainer from "./components/SectionContainer";
import About from "./components/About";
import CafesParticipating from "./components/CafesParticipating";
import EventTimeline from "./components/EventTimeline";
import Organizers from "./components/Organizers";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero/>
      <About/>
      <CafesParticipating/>
      <EventTimeline/>
      <Organizers/>
      <Footer/>
    </main>
  );
}
