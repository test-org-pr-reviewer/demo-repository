import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  ExternalLink, 
  RefreshCw, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Database,
  Users,
  Shield,
  CreditCard,
  MessageSquare,
  Activity,
  Settings as SettingsIcon,
  Edit,
  Trash2
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useStore } from '../store/useStore'
import StatusIndicator from '../components/StatusIndicator'

const ServiceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const services = useStore((state) => state.services)
  const updateService = useStore((state) => state.updateService)
  
  const [service, setService] = useState(null)
  const [timeRange, setTimeRange] = useState('24h')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const foundService = services.find(s => s.id === id)
    if (foundService) {
      setService(foundService)
    } else {
      navigate('/services', { replace: true })
    }
  }, [id, services, navigate])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update service with new metrics
    const updatedService = {
      ...service,
      metrics: {
        ...service.metrics,
        cpu: Math.floor(Math.random() * 40) + 30,
        memory: Math.floor(Math.random() * 40) + 40,
        requestsPerMinute: Math.floor(Math.random() * 500) + 500,
        errorRate: Math.random() * 3,
        responseTime: Math.floor(Math.random() * 300) + 50
      },
      lastDeployed: new Date().toISOString()
    }
    
    updateService(id, updatedService)
    setService(updatedService)
    setIsRefreshing(false)
  }

  if (!service) {
    return (
      <div className="animate-fade-in">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Service not found</h3>
          <p className="text-gray-600">The service you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  // Mock chart data
  const cpuData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: service.metrics.cpu + (Math.random() * 20 - 10)
  }))

  const memoryData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: service.metrics.memory + (Math.random() * 20 - 10)
  }))

  const requestVolumeData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: service.metrics.requestsPerMinute + (Math.random() * 200 - 100)
  }))

  const getMetricColor = (value, type) => {
    if (type === 'cpu' || type === 'memory') {
      if (value > 80) return 'text-red-600'
      if (value > 60) return 'text-yellow-600'
      return 'text-green-600'
    }
    if (type === 'errorRate') {
      if (value > 5) return 'text-red-600'
      if (value > 1) return 'text-yellow-600'
      return 'text-green-600'
    }
    return 'text-gray-900'
  }

  const formatUptime = (days) => {
    const hours = Math.floor(days * 24)
    const remainingHours = hours % 24
    return `${Math.floor(days)}d ${remainingHours}h`
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Services</span>
          </button>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-500">Service Details</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <button className="btn-primary flex items-center space-x-2">
            <SettingsIcon className="h-4 w-4" />
            <span>Configure</span>
          </button>
        </div>
      </div>

      {/* Service Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <StatusIndicator status={service.status} size="lg" />
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open Service</span>
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{service.metrics.cpu}%</div>
                <div className={`text-sm ${getMetricColor(service.metrics.cpu, 'cpu')}`}>CPU Usage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{service.metrics.memory}%</div>
                <div className={`text-sm ${getMetricColor(service.metrics.memory, 'memory')}`}>Memory Usage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{service.metrics.requestsPerMinute.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Requests/min</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{service.metrics.responseTime}ms</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CPU & Memory Usage</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cpuData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={requestVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Service Info */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Version</span>
                <span className="text-sm font-medium">{service.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Environment</span>
                <span className="badge bg-blue-100 text-blue-800 text-sm">{service.environment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Owner</span>
                <span className="text-sm font-medium">{service.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Deployed</span>
                <span className="text-sm font-medium">{new Date(service.lastDeployed).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-medium">99.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Health Check</span>
                <span className="badge bg-green-100 text-green-800 text-sm">Passing</span>
              </div>
            </div>
          </div>

          {/* Dependencies */}
          {service.dependencies && service.dependencies.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dependencies</h3>
              <div className="space-y-3">
                {service.dependencies.map((dep, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{dep}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Healthy</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-secondary text-sm py-3">
                Health Check
              </button>
              <button className="w-full btn-primary text-sm py-3">
                View Logs
              </button>
              <button className="w-full btn-secondary text-sm py-3">
                View Metrics
              </button>
              <button className="w-full text-red-600 hover:text-red-700 text-sm py-3 text-left">
                Delete Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{service.metrics.errorRate.toFixed(2)}%</div>
            <div className={`text-sm mt-2 ${getMetricColor(service.metrics.errorRate, 'errorRate')}`}>
              Error Rate
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{formatUptime(30)}</div>
            <div className="text-sm text-gray-600 mt-2">Uptime (30 days)</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{(service.metrics.requestsPerMinute * 60 * 24).toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-2">Daily Requests</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{Math.round(service.metrics.responseTime / 1000)}s</div>
            <div className="text-sm text-gray-600 mt-2">Avg Response Time</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail