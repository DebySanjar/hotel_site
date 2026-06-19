import { motion } from 'motion/react';
import Navbar from './Navbar';
import HeroBadge from './HeroBadge';
import BottomLeftCard from './BottomLeftCard';
import BottomRightCorner from './BottomRightCorner';

export default function Hero() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
      <section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-white/10">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center"
          style={{ zIndex: 0 }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/5" style={{ zIndex: 1 }} />

        {/* Content Layer */}
        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {/* Navbar */}
          <Navbar />

          {/* Center Content */}
          <div className="absolute top-[20%] left-0 right-0 flex flex-col items-center px-6 text-center">
            <HeroBadge />
            
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal text-white mb-4 tracking-tight leading-[1.05] drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Xush kelibsiz Green Hotelga
            </motion.h1>
            
            <motion.p
              className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-xl font-normal drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Farg'ona vodiysining yuragida — zamonaviy qulayliklar, issiq mehmon kutish va unutilmas dam olish tajribasi sizni kutmoqda.
            </motion.p>
          </div>

          {/* Bottom Cards */}
          <BottomLeftCard />
          <BottomRightCorner />
        </div>
      </section>
    </div>
  );
}
