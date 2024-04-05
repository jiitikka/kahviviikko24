import Hero from "./components/Hero";
import About from "./components/About";
import CafesParticipating from "./components/CafesParticipating";
import EventTimeline from "./components/EventTimeline";
import Organizers from "./components/Organizers";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Faq from "./components/Faq";

export default function Home() {
  return (
    <main>
      <Hero/>
      <Header/>
      <About/>
      <CafesParticipating/>
      <EventTimeline/>
      <Faq/>
      <Organizers/>
      <Footer/>
    </main>
  );
}
