import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatCard = ({ title, value, icon: Icon, color, change, format = 'number' }) => {
  const isPositive = change >= 0;

  const formatValue = (val) => {
    if (format === 'currency') {
      return `Q ${val.toFixed(2)}`;
    } else if (format === 'percent') {
      return `${val.toFixed(1)}%`;
    } else {
      return val.toString();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow border-l-4"
      style={{ borderColor: color }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="text-lg sm:text-xl" style={{ color }} />
        </div>

        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-1">
        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold"
          style={{ color }}
        >
          {formatValue(value)}
        </h3>
      </div>

      {/* Title */}
      <p className="text-xs sm:text-sm text-gray-600 font-medium">
        {title}
      </p>
    </motion.div>
  );
};

export default StatCard;
