import { useState, useEffect } from 'react';

const PromoBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(0);

  const promos = [
    {
      id: 1,
      text: '🎉 ¡Primera compra con 15% de descuento! Usa código: SELAH15',
      type: 'discount',
      urgent: false
    },
    {
      id: 2,
      text: '⏰ OFERTA HOY: 2x1 en licuados hasta las 12pm',
      type: 'flash',
      urgent: true
    },
    {
      id: 3,
      text: '☕ Acumula puntos y gana licuados gratis - ¡Regístrate ahora!',
      type: 'loyalty',
      urgent: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [promos.length]);

  if (!isVisible) return null;

  const promo = promos[currentPromo];

  return (
    <div
      className={`w-full py-3 px-4 text-center relative overflow-hidden ${
        promo.urgent ? 'animate-pulse-soft' : ''
      }`}
      style={{
        backgroundColor: promo.urgent ? 'var(--color-secondary)' : 'var(--color-primary)',
        color: 'var(--color-text-white)',
      }}
    >
      <div className="container mx-auto flex items-center justify-center gap-2">
        <p className="text-sm md:text-base font-semibold animate-fade-in-up">
          {promo.text}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 w-6 h-6 rounded-full flex items-center justify-center transition-korean hover:scale-110"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          ✕
        </button>
      </div>

      {/* Indicadores de progreso */}
      <div className="flex justify-center gap-1 mt-2">
        {promos.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-8 rounded-full transition-korean ${
              index === currentPromo ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBar;
