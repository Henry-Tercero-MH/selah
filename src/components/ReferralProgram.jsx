import { useState } from 'react';

const ReferralProgram = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralCode = 'SELAH-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  const referralLink = `https://selah.cafe/?ref=${referralCode}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const message = `¡Prueba los deliciosos licuados de SELAH! 🥤\n\nUsa mi código ${referralCode} y obtén 20% de descuento en tu primera compra.\n\n${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="my-8 mx-4">
      <div
        className="card-korean p-6 max-w-2xl mx-auto cursor-pointer hover-lift"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: `linear-gradient(135deg, var(--color-primary)20, var(--color-secondary)20)`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🎁</div>
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                ¡Refiere amigos y gana!
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Ambos obtienen 20% de descuento
              </p>
            </div>
          </div>
          <div className="text-2xl">
            {isOpen ? '▼' : '▶'}
          </div>
        </div>

        {isOpen && (
          <div className="mt-6 space-y-4 animate-fade-in-up">
            {/* Tu código */}
            <div>
              <p className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Tu código de referido:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralCode}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-lg font-mono font-bold text-center"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-primary)',
                    border: '2px solid var(--color-primary)',
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyReferralLink();
                  }}
                  className="px-6 py-3 rounded-lg font-bold transition-korean hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text-white)',
                  }}
                >
                  {copied ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Cómo funciona */}
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                ¿Cómo funciona?
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span>1️⃣</span>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Comparte tu código con amigos
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span>2️⃣</span>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Ellos obtienen 20% en su primera compra
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span>3️⃣</span>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Tú recibes 20% en tu próxima compra
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de compartir */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                shareWhatsApp();
              }}
              className="w-full py-3 px-4 rounded-lg font-bold transition-korean hover:scale-105 flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#25D366',
                color: 'white',
              }}
            >
              <span className="text-xl">💬</span>
              Compartir por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralProgram;
