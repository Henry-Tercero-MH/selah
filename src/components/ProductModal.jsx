import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import SocialShare from './SocialShare';

const ProductModal = ({ item, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (item && item.sizes) {
      setSelectedSize(item.sizes[0]);
    }
  }, [item]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      setQuantity(1);
    }, 300);
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      selectedSize,
      quantity,
      totalPrice: selectedSize.price * quantity
    });
    handleClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-korean ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl transform transition-korean ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        {/* Header con icono grande */}
        <div
          className="relative p-8 rounded-t-3xl"
          style={{
            background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
          }}
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white shadow-xl transition-all hover:scale-110"
            title="Cerrar"
          >
            <FaTimes size={18} />
          </button>

          <div className="text-center">
            <div className="text-7xl mb-4 animate-float">{item.icon}</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              {item.name}
            </h2>
            {item.popular && (
              <span className="inline-block px-4 py-1 rounded-full text-sm font-bold bg-gradient-korean">
                ⭐ Popular
              </span>
            )}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-8 space-y-6">
          {/* Descripción larga */}
          <div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Descripción
            </h3>
            <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
              {item.longDescription}
            </p>
          </div>

          {/* Información nutricional */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-gradient-korean">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {item.prepTime}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Preparación
              </div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-korean">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {item.calories} cal
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Calorías
              </div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-korean">
              <div className="text-2xl mb-1">🌿</div>
              <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                100%
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Natural
              </div>
            </div>
          </div>

          {/* Ingredientes */}
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Ingredientes
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Selección de tamaño */}
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Tamaño
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {item.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size)}
                  className={`p-4 rounded-xl transition-korean hover:scale-105 ${
                    selectedSize?.name === size.name ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: selectedSize?.name === size.name ? `${item.color}30` : 'var(--color-bg-main)',
                    ringColor: item.color,
                  }}
                >
                  <div className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {size.name}
                  </div>
                  <div className="text-lg font-bold" style={{ color: item.color }}>
                    Q{size.price.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad */}
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Cantidad
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-korean hover:scale-110 shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                −
              </button>
              <span className="text-2xl font-bold min-w-[3rem] text-center" style={{ color: 'var(--color-text-primary)' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-korean hover:scale-110 shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                +
              </button>
            </div>
          </div>

          {/* Compartir en redes sociales */}
          <SocialShare product={item} />

          {/* Botón de agregar al carrito */}
          <button
            onClick={handleAddToCart}
            className="w-full btn-korean btn-primary py-4 text-lg font-bold flex items-center justify-between"
          >
            <span>Agregar al carrito</span>
            <span>Q{(selectedSize?.price * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
