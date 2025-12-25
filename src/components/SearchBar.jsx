import { useState } from 'react';

const SearchBar = ({ onSearch, totalItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 px-4">
      <div
        className={`relative transition-korean ${isFocused ? 'transform scale-105' : ''}`}
      >
        {/* Icono de búsqueda */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl transition-korean">
          {isFocused || searchTerm ? '🔍' : '🥤'}
        </div>

        {/* Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Busca tu licuado favorito..."
          className="w-full py-4 pl-14 pr-14 text-lg rounded-full shadow-korean transition-korean focus:shadow-xl focus:outline-none"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            color: 'var(--color-text-primary)',
            border: isFocused ? '2px solid var(--color-primary)' : '2px solid transparent',
          }}
        />

        {/* Botón de limpiar */}
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-korean hover:scale-110 animate-fade-in-up"
            style={{ backgroundColor: 'var(--color-primary-light)' }}
          >
            ✕
          </button>
        )}

        {/* Indicador de resultados */}
        {searchTerm && (
          <div
            className="absolute -bottom-8 left-0 text-sm animate-fade-in-up"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {totalItems} {totalItems === 1 ? 'resultado' : 'resultados'} encontrados
          </div>
        )}
      </div>

      {/* Atajos de búsqueda */}
      {!searchTerm && !isFocused && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center animate-fade-in-up">
          {['Popular', 'Frutal', 'Cremoso', 'Energético'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchTerm(tag.toLowerCase());
                onSearch(tag.toLowerCase());
              }}
              className="px-4 py-2 rounded-full text-sm font-medium transition-korean hover:scale-105"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-text-primary)',
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
