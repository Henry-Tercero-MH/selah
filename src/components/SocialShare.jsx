const SocialShare = ({ product }) => {
  const shareText = `¡Mira este delicioso ${product.name} de SELAH Cafetería! 🥤`;
  const shareUrl = window.location.href;

  const shareButtons = [
    {
      name: 'WhatsApp',
      icon: '💬',
      color: '#25D366',
      onClick: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: '👍',
      color: '#1877F2',
      onClick: () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(fbUrl, '_blank');
      }
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: '#1DA1F2',
      onClick: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank');
      }
    },
    {
      name: 'Copiar',
      icon: '📋',
      color: 'var(--color-primary)',
      onClick: () => {
        navigator.clipboard.writeText(shareUrl);
        alert('¡Enlace copiado!');
      }
    }
  ];

  return (
    <div className="mt-4">
      <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
        Compartir con amigos:
      </h4>
      <div className="flex gap-2">
        {shareButtons.map((button) => (
          <button
            key={button.name}
            onClick={button.onClick}
            className="flex-1 py-2 px-3 rounded-lg transition-korean hover:scale-105 text-white text-sm font-medium"
            style={{ backgroundColor: button.color }}
            title={button.name}
          >
            <span className="text-lg">{button.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
