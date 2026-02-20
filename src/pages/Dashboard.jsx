import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Server, 
  Database, 
  AlertTriangle,
  Users,
  CreditCard,
  MessageSquare,
  Shield,
  Plus,
  Zap,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useStore } from '../store/useStore'
import ServiceCard from '../components/ServiceCard'
import MetricCard from '../components/MetricCard'
import StatusIndicator from '../components/StatusIndicator'
import SystemHealthMonitor from '../components/SystemHealthMonitor'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('24h')
  const services = useStore((state) => state.services)
  const metrics = useStore((state) => state.metrics)
  const settings = useStore((state) => state.settings)

  // Calculate summary statistics
  const stats = {
    totalServices: services.length,
    healthyServices: services.filter(s => s.status === 'healthy').length,
    warningServices: services.filter(s => s.status === 'warning').length,
    criticalServices: services.filter(s => s.status === 'critical').length,
    totalRequests: services.reduce((sum, s) => sum + s.metrics.requestsPerMinute, 0),
    avgResponseTime: services.length > 0 
      ? Math.round(services.reduce((sum, s) => sum + s.metrics.responseTime, 0) / services.length)
      : 0,
    avgErrorRate: services.length > 0
      ? Math.round((services.reduce((sum, s) => sum + s.metrics.errorRate, 0) / services.length) * 100) / 100
      : 0
  }

  // Sample data for charts
  const cpuData = [
    { time: '00:00', value: 45 }, { time: '04:00', value: 38 }, { time: '08:00', value: 62 }, 
    { time: '12:00', value: 78 }, { time: '16:00', value: 85 }, { time: '20:00', value: 67 }, { time: '23:59', value: 52 }
  ]

  const memoryData = [
    { time: '00:00', value: 60 }, { time: '04:00', value: 55 }, { time: '08:00', value: 75 }, 
    { time: '12:00', value: 82 }, { time: '16:00', value: 88 }, { time: '20:00', value: 73 }, { time: '23:59', value: 65 }
  ]

  const requestVolumeData = [
    { time: '00:00', value: 500 }, { time: '04:00', value: 400 }, { time: '08:00', value: 1200 }, 
    { time: '12:00', value: 2100 }, { time: '16:00', value: 1800 }, { time: '20:00', value: 1400 }, { time: '23:59', value: 800 }
  ]

  const statusData = [
    { name: 'Healthy', value: stats.healthyServices, color: '#10b981' },
    { name: 'Warning', value: stats.warningServices, color: '#f59e0b' },
    { name: 'Critical', value: stats.criticalServices, color: '#ef4444' }
  ]

  const topServices = services
    .sort((a, b) => b.metrics.requestsPerMinute - a.metrics.requestsPerMinute)
    .slice(0, 5)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of all services and system health</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Services"
          value={stats.totalServices}
          icon={Server}
          trend={{ value: 2, direction: 'up' }}
          subtitle="All monitored services"
        />
        <MetricCard
          title="System Health"
          value={`${Math.round((stats.healthyServices / stats.totalServices) * 100)}%`}
          icon={Activity}
          trend={{ value: 5, direction: 'up' }}
          subtitle="Healthy services"
        />
        <MetricCard
          title="Avg Response Time"
          value={`${stats.avgResponseTime}ms`}
          icon={TrendingUp}
          trend={{ value: 12, direction: 'down' }}
          subtitle="Lower is better"
        />
        <MetricCard
          title="Error Rate"
          value={`${stats.avgErrorRate}%`}
          icon={AlertTriangle}
          trend={{ value: 0.3, direction: 'down' }}
          subtitle="System-wide average"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Metrics Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">System Metrics</h2>
            <div className="flex space-x-2">
              <span className="text-sm text-gray-500">CPU</span>
              <span className="text-sm text-gray-500">Memory</span>
            </div>
          </div>
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

        {/* Request Volume Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Request Volume</h2>
            <span className="text-sm text-gray-500">Requests per minute</span>
          </div>
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

      {/* System Health Monitor */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">System Health Monitor</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Wifi className="h-4 w-4 text-green-500" />
              <span>Real-time</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Updated 15s ago</span>
            </div>
          </div>
        </div>
        <SystemHealthMonitor />
      </div>

      {/* Services Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Status Distribution */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Status</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {statusData.map((status, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                  <span className="text-gray-700">{status.name}</span>
                </div>
                <span className="font-medium">{status.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Services</h2>
            <span className="text-sm text-gray-500">By request volume</span>
          </div>
          <div className="space-y-4">
            {topServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <StatusIndicator status={service.status} />
                  <div>
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.owner}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{service.metrics.requestsPerMinute.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">requests/min</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Services */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Services</h2>
          <span className="text-sm text-gray-500">All monitored services</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard