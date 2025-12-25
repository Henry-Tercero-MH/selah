import { useState, useEffect } from 'react';
import PromoBar from './components/PromoBar';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MenuGrid from './components/MenuGrid';
import ReferralProgram from './components/ReferralProgram';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import ShoppingCart from './components/ShoppingCart';
import LoyaltyProgram from './components/LoyaltyProgram';
import Toast from './components/Toast';
import AdminPanel from './components/AdminPanel';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import { FaCog } from 'react-icons/fa';

function App() {
  // Cargar productos desde Google Sheets con fallback a datos locales
  const { products, loading, error, usingLocal } = useGoogleSheets();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
  const [showAdmin, setShowAdmin] = useState(false);
  const [localProducts, setLocalProducts] = useState([]);

  // Cargar carrito del localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('selahCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('selahCart', JSON.stringify(cart));
  }, [cart]);

  // Sincronizar productos locales con productos de Google Sheets
  useEffect(() => {
    if (products && products.length > 0) {
      setLocalProducts(products);
      setFilteredItems(products);
    }
  }, [products]);

  // Filtrar productos en tiempo real
  useEffect(() => {
    const productsToFilter = localProducts.length > 0 ? localProducts : products;
    if (!productsToFilter || productsToFilter.length === 0) return;

    if (searchTerm === '') {
      setFilteredItems(productsToFilter);
    } else {
      const filtered = productsToFilter.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
          (item.popular && searchLower.includes('popular'))
        );
      });
      setFilteredItems(filtered);
    }
  }, [searchTerm, products, localProducts]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleOpenModal = (item) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    showToast(`${product.name} agregado al carrito`, 'success');
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    showToast('Producto eliminado', 'info');
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    newCart[index].totalPrice = newCart[index].selectedSize.price * newQuantity;
    setCart(newCart);
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Carrito vaciado', 'info');
  };

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  const handleProductsChange = (updatedProducts, action, product) => {
    // Actualizar productos localmente
    setLocalProducts(updatedProducts);

    // Guardar en localStorage como backup
    localStorage.setItem('selahProducts', JSON.stringify(updatedProducts));

    // Mostrar mensaje de éxito
    if (action === 'add') {
      showToast(`Producto "${product.name}" agregado exitosamente`, 'success');
    } else if (action === 'update') {
      showToast(`Producto "${product.name}" actualizado`, 'success');
    } else if (action === 'delete') {
      showToast('Producto eliminado', 'info');
    }

    // TODO: Aquí se sincronizaría con Google Sheets
    // En la versión actual, los cambios solo se guardan localmente
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Indicador de estado de carga */}
      {loading && (
        <div className="fixed top-20 right-4 z-50 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Cargando productos...</span>
        </div>
      )}

      {/* Indicador de fuente de datos */}
      {!loading && usingLocal && (
        <div className="fixed top-20 right-4 z-40 bg-yellow-50 px-3 py-2 rounded-full shadow-md flex items-center gap-2 text-xs">
          <span style={{ color: 'var(--color-text-secondary)' }}>📋 Usando datos locales</span>
        </div>
      )}

      {!loading && !usingLocal && (
        <div className="fixed top-20 right-4 z-40 bg-green-50 px-3 py-2 rounded-full shadow-md flex items-center gap-2 text-xs">
          <span className="text-green-700">✓ Conectado a Google Sheets</span>
        </div>
      )}

      {/* Error de conexión */}
      {error && (
        <div className="fixed top-32 right-4 z-40 bg-red-50 px-3 py-2 rounded-lg shadow-md max-w-xs">
          <p className="text-xs text-red-700">⚠️ {error}</p>
        </div>
      )}

      {/* Barra de promociones */}
      <PromoBar />

      <Header />

      <SearchBar
        onSearch={handleSearch}
        totalItems={filteredItems.length}
      />

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            No encontramos resultados
          </h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Intenta con otra búsqueda
          </p>
        </div>
      ) : (
        <>
          <MenuGrid
            items={filteredItems}
            onItemClick={handleOpenModal}
          />

          {/* Programa de referidos */}
          <ReferralProgram />
        </>
      )}

      <Footer />

      <ProductModal
        item={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      <ShoppingCart
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Programa de lealtad */}
      <LoyaltyProgram />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Botón flotante de administración */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center z-40"
        title="Panel de Administración"
      >
        <FaCog size={24} />
      </button>

      {/* Panel de administración */}
      {showAdmin && (
        <AdminPanel
          products={localProducts.length > 0 ? localProducts : products}
          onProductsChange={handleProductsChange}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}

export default App;
