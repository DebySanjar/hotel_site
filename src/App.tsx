import Hero from './components/Hero';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import CtaSection from './components/cta/CtaSection';
import Footer from './components/Footer';

function App() {
  return (
    <main className="min-h-screen bg-[#f0f0f0]" style={{ overflowX: 'clip' }}>
      <Hero />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}

export default App;
