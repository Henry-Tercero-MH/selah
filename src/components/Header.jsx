const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-korean backdrop-blur-md shadow-korean">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <div className="mb-2">
            <p className="text-sm md:text-base font-medium mb-1 tracking-widest uppercase animate-fade-in-up" style={{ color: 'var(--color-text-secondary)' }}>
              Cafetería
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-pink mb-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              SELAH
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold animate-fade-in-up" style={{ color: 'var(--color-text-primary)', animationDelay: '0.2s' }}>
              Deliciosos Licuados
            </h2>
          </div>
          <p className="text-sm md:text-base animate-fade-in-up" style={{ color: 'var(--color-text-secondary)', animationDelay: '0.3s' }}>
            Sabores frescos y naturales ☕
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 animate-float">
          <span className="text-4xl">🍓</span>
        </div>
        <div className="absolute top-4 right-4 animate-float" style={{ animationDelay: '0.5s' }}>
          <span className="text-4xl">🍍</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
