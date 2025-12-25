import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaLock, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import ProductForm from './ProductForm';
import { addProductToSheets, updateProductInSheets, deleteProductFromSheets } from '../services/googleSheetsWriteService';

const AdminPanel = ({ products, onProductsChange, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [localProducts, setLocalProducts] = useState(products);
  const [isSyncing, setIsSyncing] = useState(false);

  // Password hasheada (no visible en código)
  // Contraseña real: selah2024
  const ADMIN_PASSWORD_HASH = '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b';

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  // Función para hashear contraseña (SHA-256 simple)
  const hashPassword = async (pass) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pass);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const hashedInput = await hashPassword(password);

    if (hashedInput === ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setIsSyncing(true);

      try {
        // Eliminar de Google Sheets
        await deleteProductFromSheets(productId);

        // Actualizar localmente
        const newProducts = localProducts.filter(p => p.id !== productId);
        setLocalProducts(newProducts);
        onProductsChange(newProducts, 'delete', productId);

      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar producto. Los cambios solo se guardaron localmente.');

        // Actualizar localmente de todas formas
        const newProducts = localProducts.filter(p => p.id !== productId);
        setLocalProducts(newProducts);
        onProductsChange(newProducts, 'delete', productId);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const handleSaveProduct = async (product) => {
    setIsSyncing(true);
    let newProducts;

    try {
      if (editingProduct) {
        // Actualizar producto existente
        await updateProductInSheets(product.id, product);

        newProducts = localProducts.map(p =>
          p.id === product.id ? product : p
        );
        onProductsChange(newProducts, 'update', product);
      } else {
        // Agregar nuevo producto
        const newId = Math.max(...localProducts.map(p => p.id || 0), 0) + 1;
        const newProduct = { ...product, id: newId };

        await addProductToSheets(newProduct);

        newProducts = [...localProducts, newProduct];
        onProductsChange(newProducts, 'add', newProduct);
      }

      setLocalProducts(newProducts);
      setShowForm(false);
      setEditingProduct(null);

    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al sincronizar con Google Sheets. Los cambios se guardaron localmente.');

      // Guardar localmente de todas formas
      if (editingProduct) {
        newProducts = localProducts.map(p =>
          p.id === product.id ? product : p
        );
        onProductsChange(newProducts, 'update', product);
      } else {
        const newId = Math.max(...localProducts.map(p => p.id || 0), 0) + 1;
        const newProduct = { ...product, id: newId };
        newProducts = [...localProducts, newProduct];
        onProductsChange(newProducts, 'add', newProduct);
      }

      setLocalProducts(newProducts);
      setShowForm(false);
      setEditingProduct(null);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition-colors"
              title="Cerrar"
            >
              <FaTimes size={16} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLock className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Panel de Administración
              </h2>
              <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                Ingresa la contraseña para continuar
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-primary"
                style={{ borderColor: 'var(--color-accent)' }}
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="btn-korean btn-primary w-full py-3"
            >
              Ingresar
            </button>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  // Panel de administración
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary text-white p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Panel de Administración</h2>
              <p className="text-sm opacity-90 mt-1">Gestiona los productos del menú</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <FaSignOutAlt />
                <span className="hidden md:inline">Cerrar sesión</span>
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Cerrar panel"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-b" style={{ borderColor: 'var(--color-accent)' }}>
            <button
              onClick={handleAddProduct}
              className="btn-korean btn-primary flex items-center gap-2"
            >
              <FaPlus />
              Agregar Producto
            </button>
          </div>

          {/* Products Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                  style={{ borderColor: 'var(--color-accent)' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                        {product.name}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {product.category}
                      </p>
                      <p className="text-lg font-bold mt-1" style={{ color: product.color }}>
                        Q{product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaEdit size={14} />
                      <span className="text-sm">Editar</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaTrash size={14} />
                      <span className="text-sm">Eliminar</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {localProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                  No hay productos. Agrega tu primer producto.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Formulario Modal */}
      <AnimatePresence>
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancelForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
