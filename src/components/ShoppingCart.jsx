import { useState, useEffect } from 'react';

const ShoppingCart = ({ cart, onRemoveItem, onUpdateQuantity, onClearCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  useEffect(() => {
    if (cart.length > 0) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [cart.length]);

  return (
    <>
      {/* Botón flotante del carrito */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl flex items-center justify-center transition-korean hover:scale-110 z-40 ${
          isAnimating ? 'animate-pulse-soft' : ''
        }`}
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-text-white)',
        }}
      >
        <div className="relative">
          <span className="text-2xl">🛒</span>
          {totalItems > 0 && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold animate-fade-in-up"
              style={{
                backgroundColor: 'var(--color-accent-yellow)',
                color: 'var(--color-text-primary)',
              }}
            >
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Panel del carrito */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 transform transition-korean ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-korean border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Tu Pedido
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-korean hover:scale-110"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              ✕
            </button>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Tu carrito está vacío
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Agrega productos para empezar tu pedido
              </p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedSize.name}-${index}`}
                className="card-korean p-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${item.color}30` }}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                      {item.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.selectedSize.name}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm transition-korean hover:scale-110"
                        style={{ backgroundColor: 'var(--color-primary-light)' }}
                      >
                        −
                      </button>
                      <span className="text-sm font-bold min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm transition-korean hover:scale-110"
                        style={{ backgroundColor: 'var(--color-primary-light)' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg" style={{ color: item.color }}>
                      Q{item.totalPrice.toFixed(2)}
                    </p>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-xs mt-1 hover:underline"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer con total y acciones */}
        {cart.length > 0 && (
          <div className="p-6 border-t space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Total
              </span>
              <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                Q{totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => alert('Función de checkout próximamente!')}
              className="w-full btn-korean btn-primary py-3 text-lg font-bold"
            >
              Realizar Pedido 🚀
            </button>

            <button
              onClick={onClearCart}
              className="w-full py-2 text-sm transition-korean hover:underline"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-korean"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ShoppingCart;
