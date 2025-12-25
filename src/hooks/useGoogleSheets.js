import { useState, useEffect } from 'react';
import { fetchProductsFromSheets } from '../services/googleSheetsService';
import productsDataLocal from '../data/products.json';

/**
 * Hook personalizado para cargar productos desde Google Sheets
 * con fallback a datos locales
 */
export const useGoogleSheets = () => {
  const [data, setData] = useState({
    categories: productsDataLocal.categories,
    products: productsDataLocal.products
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingLocal, setUsingLocal] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const sheetsData = await fetchProductsFromSheets();

      if (sheetsData && sheetsData.products.length > 0) {
        // Datos cargados exitosamente desde Google Sheets
        setData(sheetsData);
        setUsingLocal(false);
        console.log('✅ Productos cargados desde Google Sheets');
      } else {
        // Usar datos locales como fallback
        setData({
          categories: productsDataLocal.categories,
          products: productsDataLocal.products
        });
        setUsingLocal(true);
        console.log('⚠️ Usando datos locales (Google Sheets no disponible)');
      }
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError(err.message);
      // Usar datos locales en caso de error
      setData({
        categories: productsDataLocal.categories,
        products: productsDataLocal.products
      });
      setUsingLocal(true);
    } finally {
      setLoading(false);
    }
  };

  // Función para recargar datos manualmente
  const reload = () => {
    loadData();
  };

  return {
    categories: data.categories,
    products: data.products,
    loading,
    error,
    usingLocal,
    reload
  };
};
