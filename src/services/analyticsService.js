/**
 * Servicio de Analytics para SELAH Cafetería
 * Maneja tracking de pedidos, ventas y métricas de negocio
 */

import { format, startOfDay, endOfDay, subDays, isWithinInterval, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { getOrdersFromSheets } from './googleSheetsOrdersService';

const ORDERS_KEY = 'selahOrders';
const ANALYTICS_KEY = 'selahAnalytics';

/**
 * Guardar un nuevo pedido
 */
export const saveOrder = (cart, total) => {
  const orders = getOrdersSync(); // Usar versión sincrónica

  const newOrder = {
    id: generateOrderId(),
    items: cart,
    total: total,
    itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    timestamp: new Date().toISOString(),
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm:ss'),
    hour: new Date().getHours(),
    dayOfWeek: new Date().getDay(), // 0 = Domingo, 6 = Sábado
    status: 'completed'
  };

  orders.push(newOrder);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  return newOrder;
};

/**
 * Obtener todos los pedidos
 * Intenta cargar desde Google Sheets primero, luego localStorage
 */
export const getOrders = async () => {
  try {
    // Intentar cargar desde Google Sheets
    const sheetsOrders = await getOrdersFromSheets();

    if (sheetsOrders && sheetsOrders.length > 0) {
      // Actualizar localStorage con datos de Sheets (sincronización)
      localStorage.setItem(ORDERS_KEY, JSON.stringify(sheetsOrders));
      console.log(`✅ ${sheetsOrders.length} pedidos cargados desde Google Sheets`);
      return sheetsOrders;
    }
  } catch (error) {
    console.warn('⚠️ Error al cargar desde Sheets, usando localStorage:', error);
  }

  // Fallback a localStorage
  const orders = localStorage.getItem(ORDERS_KEY);
  return orders ? JSON.parse(orders) : [];
};

/**
 * Obtener todos los pedidos (versión sincrónica para compatibilidad)
 */
export const getOrdersSync = () => {
  const orders = localStorage.getItem(ORDERS_KEY);
  return orders ? JSON.parse(orders) : [];
};

/**
 * Obtener pedidos dentro de un rango de fechas
 */
export const getOrdersByDateRange = (startDate, endDate) => {
  const orders = getOrdersSync();

  return orders.filter(order => {
    const orderDate = parseISO(order.timestamp);
    return isWithinInterval(orderDate, {
      start: startOfDay(startDate),
      end: endOfDay(endDate)
    });
  });
};

/**
 * Obtener estadísticas generales
 */
export const getGeneralStats = (days = 30) => {
  const endDate = new Date();
  const startDate = subDays(endDate, days);
  const orders = getOrdersByDateRange(startDate, endDate);

  if (orders.length === 0) {
    return {
      totalSales: 0,
      totalOrders: 0,
      averageTicket: 0,
      totalItems: 0,
      period: `Últimos ${days} días`
    };
  }

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, order) => sum + order.itemCount, 0);
  const averageTicket = totalSales / totalOrders;

  return {
    totalSales,
    totalOrders,
    averageTicket,
    totalItems,
    period: `Últimos ${days} días`
  };
};

/**
 * Obtener productos más vendidos
 */
export const getTopProducts = (limit = 5, days = 30) => {
  const endDate = new Date();
  const startDate = subDays(endDate, days);
  const orders = getOrdersByDateRange(startDate, endDate);

  // Contar productos
  const productCount = {};
  const productRevenue = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      const productId = item.id;
      const productName = item.name;
      const quantity = item.quantity;
      const revenue = item.totalPrice;

      if (!productCount[productId]) {
        productCount[productId] = {
          id: productId,
          name: productName,
          quantity: 0,
          revenue: 0,
          orders: 0
        };
      }

      productCount[productId].quantity += quantity;
      productCount[productId].revenue += revenue;
      productCount[productId].orders += 1;
    });
  });

  // Convertir a array y ordenar
  const topProducts = Object.values(productCount)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);

  return topProducts;
};

/**
 * Obtener ventas por categoría
 */
export const getSalesByCategory = (days = 30) => {
  const endDate = new Date();
  const startDate = subDays(endDate, days);
  const orders = getOrdersByDateRange(startDate, endDate);

  const categoryStats = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      const category = item.category || 'Sin categoría';

      if (!categoryStats[category]) {
        categoryStats[category] = {
          category,
          quantity: 0,
          revenue: 0,
          orders: 0
        };
      }

      categoryStats[category].quantity += item.quantity;
      categoryStats[category].revenue += item.totalPrice;
      categoryStats[category].orders += 1;
    });
  });

  return Object.values(categoryStats).sort((a, b) => b.revenue - a.revenue);
};

/**
 * Obtener ventas por día (últimos N días)
 */
export const getSalesByDay = (days = 30) => {
  const endDate = new Date();
  const startDate = subDays(endDate, days);
  const orders = getOrdersByDateRange(startDate, endDate);

  // Crear array de días
  const dailyStats = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(endDate, i);
    const dateStr = format(date, 'yyyy-MM-dd');

    dailyStats.push({
      date: dateStr,
      label: format(date, 'dd MMM', { locale: es }),
      sales: 0,
      orders: 0,
      items: 0
    });
  }

  // Agregar datos de pedidos
  orders.forEach(order => {
    const dayIndex = dailyStats.findIndex(d => d.date === order.date);
    if (dayIndex !== -1) {
      dailyStats[dayIndex].sales += order.total;
      dailyStats[dayIndex].orders += 1;
      dailyStats[dayIndex].items += order.itemCount;
    }
  });

  return dailyStats;
};

/**
 * Obtener pedidos por hora del día (heatmap)
 */
export const getOrdersByHour = (days = 30) => {
  const endDate = new Date();
  const startDate = subDays(endDate, days);
  const orders = getOrdersByDateRange(startDate, endDate);

  // Inicializar contadores por hora (0-23)
  const hourlyStats = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    label: `${hour.toString().padStart(2, '0')}:00`,
    orders: 0,
    sales: 0
  }));

  // Contar pedidos por hora
  orders.forEach(order => {
    if (order.hour >= 0 && order.hour < 24) {
      hourlyStats[order.hour].orders += 1;
      hourlyStats[order.hour].sales += order.total;
    }
  });

  return hourlyStats;
};

/**
 * Obtener pedidos por día de la semana
 */
export const getOrdersByDayOfWeek = (days = 30) => {
  const endDate = new Date();
  const startDate = subDays(endDate, days);
  const orders = getOrdersByDateRange(startDate, endDate);

  const daysOfWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];

  const weekdayStats = daysOfWeek.map((name, index) => ({
    day: index,
    name,
    orders: 0,
    sales: 0
  }));

  orders.forEach(order => {
    if (order.dayOfWeek >= 0 && order.dayOfWeek < 7) {
      weekdayStats[order.dayOfWeek].orders += 1;
      weekdayStats[order.dayOfWeek].sales += order.total;
    }
  });

  return weekdayStats;
};

/**
 * Obtener hora pico (hora con más pedidos)
 */
export const getPeakHour = (days = 30) => {
  const hourlyStats = getOrdersByHour(days);
  const peakHour = hourlyStats.reduce((max, current) =>
    current.orders > max.orders ? current : max
  );

  return {
    hour: peakHour.hour,
    label: peakHour.label,
    orders: peakHour.orders,
    sales: peakHour.sales
  };
};

/**
 * Obtener día pico (día con más pedidos)
 */
export const getPeakDay = (days = 30) => {
  const weekdayStats = getOrdersByDayOfWeek(days);
  const peakDay = weekdayStats.reduce((max, current) =>
    current.orders > max.orders ? current : max
  );

  return peakDay;
};

/**
 * Comparar período actual vs anterior
 */
export const compareWithPreviousPeriod = (days = 30) => {
  const currentEnd = new Date();
  const currentStart = subDays(currentEnd, days);
  const previousEnd = currentStart;
  const previousStart = subDays(previousEnd, days);

  const currentOrders = getOrdersByDateRange(currentStart, currentEnd);
  const previousOrders = getOrdersByDateRange(previousStart, previousEnd);

  const currentSales = currentOrders.reduce((sum, o) => sum + o.total, 0);
  const previousSales = previousOrders.reduce((sum, o) => sum + o.total, 0);

  const salesChange = previousSales > 0
    ? ((currentSales - previousSales) / previousSales) * 100
    : 0;

  const ordersChange = previousOrders.length > 0
    ? ((currentOrders.length - previousOrders.length) / previousOrders.length) * 100
    : 0;

  return {
    current: {
      sales: currentSales,
      orders: currentOrders.length
    },
    previous: {
      sales: previousSales,
      orders: previousOrders.length
    },
    change: {
      sales: salesChange,
      orders: ordersChange
    }
  };
};

/**
 * Generar ID único para pedido
 */
const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ORD-${timestamp}-${random}`;
};

/**
 * Limpiar datos antiguos (mantener solo últimos 90 días)
 */
export const cleanOldData = (daysToKeep = 90) => {
  const orders = getOrdersSync();
  const cutoffDate = subDays(new Date(), daysToKeep);

  const filteredOrders = orders.filter(order => {
    const orderDate = parseISO(order.timestamp);
    return orderDate >= cutoffDate;
  });

  localStorage.setItem(ORDERS_KEY, JSON.stringify(filteredOrders));

  return {
    removed: orders.length - filteredOrders.length,
    kept: filteredOrders.length
  };
};

/**
 * Exportar datos para backup
 */
export const exportData = () => {
  const orders = getOrdersSync();
  const stats = getGeneralStats(90);

  return {
    exportDate: new Date().toISOString(),
    orders,
    stats,
    version: '1.0'
  };
};

/**
 * Importar datos desde backup
 */
export const importData = (data) => {
  if (data.orders && Array.isArray(data.orders)) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(data.orders));
    return true;
  }
  return false;
};
