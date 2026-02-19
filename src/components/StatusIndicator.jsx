const StatusIndicator = ({ status, size = 'sm' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'healthy':
        return {
          color: 'bg-green-500',
          text: 'text-green-700',
          bg: 'bg-green-100',
          label: 'Healthy'
        }
      case 'warning':
        return {
          color: 'bg-yellow-500',
          text: 'text-yellow-700',
          bg: 'bg-yellow-100',
          label: 'Warning'
        }
      case 'critical':
        return {
          color: 'bg-red-500',
          text: 'text-red-700',
          bg: 'bg-red-100',
          label: 'Critical'
        }
      default:
        return {
          color: 'bg-gray-500',
          text: 'text-gray-700',
          bg: 'bg-gray-100',
          label: 'Unknown'
        }
    }
  }

  const config = getStatusConfig(status)
  const sizeClasses = size === 'sm' ? 'h-2 w-2' : 'h-3 w-3'

  return (
    <div className={`inline-flex items-center space-x-2`}>
      <div className={`relative`}>
        <div className={`${sizeClasses} ${config.color} rounded-full animate-pulse`}></div>
        <div className={`${sizeClasses} ${config.color} rounded-full absolute inset-0 opacity-20 animate-ping`}></div>
      </div>
      <span className={`text-sm font-medium ${config.text}`}>{config.label}</span>
    </div>
  )
}

export default StatusIndicator