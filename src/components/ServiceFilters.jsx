import { useState } from 'react'
import { Filter, ChevronDown, X } from 'lucide-react'

const ServiceFilters = ({ 
  selectedStatus, 
  selectedEnvironment, 
  onStatusChange, 
  onEnvironmentChange 
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const statusOptions = [
    { value: 'all', label: 'All Status', count: 0 },
    { value: 'healthy', label: 'Healthy', color: 'bg-green-500' },
    { value: 'warning', label: 'Warning', color: 'bg-yellow-500' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500' }
  ]

  const environmentOptions = [
    { value: 'all', label: 'All Environments' },
    { value: 'production', label: 'Production' },
    { value: 'staging', label: 'Staging' },
    { value: 'development', label: 'Development' }
  ]

  const getStatusCount = (status) => {
    // This would typically come from the store or API
    return Math.floor(Math.random() * 10) + 1
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-hard z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Status Filter */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
              {statusOptions.map((option) => (
                <label key={option.value} className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center space-x-2">
                    {option.value !== 'all' && (
                      <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                    )}
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </div>
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={selectedStatus === option.value}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                </label>
              ))}
            </div>

            {/* Environment Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Environment</label>
              {environmentOptions.map((option) => (
                <label key={option.value} className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm text-gray-700">{option.label}</span>
                  <input
                    type="radio"
                    name="environment"
                    value={option.value}
                    checked={selectedEnvironment === option.value}
                    onChange={(e) => onEnvironmentChange(e.target.value)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={() => {
                onStatusChange('all')
                onEnvironmentChange('all')
                setIsOpen(false)
              }}
              className="w-full btn-secondary text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceFilters