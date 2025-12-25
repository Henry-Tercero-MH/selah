import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaChartLine,
  FaStar,
  FaClock,
  FaCalendarDay,
  FaDatabase
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import StatCard from './StatCard';
import {
  getOrders,
  getGeneralStats,
  getTopProducts,
  getSalesByCategory,
  getSalesByDay,
  getOrdersByHour,
  getPeakHour,
  getPeakDay,
  compareWithPreviousPeriod
} from '../services/analyticsService';
import { generateSampleOrders, hasSampleData } from '../utils/generateSampleData';
import { saveOrderToSheets } from '../services/googleSheetsOrdersService';
import { saveOrder } from '../services/analyticsService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [hourlySales, setHourlySales] = useState([]);
  const [peakHour, setPeakHour] = useState(null);
  const [peakDay, setPeakDay] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [period, setPeriod] = useState(30);
  const [usingDemoData, setUsingDemoData] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [period]);

  const loadDashboardData = async () => {
    try {
      // 1. Intentar cargar pedidos desde Google Sheets
      const orders = await getOrders();

      // 2. Si no hay pedidos, generar datos de muestra
      if (!orders || orders.length === 0) {
        if (!hasSampleData()) {
          const result = generateSampleOrders();
          setUsingDemoData(true);
          console.log(`✅ Datos de demo generados: ${result.count} pedidos, Q${result.totalRevenue.toFixed(2)} en ventas`);
        } else {
          setUsingDemoData(false);
        }
      } else {
        setUsingDemoData(false);
        console.log(`📊 Dashboard cargado con ${orders.length} pedidos reales`);
      }

      // 3. Cargar todas las métricas
      // Estadísticas generales
      const generalStats = getGeneralStats(period);
      setStats(generalStats);

      // Productos más vendidos
      const top = getTopProducts(5, period);
      setTopProducts(top);

      // Ventas por categoría
      const categories = getSalesByCategory(period);
      setCategorySales(categories);

      // Ventas diarias
      const daily = getSalesByDay(period);
      setDailySales(daily);

      // Ventas por hora
      const hourly = getOrdersByHour(period);
      setHourlySales(hourly);

      // Hora pico
      const peak = getPeakHour(period);
      setPeakHour(peak);

      // Día pico
      const dayPeak = getPeakDay(period);
      setPeakDay(dayPeak);

      // Comparación con período anterior
      const comp = compareWithPreviousPeriod(period);
      setComparison(comp);

    } catch (error) {
      console.error('❌ Error al cargar dashboard:', error);
      // En caso de error, intentar cargar con datos locales
      const generalStats = getGeneralStats(period);
      setStats(generalStats);
    }
  };

  const COLORS = ['#5D4037', '#8D6E63', '#A1887F', '#BCAAA4', '#D7CCC8'];

  // Función para probar conexión con Google Sheets
  const testGoogleSheetsConnection = async () => {
    setIsTesting(true);

    try {
      // Crear pedido de prueba
      const testOrder = {
        id: `TEST-${Date.now()}`,
        items: [
          {
            id: 1,
            name: 'Licuado de Prueba',
            category: 'Licuados',
            quantity: 1,
            selectedSize: { name: 'Mediano', price: 25 },
            totalPrice: 25,
            color: '#5D4037',
            icon: '🥤'
          }
        ],
        total: 25,
        itemCount: 1,
        timestamp: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        hour: new Date().getHours(),
        dayOfWeek: new Date().getDay(),
        status: 'test'
      };

      console.log('🧪 Enviando pedido de prueba a Google Sheets...', testOrder);

      // Intentar guardar en Sheets
      await saveOrderToSheets(testOrder);

      alert('✅ PRUEBA EXITOSA!\n\nEl pedido de prueba se envió a Google Sheets.\n\nRevisa tu Google Sheet:\n1. Ve a la pestaña "Pedidos"\n2. Busca el pedido con ID: ' + testOrder.id + '\n\nSi lo ves, la conexión funciona correctamente!');

      // Recargar datos
      loadDashboardData();

    } catch (error) {
      console.error('❌ Error en prueba:', error);
      alert('❌ ERROR EN LA PRUEBA\n\nNo se pudo conectar con Google Sheets.\n\nPosibles causas:\n1. URL del Apps Script incorrecta\n2. Apps Script no desplegado\n3. Permisos incorrectos\n\nRevisa la consola del navegador (F12) para más detalles.');
    } finally {
      setIsTesting(false);
    }
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              📊 Dashboard de Ventas
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {stats.period} - Análisis de rendimiento
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {usingDemoData && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-2 rounded">
                <p className="text-xs sm:text-sm text-yellow-800 flex items-center gap-2">
                  <FaDatabase className="flex-shrink-0" />
                  <span>Mostrando datos de demostración</span>
                </p>
              </div>
            )}

            {/* Botón de prueba de Google Sheets */}
            <button
              onClick={testGoogleSheetsConnection}
              disabled={isTesting}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs sm:text-sm font-medium shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              title="Probar conexión con Google Sheets"
            >
              {isTesting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Probando...</span>
                </>
              ) : (
                <>
                  <FaDatabase />
                  <span>Probar Google Sheets</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Selector de período */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[7, 15, 30, 60, 90].map(days => (
            <button
              key={days}
              onClick={() => setPeriod(days)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                period === days
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {days} días
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Ventas Totales"
          value={stats.totalSales}
          icon={FaMoneyBillWave}
          color="#5D4037"
          format="currency"
          change={comparison?.change.sales}
        />
        <StatCard
          title="Pedidos"
          value={stats.totalOrders}
          icon={FaShoppingCart}
          color="#8D6E63"
          change={comparison?.change.orders}
        />
        <StatCard
          title="Ticket Promedio"
          value={stats.averageTicket}
          icon={FaChartLine}
          color="#A1887F"
          format="currency"
        />
        <StatCard
          title="Productos Vendidos"
          value={stats.totalItems}
          icon={FaStar}
          color="#BCAAA4"
        />
      </div>

      {/* Peak Hours Card */}
      {peakHour && peakDay && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaClock className="text-2xl sm:text-3xl text-blue-600" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-blue-900">Hora Pico</h3>
                <p className="text-xs sm:text-sm text-blue-700">Más pedidos</p>
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600">{peakHour.label}</p>
            <p className="text-xs sm:text-sm text-blue-700 mt-2">{peakHour.orders} pedidos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 sm:p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaCalendarDay className="text-2xl sm:text-3xl text-purple-600" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-purple-900">Día Pico</h3>
                <p className="text-xs sm:text-sm text-purple-700">Más ventas</p>
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-purple-600">{peakDay.name}</p>
            <p className="text-xs sm:text-sm text-purple-700 mt-2">{peakDay.orders} pedidos</p>
          </motion.div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Ventas Diarias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Ventas Diarias
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#5D4037"
                strokeWidth={2}
                name="Ventas (Q)"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Ventas por Categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Ventas por Categoría
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categorySales}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {categorySales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Productos Más Vendidos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8"
      >
        <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          🏆 Top 5 Productos Más Vendidos
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis
              dataKey="name"
              type="category"
              width={100}
              tick={{ fontSize: 11 }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#5D4037" name="Cantidad" />
            <Bar dataKey="revenue" fill="#8D6E63" name="Ingresos (Q)" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pedidos por Hora */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
      >
        <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          📈 Distribución de Pedidos por Hora
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10 }}
              interval={1}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#A1887F" name="Pedidos" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Dashboard;
