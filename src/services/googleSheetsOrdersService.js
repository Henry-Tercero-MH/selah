/**
 * Servicio para manejar pedidos en Google Sheets
 * Conecta el Dashboard con datos reales en lugar de localStorage
 */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwUvsujaFKRy6WfRo-fNkDPT9_2hH3qrGIb6HzEqG9Jk6ZCRMGfEXw_cKNzT9UMDHv7rg/exec';

/**
 * Guardar pedido en Google Sheets
 */
export const saveOrderToSheets = async (order) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addOrder',
        order: order
      })
    });

    // Con mode: 'no-cors' no podemos leer la respuesta
    // Asumimos éxito si no hay error
    console.log('✅ Pedido guardado en Google Sheets:', order.id);
    return { success: true };

  } catch (error) {
    console.error('❌ Error al guardar pedido en Sheets:', error);
    throw error;
  }
};

/**
 * Obtener pedidos desde Google Sheets
 */
export const getOrdersFromSheets = async () => {
  try {
    const url = `${APPS_SCRIPT_URL}?action=getOrders&timestamp=${Date.now()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (data.success && data.orders) {
      console.log(`✅ ${data.orders.length} pedidos cargados desde Google Sheets`);
      return data.orders;
    } else {
      throw new Error('No se pudieron cargar los pedidos');
    }

  } catch (error) {
    console.error('❌ Error al obtener pedidos de Sheets:', error);
    // Retornar array vacío en lugar de lanzar error
    // para que la app funcione con localStorage como fallback
    return null;
  }
};

/**
 * Sincronizar pedidos locales con Google Sheets
 */
export const syncLocalOrdersToSheets = async () => {
  try {
    const localOrders = localStorage.getItem('selahOrders');

    if (!localOrders) {
      console.log('No hay pedidos locales para sincronizar');
      return { synced: 0 };
    }

    const orders = JSON.parse(localOrders);
    let syncedCount = 0;

    // Enviar cada pedido individual
    for (const order of orders) {
      try {
        await saveOrderToSheets(order);
        syncedCount++;
        // Pequeña pausa para no saturar
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Error sincronizando pedido ${order.id}:`, error);
      }
    }

    console.log(`✅ ${syncedCount} de ${orders.length} pedidos sincronizados`);
    return { synced: syncedCount, total: orders.length };

  } catch (error) {
    console.error('Error en sincronización:', error);
    throw error;
  }
};
