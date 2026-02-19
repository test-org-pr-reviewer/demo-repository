import { useEffect } from 'react'
import { User, Settings, LogOut, CreditCard, HelpCircle } from 'lucide-react'
import { useStore } from '../store/useStore'

const UserMenu = ({ onClose }) => {
  const settings = useStore((state) => state.settings)
  const updateSettings = useStore((state) => state.updateSettings)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleThemeToggle = () => {
    updateSettings({
      theme: settings.theme === 'light' ? 'dark' : 'light'
    })
  }

  const handleLogout = () => {
    // Logout logic here
    console.log('Logging out...')
    onClose()
  }

  return (
    <div className="user-menu absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-hard border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">System Administrator</p>
            <p className="text-xs text-gray-500">admin@company.com</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <User className="h-4 w-4 mr-3 text-gray-400" />
          Profile
        </button>
        
        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <Settings className="h-4 w-4 mr-3 text-gray-400" />
          Account Settings
        </button>
        
        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <CreditCard className="h-4 w-4 mr-3 text-gray-400" />
          Billing
        </button>
        
        <button 
          onClick={handleThemeToggle}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <div className="h-4 w-4 mr-3">
            {settings.theme === 'light' ? (
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </div>
          Theme: {settings.theme === 'light' ? 'Light' : 'Dark'}
        </button>
        
        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <HelpCircle className="h-4 w-4 mr-3 text-gray-400" />
          Help & Support
        </button>
      </div>

      <div className="border-t border-gray-200 p-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default UserMenu