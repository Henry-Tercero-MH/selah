/**
 * Generar datos de muestra para el dashboard
 * Esto permite ver el dashboard funcionando desde el principio
 */

import { saveOrder } from '../services/analyticsService';
import { subDays, subHours } from 'date-fns';

export const generateSampleOrders = () => {
  // Productos de ejemplo
  const sampleProducts = [
    {
      id: 1,
      name: 'Licuado de Fresa',
      category: 'licuados',
      price: 15.00,
      color: '#D84315',
      icon: '🍓'
    },
    {
      id: 8,
      name: 'Café',
      category: 'cafe',
      price: 8.00,
      color: '#6D4C41',
      icon: '☕'
    },
    {
      id: 9,
      name: 'Café con Leche',
      category: 'cafe',
      price: 10.00,
      color: '#8D6E63',
      icon: '☕'
    },
    {
      id: 10,
      name: 'Nachos',
      category: 'comida',
      price: 25.00,
      color: '#FFA500',
      icon: '🌮'
    },
    {
      id: 14,
      name: 'Crepas',
      category: 'postres',
      price: 22.00,
      color: '#F4A460',
      icon: '🥞'
    }
  ];

  const orders = [];
  const now = new Date();

  // Generar pedidos de los últimos 30 días
  for (let day = 29; day >= 0; day--) {
    const ordersPerDay = Math.floor(Math.random() * 5) + 3; // 3-7 pedidos por día

    for (let order = 0; order < ordersPerDay; order++) {
      // Hora aleatoria pero concentrada en horarios de cafetería (7am - 8pm)
      const hour = Math.floor(Math.random() * 13) + 7; // 7-19
      const orderDate = subHours(subDays(now, day), 24 - hour);

      // 1-3 productos por pedido
      const itemCount = Math.floor(Math.random() * 3) + 1;
      const cart = [];
      let total = 0;

      for (let i = 0; i < itemCount; i++) {
        const product = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
        const quantity = Math.floor(Math.random() * 2) + 1; // 1-2 unidades
        const itemTotal = product.price * quantity;

        cart.push({
          ...product,
          quantity,
          totalPrice: itemTotal,
          selectedSize: { name: 'Regular', price: product.price }
        });

        total += itemTotal;
      }

      // Crear objeto de pedido manual (sin llamar a saveOrder para controlar la fecha)
      orders.push({
        id: `ORD-${orderDate.getTime()}-${Math.floor(Math.random() * 10000)}`,
        items: cart,
        total: total,
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        timestamp: orderDate.toISOString(),
        date: orderDate.toISOString().split('T')[0],
        time: orderDate.toTimeString().split(' ')[0],
        hour: orderDate.getHours(),
        dayOfWeek: orderDate.getDay(),
        status: 'completed'
      });
    }
  }

  // Guardar en localStorage
  localStorage.setItem('selahOrders', JSON.stringify(orders));

  return {
    count: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
  };
};

/**
 * Verificar si ya existen datos
 */
export const hasSampleData = () => {
  const orders = localStorage.getItem('selahOrders');
  return orders && JSON.parse(orders).length > 0;
};

/**
 * Limpiar datos de muestra
 */
export const clearSampleData = () => {
  localStorage.removeItem('selahOrders');
};
