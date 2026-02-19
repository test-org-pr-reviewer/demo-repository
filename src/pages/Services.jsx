import { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  RefreshCw,
  Download,
  Share2,
  LayoutGrid,
  List
} from 'lucide-react'
import { useStore } from '../store/useStore'
import ServiceCard from '../components/ServiceCard'
import ServiceList from '../components/ServiceList'
import ServiceFilters from '../components/ServiceFilters'

const Services = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedEnvironment, setSelectedEnvironment] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  
  const services = useStore((state) => state.services)

  // Filter and sort services
  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.owner.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = selectedStatus === 'all' || service.status === selectedStatus
      
      const matchesEnvironment = selectedEnvironment === 'all' || service.environment === selectedEnvironment
      
      return matchesSearch && matchesStatus && matchesEnvironment
    })
    .sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        case 'owner':
          aValue = a.owner.toLowerCase()
          bValue = b.owner.toLowerCase()
          break
        case 'requests':
          aValue = a.metrics.requestsPerMinute
          bValue = b.metrics.requestsPerMinute
          break
        case 'responseTime':
          aValue = a.metrics.responseTime
          bValue = b.metrics.responseTime
          break
        default:
          return 0
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

  const stats = {
    total: services.length,
    healthy: services.filter(s => s.status === 'healthy').length,
    warning: services.filter(s => s.status === 'warning').length,
    critical: services.filter(s => s.status === 'critical').length,
  }

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Status', 'Owner', 'Environment', 'Version', 'Requests/min', 'Error Rate', 'Response Time'],
      ...filteredServices.map(s => [
        s.name,
        s.status,
        s.owner,
        s.environment,
        s.version,
        s.metrics.requestsPerMinute,
        `${s.metrics.errorRate}%`,
        `${s.metrics.responseTime}ms`
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'services-export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Catalog</h1>
          <p className="text-gray-600 mt-1">All monitored services and their current status</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Service</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Healthy</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.healthy}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warning</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.warning}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="w-6 h-6 bg-yellow-600 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.critical}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="w-6 h-6 bg-red-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <ServiceFilters
              selectedStatus={selectedStatus}
              selectedEnvironment={selectedEnvironment}
              onStatusChange={setSelectedStatus}
              onEnvironmentChange={setSelectedEnvironment}
            />
          </div>

          {/* Actions and View Toggle */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {viewMode === 'grid' ? <List className="h-5 w-5" /> : <LayoutGrid className="h-5 w-5" />}
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
                <option value="owner">Sort by Owner</option>
                <option value="requests">Sort by Requests</option>
                <option value="responseTime">Sort by Response Time</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className={`h-5 w-5 ${sortOrder === 'desc' ? 'rotate-180' : ''} transition-transform`} />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleExport}
                className="btn-secondary flex items-center space-x-2 text-sm"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="card p-6">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <ServiceList services={filteredServices} />
          )
        )}
      </div>
    </div>
  )
}

export default Services