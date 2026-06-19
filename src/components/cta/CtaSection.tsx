import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeUp from './FadeUp';
import CtaDashboardMock from './CtaDashboardMock';

function useIsMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const dashboardY = useTransform(scrollYProgress, [0, 1], ['120px', '-120px']);
  const grassY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ['80px', '-40px'] : ['200px', '-200px']
  );

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative w-full"
      style={{ background: 'linear-gradient(to bottom, transparent 0%, #14191E 100%)' }}
    >
      <div className="relative mx-auto max-w-[1080px] px-4 sm:px-6 pt-24 sm:pt-32 md:pt-40 pb-[440px] sm:pb-[520px] md:pb-[440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          {/* Left column */}
          <div className="relative z-20 max-w-[400px]">
            <FadeUp delay={0.1}>
              <h2
                className="font-black uppercase leading-none tracking-tight text-white"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                }}
              >
                Green<br />Hotel
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p
                className="mt-6 text-base sm:text-lg leading-[1.6] max-w-[380px]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#a3c4a0',
                }}
              >
                Zamonaviy xonalar, professional xizmat va qulay joylashuv. Mehmonxonamizda qolish uchun hoziroq band qiling va maxsus chegirmadan foydalaning.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Dashboard - parallax */}
      <motion.div
        style={{ y: dashboardY }}
        className="absolute top-[440px] sm:top-[460px] md:top-[500px] lg:top-20 left-4 right-4 sm:left-auto sm:-right-[8%] md:-right-[10%] lg:-right-[12%] z-10 sm:w-[85%] md:w-[80%] lg:w-[68%]"
      >
        <CtaDashboardMock />
      </motion.div>

      {/* Grass foreground - parallax */}
      <motion.img
        src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1780586778/cta-bg_mlwy5s.png"
        alt=""
        aria-hidden
        style={{ y: grassY }}
        className="pointer-events-none select-none absolute left-0 right-0 bottom-[-40px] sm:bottom-[-80px] lg:bottom-[-140px] w-full z-30 object-cover"
      />
    </section>
  );
}
