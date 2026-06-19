import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import ContactBottomSheet from './ContactBottomSheet';

export default function AboutSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const text =
    "Farg'ona viloyatining markazida joylashgan zamonaviy mehmonxonamiz 2015-yildan beri mehmonlarga yuqori sifatli xizmat ko'rsatib kelmoqda. Bizning mehmonxona O'zbekistonning go'zal Farg'ona vodiysida joylashgan bo'lib, mijozlarimizga qulay va shinam muhitni taqdim etamiz. Har bir xonada zamonaviy qulayliklar, tez Wi-Fi va professional xizmat mavjud. Mehmonxonamizda restoran, konferensiya zallari va boshqa ko'plab qulayliklar sizni kutmoqda!";

  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Decorative Images */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px]"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-[130px] sm:w-[170px] md:w-[220px]"
        />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            Biz haqimizda
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <p
            ref={textRef}
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[700px] relative"
            style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.35rem)', 
              fontFamily: "'Kanit', sans-serif",
              textAlign: 'center'
            }}
          >
            {text.split('').map((char, i) => {
              const start = i / text.length;
              const end = start + 1 / text.length;
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

              return (
                <motion.span key={i} style={{ opacity }} className="inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              );
            })}
          </p>

          <ContactButton onClick={() => setIsContactOpen(true)} />
        </div>
      </div>

      {/* Contact Bottom Sheet */}
      <ContactBottomSheet isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
