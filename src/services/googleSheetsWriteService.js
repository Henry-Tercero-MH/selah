/**
 * Servicio para ESCRIBIR datos en Google Sheets
 *
 * IMPORTANTE: Para escribir en Google Sheets necesitas:
 * 1. Usar OAuth 2.0 (más complejo) O
 * 2. Usar Google Apps Script como API intermedia (más simple)
 *
 * Esta implementación usa Google Apps Script como backend
 */

// URL de tu Google Apps Script Web App
// ✅ CONFIGURADO: Apps Script desplegado y listo
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwUvsujaFKRy6WfRo-fNkDPT9_2hH3qrGIb6HzEqG9Jk6ZCRMGfEXw_cKNzT9UMDHv7rg/exec';

/**
 * Agregar un nuevo producto a Google Sheets
 */
export const addProductToSheets = async (product) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Necesario para Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addProduct',
        product: formatProductForSheet(product)
      })
    });

    // Con mode: 'no-cors' no podemos leer la respuesta
    // Asumimos éxito si no hay error
    return { success: true };

  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw new Error('No se pudo agregar el producto a Google Sheets');
  }
};

/**
 * Actualizar un producto existente en Google Sheets
 */
export const updateProductInSheets = async (productId, updatedProduct) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updateProduct',
        productId,
        product: formatProductForSheet(updatedProduct)
      })
    });

    return { success: true };

  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw new Error('No se pudo actualizar el producto');
  }
};

/**
 * Eliminar un producto de Google Sheets
 */
export const deleteProductFromSheets = async (productId) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'deleteProduct',
        productId
      })
    });

    return { success: true };

  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw new Error('No se pudo eliminar el producto');
  }
};

/**
 * Formatear producto para Google Sheets
 * Convierte el objeto producto a un array que coincide con las columnas
 */
function formatProductForSheet(product) {
  return [
    product.id,
    product.name,
    product.category,
    product.price,
    product.currency || 'Q',
    product.description,
    product.longDescription,
    product.image,
    product.color,
    product.icon,
    product.popular ? 'true' : 'false',
    product.calories,
    product.prepTime,
    JSON.stringify(product.ingredients || []),
    JSON.stringify(product.tags || []),
    JSON.stringify(product.sizes || [])
  ];
}

/**
 * Obtener el siguiente ID disponible
 */
export const getNextProductId = async (products) => {
  if (!products || products.length === 0) return 1;

  const maxId = Math.max(...products.map(p => p.id || 0));
  return maxId + 1;
};
