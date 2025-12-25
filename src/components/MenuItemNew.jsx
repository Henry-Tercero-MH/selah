import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import { FaStar, FaFire, FaClock } from 'react-icons/fa';

const MenuItem = ({ item, index, onClick }) => {
  // Obtener el ícono dinámicamente
  const Icon = FaIcons[item.icon] || FaIcons.FaCocktail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -8,
        boxShadow: '0 12px 32px rgba(92, 64, 51, 0.2)',
        transition: { duration: 0.3 }
      }}
      className="card-korean relative overflow-hidden cursor-pointer group"
      style={{
        borderTop: `4px solid ${item.color}`
      }}
      onClick={onClick}
    >
      {/* Badge de Popular */}
      {item.popular && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
          className="absolute top-4 right-4 bg-gradient-korean px-3 py-1 rounded-full shadow-md flex items-center gap-1"
        >
          <FaStar className="text-yellow-500" size={12} />
          <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Popular
          </span>
        </motion.div>
      )}

      {/* Imagen del producto */}
      <div className="relative h-56 overflow-hidden rounded-lg mb-4 -mx-4 -mt-4">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        />
        {/* Icono del producto sobre la imagen */}
        <motion.div
          className="absolute bottom-3 right-3 w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
          style={{ backgroundColor: `${item.color}` }}
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="text-white" size={26} />
        </motion.div>
      </div>

      {/* Contenido */}
      <div className="px-4 pb-4">
        {/* Nombre del producto */}
        <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          {item.name}
        </h3>

        {/* Info rápida */}
        <div className="flex items-center gap-4 mb-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          <div className="flex items-center gap-1">
            <FaClock size={12} />
            <span>{item.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaFire size={12} />
            <span>{item.calories} cal</span>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-sm md:text-base mb-3 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 3).map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 + i * 0.05 }}
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: `${item.color}20`,
                  color: 'var(--color-text-secondary)',
                }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* Precio y botón */}
        <div className="flex items-center justify-between mt-4">
          <motion.div
            className="flex items-baseline gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <span
              className="text-3xl md:text-4xl font-bold"
              style={{ color: item.color }}
            >
              {item.currency}{item.price.toFixed(2)}
            </span>
          </motion.div>

          {/* Botón de ver más */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-korean btn-primary px-6 py-2 text-sm md:text-base flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Ver más
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, ${item.color}, transparent)`
        }}
      />
    </motion.div>
  );
};

export default MenuItem;
