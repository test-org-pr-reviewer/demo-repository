import { useState } from 'react'
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  Menu
} from 'lucide-react'
import { useStore } from '../store/useStore'
import NotificationDropdown from './NotificationDropdown'
import UserMenu from './UserMenu'

const Header = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const settings = useStore((state) => state.settings)
  const toggleTheme = () => {
    // Theme toggle logic would go here
    console.log('Toggle theme')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search services, metrics, or alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            title="Toggle theme"
          >
            {settings.theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors relative"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            {isNotificationsOpen && (
              <NotificationDropdown onClose={() => setIsNotificationsOpen(false)} />
            )}
          </div>

          {/* Settings */}
          <button
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">Admin</span>
            </button>
            {isUserMenuOpen && (
              <UserMenu onClose={() => setIsUserMenuOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header