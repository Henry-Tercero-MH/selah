const Footer = () => {
  return (
    <footer className="mt-16 py-8 bg-gradient-korean">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          {/* Logo o icono */}
          <div className="text-5xl animate-pulse-soft">
            ☕🍹
          </div>

          {/* Información */}
          <h3 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            SELAH
          </h3>
          <p className="text-lg md:text-xl font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Cafetería
          </p>

          <p className="text-sm md:text-base max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
            Disfruta de nuestros deliciosos licuados preparados con frutas frescas y naturales
          </p>

          {/* Horario */}
          <div className="mt-4 p-4 bg-white rounded-lg shadow-korean">
            <p className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              📍 Guatemala
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              🕐 Lunes a Domingo: 8:00 AM - 8:00 PM
            </p>
          </div>

          {/* Decorative */}
          <div className="flex gap-4 text-3xl mt-4">
            <span className="animate-float">🍓</span>
            <span className="animate-float" style={{ animationDelay: '0.3s' }}>🍌</span>
            <span className="animate-float" style={{ animationDelay: '0.6s' }}>🍍</span>
            <span className="animate-float" style={{ animationDelay: '0.9s' }}>🍈</span>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-pink-300 w-full max-w-2xl">
            <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>
              © 2024 SELAH - Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
