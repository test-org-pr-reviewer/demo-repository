import { useState, useEffect } from 'react'
import { X, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'
import { useStore } from '../store/useStore'

const AlertBanner = () => {
  const [isVisible, setIsVisible] = useState(true)
  const alerts = useStore((state) => state.alerts)
  const removeAlert = useStore((state) => state.removeAlert)

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical')
  const warningAlerts = alerts.filter(alert => alert.type === 'warning')

  useEffect(() => {
    if (criticalAlerts.length > 0) {
      setIsVisible(true)
    }
  }, [criticalAlerts.length])

  if (!isVisible || (criticalAlerts.length === 0 && warningAlerts.length === 0)) {
    return null
  }

  const latestAlert = criticalAlerts.length > 0 ? criticalAlerts[0] : warningAlerts[0]

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5" />
      case 'warning':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <CheckCircle className="h-5 w-5" />
    }
  }

  const getAlertClasses = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      default:
        return 'bg-green-50 border-green-200 text-green-800'
    }
  }

  const handleAcknowledge = () => {
    removeAlert(latestAlert.id)
    if (criticalAlerts.length === 1) {
      setIsVisible(false)
    }
  }

  return (
    <div className={`mb-6 rounded-lg border ${getAlertClasses(latestAlert.type)} animate-fade-in`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-1 rounded-full ${latestAlert.type === 'critical' ? 'bg-red-100' : 'bg-yellow-100'}`}>
              {getAlertIcon(latestAlert.type)}
            </div>
            <div>
              <h3 className="text-sm font-medium">
                {latestAlert.type === 'critical' ? 'Critical Alert' : 'Warning'}
              </h3>
              <p className="text-sm mt-1">{latestAlert.title}</p>
              <p className="text-xs opacity-75 mt-1">{latestAlert.message}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded-full">
              {new Date(latestAlert.timestamp).toLocaleTimeString()}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handleAcknowledge}
                className="text-xs bg-white bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-lg transition-colors"
              >
                Acknowledge
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {(criticalAlerts.length > 1 || warningAlerts.length > 1) && (
          <div className="mt-3 text-xs opacity-75">
            {criticalAlerts.length > 1 && (
              <span className="mr-4">+{criticalAlerts.length - 1} critical alerts</span>
            )}
            {warningAlerts.length > 1 && (
              <span>+{warningAlerts.length - 1} warning alerts</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AlertBanner