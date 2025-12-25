import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaSave } from 'react-icons/fa';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    category: 'licuados',
    price: 0,
    currency: 'Q',
    description: '',
    longDescription: '',
    image: '',
    color: '#5D4037',
    icon: 'FaCocktail',
    popular: false,
    calories: 0,
    prepTime: '5 min',
    ingredients: [],
    tags: [],
    sizes: []
  });

  const [ingredientsText, setIngredientsText] = useState(
    product?.ingredients?.join(', ') || ''
  );
  const [tagsText, setTagsText] = useState(
    product?.tags?.join(', ') || ''
  );

  const categories = [
    { id: 'licuados', name: 'Licuados' },
    { id: 'cafe', name: 'Café' },
    { id: 'comida', name: 'Comida' },
    { id: 'postres', name: 'Postres' }
  ];

  const icons = [
    'FaCocktail', 'FaCoffee', 'FaMugHot', 'FaStrawberry',
    'FaLeaf', 'FaSeedling', 'FaAppleAlt', 'FaLemon',
    'FaPizzaSlice', 'FaHamburger', 'FaCheese', 'FaIceCream'
  ];

  const colors = [
    { name: 'Terracota', value: '#D84315' },
    { name: 'Naranja', value: '#FF6F00' },
    { name: 'Verde', value: '#7CB342' },
    { name: 'Ámbar', value: '#FFA000' },
    { name: 'Amarillo', value: '#FFB300' },
    { name: 'Café Oscuro', value: '#5D4037' },
    { name: 'Café Medio', value: '#6D4C41' },
    { name: 'Café Claro', value: '#8D6E63' },
    { name: 'Púrpura', value: '#8E24AA' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convertir strings a arrays
    const ingredients = ingredientsText
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const tags = tagsText
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    // Crear sizes por defecto
    const sizes = [
      { name: 'Regular', price: parseFloat(formData.price) },
      { name: 'Grande', price: parseFloat(formData.price) + 3 }
    ];

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      calories: parseInt(formData.calories),
      ingredients,
      tags,
      sizes
    };

    onSave(productData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar flotante (muy visible) */}
        <button
          onClick={onCancel}
          className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-2xl transition-all hover:scale-110 z-10"
          title="Cerrar formulario"
        >
          <FaTimes size={18} />
        </button>

        {/* Header */}
        <div className="bg-primary text-white p-4 sm:p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl sm:text-2xl font-bold">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <div className="w-10"></div> {/* Spacer para balance visual */}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
                placeholder="Ej: Licuado de Fresa"
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Categoría *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Precio (Q) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
                placeholder="15.00"
              />
            </div>

            {/* Descripción corta */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Descripción Corta *
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
                placeholder="Delicioso licuado de fresa fresca"
              />
            </div>

            {/* Descripción larga */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Descripción Larga
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
                placeholder="Descripción detallada del producto..."
              />
            </div>

            {/* URL de Imagen */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                URL de Imagen *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
                placeholder="https://images.unsplash.com/..."
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Color *
              </label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
              >
                {colors.map(c => (
                  <option key={c.value} value={c.value}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div
                className="mt-2 w-full h-8 rounded-lg"
                style={{ backgroundColor: formData.color }}
              />
            </div>

            {/* Icono */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Icono *
              </label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
              >
                {icons.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>

            {/* Calorías */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Calorías
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
                placeholder="180"
              />
            </div>

            {/* Tiempo de preparación */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Tiempo de Preparación
              </label>
              <input
                type="text"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
                placeholder="5 min"
              />
            </div>

            {/* Ingredientes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Ingredientes (separados por coma)
              </label>
              <input
                type="text"
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
                placeholder="Fresas frescas, Leche, Azúcar, Hielo"
              />
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Tags (separados por coma)
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
                placeholder="frutal, cremoso, vitaminas"
              />
            </div>

            {/* Popular */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="popular"
                  checked={formData.popular}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Producto Popular
                </span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'var(--color-accent)', color: 'var(--color-text-secondary)' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 btn-korean btn-primary px-6 py-3 flex items-center justify-center gap-2"
            >
              <FaSave />
              {product ? 'Actualizar' : 'Crear'} Producto
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProductForm;
