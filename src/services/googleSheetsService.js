/**
 * Servicio para conectar con Google Sheets
 *
 * Configuración necesaria:
 * 1. Ir a https://console.cloud.google.com/
 * 2. Crear un nuevo proyecto
 * 3. Habilitar Google Sheets API
 * 4. Crear credenciales (API Key)
 * 5. Hacer tu Google Sheet público o compartido
 */

const SHEET_ID = '10GzvoQx7mBNR_HFLSxvzFOBa5t-Zk77VRdilgHekS6Y'; // Google Sheet ID
const API_KEY = 'AIzaSyCeU5FqzwkFh0WD2ZMmPbfxKM1lx3PTGDc'; // Google API Key
const RANGE = 'Productos!A2:P'; // Rango de la hoja (A2 hasta columna P)

/**
 * Obtener productos desde Google Sheets
 */
export const fetchProductsFromSheets = async () => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      console.warn('No se encontraron datos en Google Sheets');
      return { categories: [], products: [] };
    }

    // Convertir filas de Google Sheets a formato de productos
    const products = data.values.map((row, index) => {
      // Parsear arrays de strings (ingredientes, tags, sizes)
      const parseArray = (str) => {
        if (!str) return [];
        try {
          return JSON.parse(str);
        } catch (e) {
          return str.split(',').map(item => item.trim());
        }
      };

      return {
        id: parseInt(row[0]) || index + 1,
        name: row[1] || '',
        category: row[2] || 'licuados',
        price: parseFloat(row[3]) || 0,
        currency: row[4] || 'Q',
        description: row[5] || '',
        longDescription: row[6] || '',
        image: row[7] || '',
        color: row[8] || '#5D4037',
        icon: row[9] || 'FaCocktail',
        popular: row[10]?.toLowerCase() === 'true' || row[10] === '1',
        calories: parseInt(row[11]) || 0,
        prepTime: row[12] || '5 min',
        ingredients: parseArray(row[13]),
        tags: parseArray(row[14]),
        sizes: row[15] ? parseArray(row[15]) : [
          { name: 'Regular', price: parseFloat(row[3]) || 0 }
        ]
      };
    });

    // Extraer categorías únicas
    const categoryMap = new Map();
    products.forEach(product => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, {
          id: product.category,
          name: getCategoryName(product.category),
          icon: getCategoryIcon(product.category),
          description: getCategoryDescription(product.category)
        });
      }
    });

    const categories = Array.from(categoryMap.values());

    return { categories, products };

  } catch (error) {
    console.error('Error al cargar desde Google Sheets:', error);
    // Retornar datos locales como fallback
    return null;
  }
};

/**
 * Helpers para generar información de categorías
 */
function getCategoryName(categoryId) {
  const names = {
    'licuados': 'Deliciosos Licuados',
    'cafe': 'Café & Bebidas Calientes',
    'comida': 'Alimentos',
    'postres': 'Postres & Dulces'
  };
  return names[categoryId] || categoryId;
}

function getCategoryIcon(categoryId) {
  const icons = {
    'licuados': 'FaCocktail',
    'cafe': 'FaCoffee',
    'comida': 'FaUtensils',
    'postres': 'FaIceCream'
  };
  return icons[categoryId] || 'FaCocktail';
}

function getCategoryDescription(categoryId) {
  const descriptions = {
    'licuados': 'Bebidas naturales y refrescantes',
    'cafe': 'Café recién hecho y especialidades',
    'comida': 'Antojitos y platillos deliciosos',
    'postres': 'Delicias dulces para consentirte'
  };
  return descriptions[categoryId] || '';
}

/**
 * Validar conexión con Google Sheets
 */
export const testSheetsConnection = async () => {
  try {
    const result = await fetchProductsFromSheets();
    return result !== null;
  } catch (error) {
    console.error('Error al probar conexión:', error);
    return false;
  }
};
