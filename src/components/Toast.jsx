import { useEffect } from 'react';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  const colors = {
    success: 'var(--color-melon)',
    error: 'var(--color-fresa)',
    info: 'var(--color-primary)',
    warning: 'var(--color-banana)',
  };

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
      <div
        className="px-6 py-4 rounded-full shadow-xl flex items-center gap-3 min-w-[200px] max-w-md"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          border: `2px solid ${colors[type]}`,
        }}
      >
        <span className="text-2xl">{icons[type]}</span>
        <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
          {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;
