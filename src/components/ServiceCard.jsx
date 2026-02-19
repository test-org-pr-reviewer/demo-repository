import { useState } from 'react'
import { 
  ExternalLink, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  MoreHorizontal
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StatusIndicator from './StatusIndicator'

const ServiceCard = ({ service }) => {
  const navigate = useNavigate()
  const [showDetails, setShowDetails] = useState(false)

  const getMetricTrend = (metricName) => {
    // Simulate trend data
    const isUp = Math.random() > 0.5
    return {
      direction: isUp ? 'up' : 'down',
      value: Math.floor(Math.random() * 20) + 1
    }
  }

  const formatUptime = (uptimePercent) => {
    const hours = Math.floor(uptimePercent * 24 * 30) // Assuming 30 days
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return `${days}d ${remainingHours}h`
  }

  return (
    <div className="card p-6 hover-lift transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {service.name}
            </h3>
            <StatusIndicator status={service.status} />
          </div>
          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="badge bg-gray-100 text-gray-800">{service.environment}</span>
            <span>{service.owner}</span>
            <span>Version {service.version}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title={showDetails ? "Hide details" : "Show details"}
          >
            {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Open service"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">CPU Usage</p>
              <p className="text-sm font-medium">{service.metrics.cpu}%</p>
            </div>
            <div className={`p-1 rounded ${service.metrics.cpu > 80 ? 'bg-red-100' : service.metrics.cpu > 60 ? 'bg-yellow-100' : 'bg-green-100'}`}>
              <TrendingUp className={`h-3 w-3 ${service.metrics.cpu > 80 ? 'text-red-600' : service.metrics.cpu > 60 ? 'text-yellow-600' : 'text-green-600'}`} />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Memory Usage</p>
              <p className="text-sm font-medium">{service.metrics.memory}%</p>
            </div>
            <div className={`p-1 rounded ${service.metrics.memory > 80 ? 'bg-red-100' : service.metrics.memory > 60 ? 'bg-yellow-100' : 'bg-green-100'}`}>
              <TrendingUp className={`h-3 w-3 ${service.metrics.memory > 80 ? 'text-red-600' : service.metrics.memory > 60 ? 'text-yellow-600' : 'text-green-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      {showDetails && (
        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Requests/min:</span>
              <span className="ml-2 font-medium">{service.metrics.requestsPerMinute.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-600">Error Rate:</span>
              <span className="ml-2 font-medium">{service.metrics.errorRate}%</span>
            </div>
            <div>
              <span className="text-gray-600">Response Time:</span>
              <span className="ml-2 font-medium">{service.metrics.responseTime}ms</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Last deployed: {new Date(service.lastDeployed).toLocaleDateString()}</span>
            <span>Uptime: {formatUptime(99.5)}</span>
          </div>
          
          {service.dependencies && service.dependencies.length > 0 && (
            <div>
              <span className="text-xs text-gray-600">Dependencies:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {service.dependencies.map((dep, index) => (
                  <span key={index} className="badge bg-primary-100 text-primary-800 text-xs">
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          {service.status === 'critical' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Needs attention
            </span>
          )}
          {service.status === 'warning' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Monitor closely
            </span>
          )}
        </div>
        
        <button
          onClick={() => navigate(`/services/${service.id}`)}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
        >
          <span>View Details</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

export default ServiceCard