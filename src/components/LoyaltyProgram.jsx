import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const LoyaltyProgram = () => {
  const [points, setPoints] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const pointsToReward = 100;
  const progress = (points / pointsToReward) * 100;

  useEffect(() => {
    const savedPoints = localStorage.getItem('selahPoints');
    if (savedPoints) {
      setPoints(parseInt(savedPoints));
    }
  }, []);

  const addPoints = (amount) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    localStorage.setItem('selahPoints', newPoints.toString());

    if (newPoints >= pointsToReward) {
      alert('🎉 ¡Felicidades! Has ganado un licuado gratis');
      setPoints(newPoints - pointsToReward);
      localStorage.setItem('selahPoints', (newPoints - pointsToReward).toString());
    }
  };

  return (
    <>
      {/* Botón flotante de puntos */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-xl flex flex-col items-center justify-center transition-korean hover:scale-110 z-40"
        style={{
          backgroundColor: 'var(--color-secondary)',
          color: 'var(--color-text-white)',
        }}
      >
        <span className="text-xl">⭐</span>
        <span className="text-xs font-bold">{points}</span>
      </button>

      {/* Panel de programa de lealtad */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: 'var(--color-bg-card)' }}
          >
            {/* Botón de cerrar flotante */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-2xl transition-all hover:scale-110 z-10"
              title="Cerrar"
            >
              <FaTimes size={18} />
            </button>

            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⭐</div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                Programa SELAH
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Acumula puntos y gana licuados gratis
              </p>
            </div>

            {/* Barra de progreso */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {points} puntos
                </span>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {pointsToReward - points} para el premio
                </span>
              </div>
              <div className="w-full h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-accent)' }}>
                <div
                  className="h-full transition-korean"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: 'var(--color-primary)',
                  }}
                />
              </div>
            </div>

            {/* Cómo funciona */}
            <div className="space-y-3 mb-6">
              <h3 className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                ¿Cómo funciona?
              </h3>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🛒</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    Compra licuados
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    Cada Q10 = 10 puntos
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    Canjea tus puntos
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    100 puntos = 1 licuado gratis
                  </p>
                </div>
              </div>
            </div>

            {/* Demo: Agregar puntos */}
            <button
              onClick={() => addPoints(10)}
              className="w-full btn-korean btn-primary py-3"
            >
              Simular compra (+10 pts)
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoyaltyProgram;
