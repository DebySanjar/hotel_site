import Hero from './components/Hero';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import CtaSection from './components/cta/CtaSection';
import Footer from './components/Footer';
import BottomNav from './components/bottomNav';

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
      <BottomNav />
    </main>
  );
}

export default App;
