const MenuItem = ({ item, index, onClick }) => {
  return (
    <div
      className="card-korean hover-lift animate-fade-in-up relative overflow-hidden cursor-pointer group"
      style={{
        animationDelay: `${index * 0.1}s`,
        borderTop: `4px solid ${item.color}`
      }}
      onClick={onClick}
    >
      {/* Badge de Popular */}
      {item.popular && (
        <div className="absolute top-4 right-4 bg-gradient-korean px-3 py-1 rounded-full shadow-md">
          <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
            ⭐ Popular
          </span>
        </div>
      )}

      {/* Icono del producto */}
      <div className="flex items-start gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-md flex-shrink-0"
          style={{ backgroundColor: item.color + '30' }}
        >
          {item.icon}
        </div>

        <div className="flex-1">
          {/* Nombre del producto */}
          <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            {item.name}
          </h3>

          {/* Descripción */}
          <p className="text-sm md:text-base mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            {item.description}
          </p>

          {/* Tags */}
          {item.tags && (
            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Precio */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: item.color }}
              >
                {item.currency}{item.price.toFixed(2)}
              </span>
            </div>

            {/* Botón de orden */}
            <button
              className="btn-korean btn-primary px-6 py-2 text-sm md:text-base group-hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              Ver más →
            </button>
          </div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute bottom-0 right-0 opacity-10 text-6xl" style={{ color: item.color }}>
        •••
      </div>
    </div>
  );
};

export default MenuItem;
