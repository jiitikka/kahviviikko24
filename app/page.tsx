import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TicketSection from './components/TicketSection';
import Schedule from './components/Schedule';
import Cafes from './components/Cafes';
import Perky from './components/Perky';
import Partners from './components/Partners';
import Faq from './components/Faq';
import Footer from './components/Footer';
import TicketDialogProvider from './components/TicketDialogProvider';
import { SHOW_PERKY } from './config';

export default function Home() {
  return (
    <TicketDialogProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <TicketSection />
        <Schedule />
        <Cafes />
        {SHOW_PERKY && <Perky />}
        <Partners />
        <Faq />
      </main>
      <Footer />
    </TicketDialogProvider>
  );
}
