import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ContactBottomSheet from './ContactBottomSheet';

const projects = [
  {
    number: '01',
    category: 'Ekonom',
    name: 'Standart Xona',
    price: '| Kunlik: $35 · Haftalik: $200 · Oylik: $700',
    images: {
      col1_1: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      col1_2: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
      col2: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
    },
  },
  {
    number: '02',
    category: 'Komfort',
    name: 'Deluxe Xona',
    price: '| 2 kishilik · Kunlik: $90 · Haftalik: $550 · Oylik: $1800',
    images: {
      col1_1: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      col1_2: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
      col2: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    },
  },
  {
    number: '03',
    category: 'Luxury',
    name: 'Presidential Suite',
    price: '| 4 kishigacha · Kunlik: $300 · Haftalik: $1800 · Oylik: $6000',
    images: {
      col1_1: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      col1_2: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      col2: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    },
  },
];

function ProjectCard({ project, index, onBook }: { project: typeof projects[0]; index: number; onBook: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const totalCards = projects.length;
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={cardRef} className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Top Row */}
        <div className="flex items-start justify-between mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className="text-[#D7E2EA] font-black"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)', fontFamily: "'Kanit', sans-serif" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA] text-xs sm:text-sm uppercase tracking-wider opacity-60">
                {project.category} <span className="opacity-100 text-[#D7E2EA]">{project.price}</span>
              </span>
              <h3
                className="text-[#D7E2EA] font-medium"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontFamily: "'Kanit', sans-serif" }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onBook}
            className="hidden sm:block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors"
          >
            Band qilish
          </button>
        </div>

        {/* Images Grid */}
        <div className="flex gap-3 sm:gap-4 md:gap-5">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-[40%]">
            <img
              src={project.images.col1_1}
              alt=""
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.images.col1_2}
              alt=""
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>

          <div className="w-[60%]">
            <img
              src={project.images.col2}
              alt=""
              className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10"
    >
      <h2
        className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)', fontFamily: "'Kanit', sans-serif" }}
      >
        Xonalar
      </h2>

      <div className="space-y-10">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} onBook={() => setIsContactOpen(true)} />
        ))}
      </div>

      <ContactBottomSheet isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
