import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Server, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Bell,
  Database,
  Users,
  Shield,
  CreditCard,
  MessageSquare,
  Activity,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import { useStore } from '../store/useStore'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
  { name: 'Services', href: '/services', icon: Server, current: false },
  { name: 'Metrics', href: '/metrics', icon: BarChart3, current: false },
  { name: 'Settings', href: '/settings', icon: Settings, current: false },
]

const serviceCategories = [
  { name: 'Authentication', icon: Shield, count: 2, color: 'text-blue-600' },
  { name: 'User Management', icon: Users, count: 1, color: 'text-green-600' },
  { name: 'Payments', icon: CreditCard, count: 1, color: 'text-purple-600' },
  { name: 'Notifications', icon: MessageSquare, count: 1, color: 'text-yellow-600' },
  { name: 'Analytics', icon: Activity, count: 1, color: 'text-red-600' },
  { name: 'Database', icon: Database, count: 3, color: 'text-gray-600' },
]

const Sidebar = ({ collapsed }) => {
  const location = useLocation()
  const toggleSidebar = useStore((state) => state.toggleSidebar)
  const alerts = useStore((state) => state.alerts)
  const criticalAlerts = alerts.filter(alert => alert.type === 'critical').length
  const warningAlerts = alerts.filter(alert => alert.type === 'warning').length

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => toggleSidebar()}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 z-50 w-64 bg-white border-r border-gray-200 shadow-hard transition-all duration-300 ease-in-out ${
          collapsed ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <Server className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
                <p className="text-xs text-gray-500">Enterprise Monitor</p>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                {!collapsed && item.name}
                {item.name === 'Dashboard' && criticalAlerts > 0 && (
                  <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                    {criticalAlerts}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Alerts Summary */}
        {!collapsed && (
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">Active Alerts</h3>
              <Link to="/metrics" className="text-xs text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-red-600">
                  <Bell className="w-4 h-4 mr-2" />
                  Critical
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">
                  {criticalAlerts}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-yellow-600">
                  <Bell className="w-4 h-4 mr-2" />
                  Warning
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">
                  {warningAlerts}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Service Categories */}
        {!collapsed && (
          <div className="px-4 py-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Service Categories</h3>
            <div className="space-y-2">
              {serviceCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Link
                    key={category.name}
                    to="/services"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${category.color}`} />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {category.count}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Collapsed view icons */}
        {collapsed && (
          <div className="absolute top-20 left-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                  }`}
                  title={item.name}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              )
            })}
          </div>
        )}

        {/* Toggle button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <>
                <ChevronRight className="w-4 h-4 mr-2" />
                Expand
              </>
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Collapse
              </>
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar