import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  "Sahifalar": [
    { label: "Gallereya", href: "#gallery" },
    { label: "Haqimizda", href: "#about" },
    { label: "Xizmatlar", href: "#services" },
    { label: "Xonalar", href: "#projects" },
    { label: "Blog", href: "/blog" },
  ],
  "Xizmatlar": [
    { label: "Luxury Xonalar", href: "#" },
    { label: "Restoran", href: "#" },
    { label: "Konferensiya", href: "#" },
    { label: "Fitnes Zali", href: "#" },
    { label: "24/7 Xizmat", href: "#" },
  ],
};

export default function Footer() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0C0C0C] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <h3
              className="text-2xl font-bold text-white mb-4 tracking-tight"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              RIVR Hotel
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Farg'ona vodiysidagi eng zamonaviy mehmonxona. 2015-yildan beri xizmatda.
            </p>
            <div className="flex gap-3">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z" />
                </svg>
              </a>
              {/* Telegram */}
              <a href="https://t.me/ferghanahotel" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 496 512">
                  <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Aloqa
            </h4>
            <div className="space-y-4">
              <a href="tel:+998732445566" className="flex items-start gap-3 text-white/50 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-green-400 transition-colors" />
                <span className="text-sm">+998 73 244 55 66</span>
              </a>
              <a href="mailto:info@ferghanahotel.uz" className="flex items-start gap-3 text-white/50 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm">info@ferghanahotel.uz</span>
              </a>
              <div className="flex items-start gap-3 text-white/50">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="text-sm">Farg'ona sh., Mustaqillik ko'chasi, 123-uy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2025 RIVR Hotel. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-white text-sm transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="text-white/30 hover:text-white text-sm transition-colors">Foydalanish shartlari</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
