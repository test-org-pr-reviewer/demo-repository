import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Share2,
  RefreshCw
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts'
import { useStore } from '../store/useStore'

const Metrics = () => {
  const [timeRange, setTimeRange] = useState('24h')
  const [chartType, setChartType] = useState('line')
  const [metricType, setMetricType] = useState('cpu')
  const [selectedService, setSelectedService] = useState('all')
  
  const services = useStore((state) => state.services)
  const metrics = useStore((state) => state.metrics)

  // Generate sample data for different time ranges
  const generateTimeSeriesData = (hours, min, max, services = []) => {
    const data = []
    const now = Date.now()
    
    for (let i = hours; i >= 0; i--) {
      const timestamp = new Date(now - i * 3600000)
      const baseValue = Math.floor(Math.random() * (max - min + 1)) + min
      
      if (services.length > 0) {
        // Multi-service data
        const serviceData = services.map(service => ({
          timestamp: timestamp.toISOString(),
          [service.id]: baseValue + Math.random() * 20 - 10
        }))
        data.push(...serviceData)
      } else {
        // Single metric data
        data.push({
          timestamp: timestamp.toISOString(),
          value: baseValue + Math.random() * 20 - 10
        })
      }
    }
    
    return data
  }

  // Sample data for different metrics
  const cpuData = generateTimeSeriesData(24, 20, 80)
  const memoryData = generateTimeSeriesData(24, 30, 90)
  const networkData = generateTimeSeriesData(24, 100, 1000)
  const diskData = generateTimeSeriesData(24, 10, 60)

  const serviceCpuData = services.map(service => ({
    name: service.name,
    value: service.metrics.cpu,
    color: service.metrics.cpu > 80 ? '#ef4444' : service.metrics.cpu > 60 ? '#f59e0b' : '#10b981'
  }))

  const serviceMemoryData = services.map(service => ({
    name: service.name,
    value: service.metrics.memory,
    color: service.metrics.memory > 80 ? '#ef4444' : service.metrics.memory > 60 ? '#f59e0b' : '#10b981'
  }))

  const statusDistribution = [
    { name: 'Healthy', value: services.filter(s => s.status === 'healthy').length, color: '#10b981' },
    { name: 'Warning', value: services.filter(s => s.status === 'warning').length, color: '#f59e0b' },
    { name: 'Critical', value: services.filter(s => s.status === 'critical').length, color: '#ef4444' }
  ]

  const requestVolumeData = services.map(service => ({
    name: service.name,
    requests: service.metrics.requestsPerMinute,
    errors: service.metrics.errorRate
  }))

  const getChartData = () => {
    switch (metricType) {
      case 'cpu':
        return chartType === 'pie' ? serviceCpuData : cpuData
      case 'memory':
        return chartType === 'pie' ? serviceMemoryData : memoryData
      case 'network':
        return networkData
      case 'disk':
        return diskData
      default:
        return cpuData
    }
  }

  const getChartComponent = () => {
    const data = getChartData()
    
    if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )
    }

    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )
    }

    // Default line chart
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  const exportData = () => {
    const data = getChartData()
    const csvContent = [
      ['Timestamp', 'Value'],
      ...data.map(row => [row.timestamp || row.name, row.value || row.requests])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${metricType}-${chartType}-data.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Metrics</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring and historical data analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
          <button 
            onClick={exportData}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-field"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setChartType('line')}
                className={`flex-1 flex items-center justify-center space-x-2 p-2 border rounded-lg ${
                  chartType === 'line' ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <LineChartIcon className="h-4 w-4" />
                <span className="text-sm">Line</span>
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`flex-1 flex items-center justify-center space-x-2 p-2 border rounded-lg ${
                  chartType === 'bar' ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">Bar</span>
              </button>
              <button
                onClick={() => setChartType('pie')}
                className={`flex-1 flex items-center justify-center space-x-2 p-2 border rounded-lg ${
                  chartType === 'pie' ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <PieChartIcon className="h-4 w-4" />
                <span className="text-sm">Pie</span>
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Metric Type</label>
            <select
              value={metricType}
              onChange={(e) => setMetricType(e.target.value)}
              className="input-field"
            >
              <option value="cpu">CPU Usage</option>
              <option value="memory">Memory Usage</option>
              <option value="network">Network Traffic</option>
              <option value="disk">Disk Usage</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="input-field"
            >
              <option value="all">All Services</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {metricType.charAt(0).toUpperCase() + metricType.slice(1)} Metrics
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{timeRange}</span>
            <span>•</span>
            <span>{chartType} chart</span>
          </div>
        </div>
        <div className="h-96">
          {getChartComponent()}
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average CPU</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {Math.round(services.reduce((sum, s) => sum + s.metrics.cpu, 0) / services.length)}%
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Memory</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {Math.round(services.reduce((sum, s) => sum + s.metrics.memory, 0) / services.length)}%
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {services.reduce((sum, s) => sum + s.metrics.requestsPerMinute, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Error Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {(services.reduce((sum, s) => sum + s.metrics.errorRate, 0) / services.length).toFixed(2)}%
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Request Volume by Service */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume by Service</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Metrics