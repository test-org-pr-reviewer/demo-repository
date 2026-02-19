import { useState, useEffect } from 'react'
import { 
  Wifi, 
  WifiOff, 
  Zap, 
  Thermometer, 
  Database, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

const SystemHealthMonitor = () => {
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [metrics, setMetrics] = useState({
    systemLoad: 45,
    databaseConnections: 85,
    cacheHitRate: 92,
    queueDepth: 12
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      setMetrics(prev => ({
        systemLoad: Math.max(10, Math.min(100, prev.systemLoad + (Math.random() - 0.5) * 10)),
        databaseConnections: Math.max(50, Math.min(100, prev.databaseConnections + (Math.random() - 0.5) * 5)),
        cacheHitRate: Math.max(70, Math.min(98, prev.cacheHitRate + (Math.random() - 0.5) * 2)),
        queueDepth: Math.max(0, Math.min(50, prev.queueDepth + (Math.random() - 0.5) * 5))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getMetricStatus = (value, type) => {
    switch (type) {
      case 'systemLoad':
        if (value > 80) return { status: 'critical', color: 'text-red-600' }
        if (value > 60) return { status: 'warning', color: 'text-yellow-600' }
        return { status: 'healthy', color: 'text-green-600' }
      case 'databaseConnections':
        if (value > 90) return { status: 'critical', color: 'text-red-600' }
        if (value > 75) return { status: 'warning', color: 'text-yellow-600' }
        return { status: 'healthy', color: 'text-green-600' }
      case 'cacheHitRate':
        if (value < 80) return { status: 'critical', color: 'text-red-600' }
        if (value < 90) return { status: 'warning', color: 'text-yellow-600' }
        return { status: 'healthy', color: 'text-green-600' }
      case 'queueDepth':
        if (value > 30) return { status: 'critical', color: 'text-red-600' }
        if (value > 15) return { status: 'warning', color: 'text-yellow-600' }
        return { status: 'healthy', color: 'text-green-600' }
      default:
        return { status: 'healthy', color: 'text-green-600' }
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString()
  }

  const metricsData = [
    {
      name: 'System Load',
      value: metrics.systemLoad,
      icon: Thermometer,
      type: 'systemLoad',
      unit: '%'
    },
    {
      name: 'Database Connections',
      value: metrics.databaseConnections,
      icon: Database,
      type: 'databaseConnections',
      unit: '%'
    },
    {
      name: 'Cache Hit Rate',
      value: metrics.cacheHitRate,
      icon: Zap,
      type: 'cacheHitRate',
      unit: '%'
    },
    {
      name: 'Queue Depth',
      value: metrics.queueDepth,
      icon: RefreshCw,
      type: 'queueDepth',
      unit: ''
    }
  ]

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <Wifi className="h-5 w-5 text-green-500 animate-pulse" />
              <span className="text-green-600 font-medium">Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <WifiOff className="h-5 w-5 text-red-500" />
              <span className="text-red-600 font-medium">Disconnected</span>
            </div>
          )}
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last update: {formatTime(lastUpdate)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live monitoring</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon
          const status = getMetricStatus(metric.value, metric.type)
          
          return (
            <div key={index} className="card p-4 hover-lift transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-5 w-5 ${status.color}`} />
                  <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                </div>
                <div className={`flex items-center space-x-1 ${status.color}`}>
                  {status.status === 'healthy' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium capitalize">{status.status}</span>
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value}{metric.unit}
                </div>
                <div className="text-xs text-gray-500">Current</div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    status.status === 'critical' ? 'bg-red-500' :
                    status.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ 
                    width: `${metric.type === 'cacheHitRate' ? metric.value : Math.min(100, metric.value)}%` 
                  }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* System Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">System Health</h4>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-gray-900">
              {Math.round(
                (metricsData.reduce((sum, m) => {
                  const status = getMetricStatus(m.value, m.type)
                  return sum + (status.status === 'healthy' ? 1 : status.status === 'warning' ? 0.5 : 0)
                }, 0) / metricsData.length) * 100
              )}%
            </div>
            <div className="text-green-600">
              <CheckCircle className="h-8 w-8" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Overall system performance</p>
        </div>

        <div className="card p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Alerts</h4>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-yellow-600">2</div>
            <div className="text-yellow-600">
              <AlertTriangle className="h-8 w-8" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Warning-level issues</p>
        </div>

        <div className="card p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Uptime</h4>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-green-600">99.8%</div>
            <div className="text-green-600">
              <Zap className="h-8 w-8" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
        </div>
      </div>
    </div>
  )
}

export default SystemHealthMonitor