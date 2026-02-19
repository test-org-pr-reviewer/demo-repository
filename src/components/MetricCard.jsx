import { clsx } from 'clsx'

const MetricCard = ({ title, value, icon: Icon, trend, subtitle }) => {
  const trendColor = trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
  const trendIcon = trend.direction === 'up' ? '▲' : '▼'

  return (
    <div className="card p-6 hover-lift transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-3 bg-primary-50 rounded-lg">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
      </div>
      
      {trend && (
        <div className={`flex items-center mt-4 text-sm ${trendColor}`}>
          <span className="mr-1">{trendIcon}</span>
          <span>{trend.value}% from last period</span>
        </div>
      )}
    </div>
  )
}

export default MetricCard