import FadeIn from './FadeIn';

const services = [
  {
    number: '01',
    name: 'Luxury Xonalar',
    description:
      'Zamonaviy dizayn va qulayliklar bilan jihozlangan xonalarimiz har bir mehmonning ehtiyojlarini qondiradi. Wi-Fi, konditsioner, mini-bar va boshqa imkoniyatlar mavjud.',
  },
  {
    number: '02',
    name: 'Restoran va Kafelar',
    description:
      'Milliy va xalqaro oshxona taomlari, nonushtadan kechki ovqatgacha. Professional oshpazlarimiz eng mazali taomlarni tayyorlaydilar.',
  },
  {
    number: '03',
    name: 'Konferensiya Zallari',
    description:
      'Biznes uchrashuvlar, seminarlar va tadbirlar uchun zamonaviy jihozlar bilan ta\'minlangan keng konferensiya zallarimiz.',
  },
  {
    number: '04',
    name: 'Fitness va Spa',
    description:
      'Dam olish va sog\'liq uchun zamonaviy sport zali, sauna, hammom va professional massaj xizmatlari sizni kutmoqda.',
  },
  {
    number: '05',
    name: '24/7 Xizmat',
    description:
      'Mehmonlarimiz uchun 24 soat xizmat ko\'rsatamiz. Reception, xona xizmati, transport va boshqa qulayliklar doim sizning ixtiyoringizda.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-12 sm:py-16 md:py-20"
    >
      <h2
        className="hero-heading font-black uppercase text-center mb-10 sm:mb-12 md:mb-16"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)', fontFamily: "'Kanit', sans-serif" }}
      >
        Xizmatlar
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
              }}
            >
              {/* Number */}
              <div
                className="text-[#0C0C0C] font-black shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)', fontFamily: "'Kanit', sans-serif" }}
              >
                {service.number}
              </div>

              {/* Name & Description */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-[#0C0C0C] font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)', fontFamily: "'Kanit', sans-serif" }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', fontFamily: "'Kanit', sans-serif" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
