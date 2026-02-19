import { useEffect } from 'react'
import { Bell, AlertTriangle, CheckCircle, X } from 'lucide-react'
import { useStore } from '../store/useStore'

const NotificationDropdown = ({ onClose }) => {
  const alerts = useStore((state) => state.alerts)
  const removeAlert = useStore((state) => state.removeAlert)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-dropdown')) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleAcknowledge = (alertId) => {
    removeAlert(alertId)
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <div className="notification-dropdown absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-hard border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Bell className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p>No new notifications</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="text-xs text-gray-600 hover:text-gray-900"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {alerts.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all alerts
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationDropdown