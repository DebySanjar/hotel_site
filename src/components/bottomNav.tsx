import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Images,
  Info,
  ConciergeBell,
  BedDouble,
  BookOpen,
} from 'lucide-react';

const menuItems = [
  { label: 'Gallereya', icon: Images, href: '#gallery', isRoute: false },
  { label: 'Haqimizda', icon: Info, href: '#about', isRoute: false },
  { label: 'Xizmatlar', icon: ConciergeBell, href: '#services', isRoute: false },
  { label: 'Xonalar', icon: BedDouble, href: '#projects', isRoute: false },
  { label: 'Blog', icon: BookOpen, href: '/blog', isRoute: true },
];

const StyledWrapper = styled.div`
  .nav-container {
    display: flex;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    align-items: center;
    justify-content: space-around;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 20px,
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    padding: 0 8px;
    border: 1px solid rgba(255, 255, 255, 0.25);
  }

  .nav-btn {
    outline: 0 !important;
    border: 0 !important;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    color: rgba(30, 50, 90, 0.7);
    transition: all ease-in-out 0.25s;
    cursor: pointer;
    padding: 10px 14px;
    border-radius: 14px;
    min-width: 52px;
  }

  .nav-btn:hover,
  .nav-btn.active {
    color: rgba(30, 50, 90, 1);
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }

  .nav-btn .label {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }
`;

export default function BottomNav() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState('');
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current + 5) {
        // Pastga scroll - yashir
        setVisible(false);
      } else if (currentY < lastScrollY.current - 5) {
        // Tepaga scroll - ko'rsat
        setVisible(true);
      }

      lastScrollY.current = currentY;

      // Jim turganda ham ko'rsat
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        setVisible(true);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  const handleNav = (item: typeof menuItems[0]) => {
    setActive(item.label);
    if (item.isRoute) {
      navigate(item.href);
    } else {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="fixed bottom-5 left-0 right-0 z-[200] flex justify-center px-4 md:hidden"
        >
          <StyledWrapper>
            <div className="nav-container">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`nav-btn ${active === item.label ? 'active' : ''}`}
                    onClick={() => handleNav(item)}
                  >
                    <Icon size={20} />
                    <span className="label">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </StyledWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
