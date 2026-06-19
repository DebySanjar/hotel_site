import { useEffect, useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
  'https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
  'https://images.unsplash.com/photo-1498503403619-e39e4ff390fe?w=800&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
  'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
];

const row1Images = images.slice(0, 11);
const row2Images = images.slice(11);

export default function MarqueeSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('gallery');
      if (!section) return;
      
      const sectionTop = section.offsetTop;
      const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(scrollOffset);
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="gallery" className="bg-[#0C0C0C] pt-8 sm:pt-10 md:pt-12 pb-4 overflow-hidden">
      {/* Title */}
      <h2
        className="hero-heading font-black uppercase text-center mb-8 sm:mb-10 md:mb-12"
        style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)', fontFamily: "'Kanit', sans-serif" }}
      >
        Gallereya
      </h2>

      {/* Row 1 - Scrolls Right */}
      <div className="flex gap-3 mb-3 overflow-hidden">
        <div
          className="flex gap-3 shrink-0"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {[...row1Images, ...row1Images, ...row1Images].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="w-[420px] h-[270px] rounded-2xl object-cover"
            />
          ))}
        </div>
      </div>

      {/* Row 2 - Scrolls Left */}
      <div className="flex gap-3 overflow-hidden">
        <div
          className="flex gap-3 shrink-0"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {[...row2Images, ...row2Images, ...row2Images].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="w-[420px] h-[270px] rounded-2xl object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
