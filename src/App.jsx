import { Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Hero from './component/Hero';
import Planning from './component/Planning';
import Tarifs from './component/Tarifs';
import Coachs from './component/Coachs';
import Contact from './component/Contact';
import Footer from './component/Footer';
import Admin from './component/Admin';

function Site() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Planning />
        <Tarifs />
        <Coachs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Site />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}