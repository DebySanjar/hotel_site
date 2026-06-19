import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Gallereya', href: '#gallery', isRoute: false },
    { label: 'Haqimizda', href: '#about', isRoute: false },
    { label: 'Xizmatlar', href: '#services', isRoute: false },
    { label: 'Xonalar', href: '#projects', isRoute: false },
    { label: 'Blog', href: '/blog', isRoute: true },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof menuItems[0]) => {
    e.preventDefault();
    if (item.isRoute) {
      navigate(item.href);
    } else {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-10 w-full relative z-50">
      {/* Logo - Left Side */}
      <div className="flex-1">
        <span className="font-regular tracking-tighter text-xl md:text-2xl text-[rgba(30,50,90,0.9)] font-bold">
        NatureHotel
        </span>
      </div>

      {/* Center Menu - Desktop Only */}
      <ul className="hidden md:flex items-center gap-8 text-[rgb(45,45,45)] font-normal text-sm">
        {menuItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={(e) => handleNav(e, item)}
              className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right Side - Search + Button */}
      <div className="flex-1 flex justify-end items-center gap-3">
        {/* Search Icon */}
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Search className="w-5 h-5 text-[rgba(30,50,90,0.9)]" />
          </button>

          {/* Search Dropdown - Opens to the LEFT of icon */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 right-full mr-3 w-48 sm:w-56"
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Qidirish..."
                    autoFocus
                    className="w-full px-4 py-2 pr-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Backdrop to close search */}
          {isSearchOpen && (
            <div
              className="fixed inset-0 z-[-1]"
              onClick={() => setIsSearchOpen(false)}
            />
          )}
        </div>

        {/* Aloqa Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center bg-[rgba(30,50,90,0.8)] text-white rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 hover:bg-[rgba(30,50,90,1)] transition-colors group shadow-lg"
        >
          <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="text-xs md:text-sm font-normal">Aloqa</span>
        </motion.button>
      </div>
    </nav>
  );
}
