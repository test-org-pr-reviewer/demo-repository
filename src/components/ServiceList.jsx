import { useState } from 'react'
import { 
  ExternalLink, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StatusIndicator from './StatusIndicator'

const ServiceList = ({ services }) => {
  const navigate = useNavigate()
  const [expandedRows, setExpandedRows] = useState(new Set())

  const toggleRow = (serviceId) => {
    const newExpandedRows = new Set(expandedRows)
    if (newExpandedRows.has(serviceId)) {
      newExpandedRows.delete(serviceId)
    } else {
      newExpandedRows.add(serviceId)
    }
    setExpandedRows(newExpandedRows)
  }

  const formatUptime = (uptimePercent) => {
    const hours = Math.floor(uptimePercent * 24 * 30) // Assuming 30 days
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return `${days}d ${remainingHours}h`
  }

  return (
    <div className="overflow-hidden">
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Service
          </div>
          <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </div>
          <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Owner
          </div>
          <div className="col-span-1 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
            CPU
          </div>
          <div className="col-span-1 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
            Memory
          </div>
          <div className="col-span-1 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
            Requests
          </div>
          <div className="col-span-1 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
            Error Rate
          </div>
          <div className="col-span-1 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
            Actions
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {services.map((service) => {
            const isExpanded = expandedRows.has(service.id)
            return (
              <div key={service.id} className="group hover:bg-gray-50 transition-colors">
                {/* Main Row */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleRow(service.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-xs text-gray-500">{service.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <StatusIndicator status={service.status} />
                  </div>
                  
                  <div className="col-span-2">
                    <span className="text-sm text-gray-900">{service.owner}</span>
                  </div>
                  
                  <div className="col-span-1 text-center">
                    <span className={`text-sm font-medium ${
                      service.metrics.cpu > 80 ? 'text-red-600' : 
                      service.metrics.cpu > 60 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {service.metrics.cpu}%
                    </span>
                  </div>
                  
                  <div className="col-span-1 text-center">
                    <span className={`text-sm font-medium ${
                      service.metrics.memory > 80 ? 'text-red-600' : 
                      service.metrics.memory > 60 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {service.metrics.memory}%
                    </span>
                  </div>
                  
                  <div className="col-span-1 text-center">
                    <span className="text-sm text-gray-900">
                      {service.metrics.requestsPerMinute.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="col-span-1 text-center">
                    <span className={`text-sm font-medium ${
                      service.metrics.errorRate > 5 ? 'text-red-600' : 
                      service.metrics.errorRate > 1 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {service.metrics.errorRate}%
                    </span>
                  </div>
                  
                  <div className="col-span-1 flex items-center justify-center space-x-1">
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      title="Open service"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => navigate(`/services/${service.id}`)}
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details Row */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 animate-slide-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Basic Info */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">Basic Information</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Version:</span>
                            <span className="font-medium">{service.version}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Environment:</span>
                            <span className="font-medium">{service.environment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Deployed:</span>
                            <span className="font-medium">{new Date(service.lastDeployed).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Response Time:</span>
                            <span className="font-medium">{service.metrics.responseTime}ms</span>
                          </div>
                        </div>
                      </div>

                      {/* Health Metrics */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">Health Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Uptime</span>
                            <span className="text-sm font-medium">99.5%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Health Check</span>
                            <span className="badge bg-green-100 text-green-800 text-xs">Passing</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Dependencies</span>
                            <span className="text-sm font-medium">{service.dependencies?.length || 0}</span>
                          </div>
                        </div>
                      </div>

                      {/* Dependencies */}
                      {service.dependencies && service.dependencies.length > 0 && (
                        <div className="space-y-3 lg:col-span-2">
                          <h4 className="text-sm font-medium text-gray-900">Dependencies</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.dependencies.map((dep, index) => (
                              <span key={index} className="badge bg-primary-100 text-primary-800 text-xs">
                                {dep}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">Actions</h4>
                        <div className="space-y-2">
                          <button className="w-full btn-secondary text-sm">
                            Health Check
                          </button>
                          <button className="w-full btn-primary text-sm">
                            View Logs
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServiceList