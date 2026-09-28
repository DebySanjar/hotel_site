import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const VERTICAL_TEXT = 'ALOQA';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  /* Scroll-driven vertical text animation */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-55%']);

  /* Validation */
  const validate = (name: string, value: string) => {
    let err = '';
    if (name === 'name' && value.trim().length < 2) err = 'Ism kamida 2 ta harf';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = "Email noto'g'ri";
    if (name === 'phone' && !value.trim()) err = 'Telefon kiritish majburiy';
    if (name === 'message' && value.trim().length < 5) err = 'Xabar juda qisqa';
    setErrors((prev: typeof errors) => ({ ...prev, [name]: err }));
    return err === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: typeof formData) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) validate(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = Object.keys(formData).every(k => validate(k, formData[k as keyof typeof formData]));
    if (ok) { setSent(true); setFormData({ name: '', email: '', phone: '', message: '' }); }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0C0C0C] overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Inner white card — like the reference screenshot */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-20 sm:py-28 md:py-36 flex flex-col lg:flex-row gap-12 lg:gap-0 items-stretch">

        {/* ── LEFT: vertical scrolling "ALOQA" text ── */}
        <div className="relative hidden lg:flex flex-col items-start justify-start overflow-hidden"
          style={{ width: '220px', minHeight: '520px' }}>
          <motion.div
            style={{ y: textY }}
            className="flex flex-col gap-0 select-none pointer-events-none"
          >
            {/* Repeat text enough times to fill the scroll travel */}
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="font-black uppercase leading-none text-white/10"
                style={{
                  fontSize: 'clamp(5rem, 11vw, 130px)',
                  fontFamily: "'Kanit', sans-serif",
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                  letterSpacing: '-0.02em',
                }}
              >
                {VERTICAL_TEXT}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── CENTER: info column ── */}
        <div className="flex flex-col justify-center gap-10 lg:pl-8 lg:pr-16 shrink-0" style={{ maxWidth: '320px' }}>
          <div>
            <p
              className="text-white font-bold mb-8"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontFamily: "'Kanit', sans-serif" }}
            >
              Gaplashaylik.
            </p>

            {/* Office */}
            <div className="mb-6">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Manzil</p>
              <p className="text-white/80 text-sm leading-relaxed">
                Farg'ona sh., Mustaqillik<br />ko'chasi, 123-uy
              </p>
            </div>

            {/* WhatsApp */}
            <div className="mb-6">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">WhatsApp</p>
              <a
                href="https://wa.me/998732445566"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Xabar yuborish
              </a>
            </div>

            {/* Phone */}
            <div className="mb-6">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Telefon</p>
              <a
                href="tel:+998732445566"
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                +998 73 244 55 66
              </a>
            </div>

            {/* Email */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Email</p>
              <a
                href="mailto:info@ferghanahotel.uz"
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@ferghanahotel.uz
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT: contact form ── */}
        <div className="flex-1 border-t border-white/10 lg:border-t-0 lg:border-l lg:pl-16 pt-10 lg:pt-0 flex flex-col justify-center">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center gap-4 py-16"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-semibold text-lg" style={{ fontFamily: "'Kanit', sans-serif" }}>
                Xabaringiz yuborildi!
              </p>
              <p className="text-white/50 text-sm text-center">Tez orada siz bilan bog'lanamiz.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-white/40 hover:text-white text-sm transition-colors underline underline-offset-4"
              >
                Yana yuborish
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-0">
              {/* Tabs — dekorativ */}
              <div className="flex gap-6 mb-8 border-b border-white/10 pb-4">
                <button type="button" className="text-white font-semibold text-sm pb-1 border-b-2 border-white">
                  Bog'lanish
                </button>
                <button type="button" className="text-white/30 text-sm hover:text-white/60 transition-colors">
                  Bron qilish
                </button>
              </div>

              <Field label="To'liq ism *" error={errors.name}>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={e => validate('name', e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white text-sm py-3 transition-colors placeholder:text-white/20"
                  placeholder="Ismingiz"
                />
              </Field>

              <Field label="Email *" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={e => validate('email', e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white text-sm py-3 transition-colors placeholder:text-white/20"
                  placeholder="email@example.com"
                />
              </Field>

              <div className="grid grid-cols-2 gap-6">
                <Field label="Telefon *" error={errors.phone}>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={e => validate('phone', e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white text-sm py-3 transition-colors placeholder:text-white/20"
                    placeholder="+998 __ ___ __ __"
                  />
                </Field>

                <Field label="Mavzu" error="">
                  <input
                    name="subject"
                    type="text"
                    className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white text-sm py-3 transition-colors placeholder:text-white/20"
                    placeholder="Masalan: Bron"
                  />
                </Field>
              </div>

              <Field label="Xabar *" error={errors.message}>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={e => validate('message', e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white text-sm py-3 transition-colors resize-none placeholder:text-white/20"
                  placeholder="Xabaringizni yozing..."
                />
              </Field>

              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-white text-[#0C0C0C] font-semibold text-sm uppercase tracking-widest px-10 py-3.5 rounded-full hover:bg-white/90 active:scale-95 transition-all"
                >
                  Yuborish
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* Small helper for form field layout */
function Field({ label, error, children }: { label: string; error: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <label className="block text-white/30 text-[10px] uppercase tracking-widest mb-0">{label}</label>
      {children}
      {error && <p className="text-red-400 text-[11px] mt-1">{error}</p>}
    </div>
  );
}
