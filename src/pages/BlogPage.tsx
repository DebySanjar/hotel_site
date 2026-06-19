import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { testimonials, blogPosts } from '../data/blogData';

// ─── Testimonial Card ───────────────────────────────────────────────
function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 w-[300px] shrink-0">
      <p className="text-white/80 text-sm leading-relaxed flex-1">"{item.quote}"</p>
      <div className="flex items-center gap-3">
        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full bg-white/10" />
        <div>
          <p className="text-white font-medium text-sm">{item.name}</p>
          <p className="text-white/40 text-xs">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Auto Marquee Testimonials ───────────────────────────────────────
function TestimonialsMarquee() {
  const doubled = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0C0C0C, transparent)' }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0C0C0C, transparent)' }} />

      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Blog Post Card ──────────────────────────────────────────────────
function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-colors flex flex-col"
    >
      {/* Main Preview Image - taller */}
      <div className="relative overflow-hidden">
        <img
          src={post.thumbnails[activeThumb]}
          alt={post.title}
          className="w-full h-72 object-cover transition-all duration-500"
        />
      </div>

      {/* Thumbnail Strip - horizontal scroll, slightly shorter */}
      <div className="flex gap-2 px-3 pt-3 pb-1 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {post.thumbnails.map((thumb, i) => (
          <button
            key={i}
            onClick={() => setActiveThumb(i)}
            className={`shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
              activeThumb === i
                ? 'border-blue-500 scale-105'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={thumb} alt="" className="w-24 h-16 object-cover" />
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-bold text-lg leading-snug group-hover:text-white/80 transition-colors flex-1">
            {post.title}
          </h3>
          <span className="shrink-0 text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
            {post.tag}
          </span>
        </div>
        <p className="text-white/50 text-sm leading-relaxed mt-2 line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
}

// ─── Sticky Search Bar ───────────────────────────────────────────────
function StickySearch({ query, onChange }: { query: string; onChange: (v: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
        >
          <div className="bg-[#111]/90 backdrop-blur-xl border border-white/15 rounded-full px-4 py-2.5 flex items-center gap-3 w-full max-w-md shadow-2xl">
            <Search className="w-4 h-4 text-white/50 shrink-0" />
            <input
              value={query}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Blog postlarni qidirish..."
              className="bg-transparent outline-none text-white placeholder-white/30 text-sm flex-1"
            />
            {query && (
              <button onClick={() => onChange('')}>
                <X className="w-4 h-4 text-white/50 hover:text-white transition-colors" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Blog Page ──────────────────────────────────────────────────
export default function BlogPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const filteredPosts = blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0C0C0C]" style={{ fontFamily: "'Kanit', sans-serif" }}>
      {/* Sticky search */}
      <StickySearch query={searchQuery} onChange={setSearchQuery} />

      {/* Back button */}
      <div className="px-5 sm:px-8 md:px-10 pt-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Orqaga
        </button>
      </div>

      {/* Title */}
      <div className="px-5 sm:px-8 md:px-10 pt-8 pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 140px)' }}
        >
          Bizning Blog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white/40 mt-4 text-sm sm:text-base max-w-xl mx-auto"
        >
          Mehmonxona yangiliklari, sayohat maslahatlari va qiziqarli maqolalar
        </motion.p>
      </div>

      {/* Testimonials - auto marquee */}
      <div ref={testimonialsRef} className="sticky top-0 z-10 bg-[#0C0C0C] py-6">
        <TestimonialsMarquee />
      </div>

      {/* Blog posts */}
      <div className="relative z-20 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-10 pb-20">
        {/* Search + Count */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-white/40 text-sm">
            {filteredPosts.length} ta {blogPosts.length} dan natija
          </span>
          {/* Inline search (desktop) */}
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-white/40" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Qidirish..."
              className="bg-transparent outline-none text-white placeholder-white/30 text-sm w-40"
            />
          </div>
        </div>

        {/* Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-white/30"
          >
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Hech narsa topilmadi: "{searchQuery}"</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
