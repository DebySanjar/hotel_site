import hotelImg from '../../assets/hotel.jpg';

export default function CtaDashboardMock() {
  return (
    <div className="w-full max-w-[1100px] mx-auto relative" style={{ aspectRatio: '16/9' }}>
      {/* Rasm - chetlari tarqalgan (spread) */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          boxShadow: '0 0 80px 40px rgba(20,25,30,0.85)',
        }}
      >
        <img
          src={hotelImg}
          alt="Hotel"
          className="w-full h-full object-cover scale-110"
          style={{ filter: 'brightness(0.85)' }}
        />
        {/* Chet qoraytirish - vignette */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,15,20,0.85) 100%)',
          }}
        />
        {/* 3D GreenHotel overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-10">
          <h2
            className="font-black uppercase leading-none select-none text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              color: '#ffffffff',
              textShadow: `2px 2px 0 #1a5c1a, 4px 4px 0 #144d14, 6px 6px 0 #0e3d0e, 8px 8px 12px rgba(0,0,0,0.9)`,
              transform: 'perspective(500px) rotateX(10deg)',
              transformOrigin: 'bottom center',
              letterSpacing: '-0.02em',
            }}
          >
            Green Hotel
          </h2>
        </div>
      </div>
    </div>
  );
}
