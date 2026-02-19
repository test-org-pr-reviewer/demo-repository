import axios from 'axios'

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Mock data generators for demo purposes
const generateMockServices = () => {
  return [
    {
      id: 'auth-service',
      name: 'Authentication Service',
      description: 'Handles user authentication and authorization',
      status: 'healthy',
      owner: 'Platform Team',
      url: 'https://auth.internal.company.com',
      healthCheckUrl: 'https://auth.internal.company.com/health',
      lastDeployed: new Date(Date.now() - 86400000).toISOString(),
      version: '2.1.3',
      environment: 'production',
      dependencies: ['user-service', 'database'],
      metrics: {
        cpu: Math.floor(Math.random() * 60) + 20,
        memory: Math.floor(Math.random() * 60) + 30,
        requestsPerMinute: Math.floor(Math.random() * 1000) + 500,
        errorRate: Math.random() * 2,
        responseTime: Math.floor(Math.random() * 200) + 50
      }
    },
    {
      id: 'user-service',
      name: 'User Management Service',
      description: 'Manages user profiles and data',
      status: 'warning',
      owner: 'Backend Team',
      url: 'https://user.internal.company.com',
      healthCheckUrl: 'https://user.internal.company.com/health',
      lastDeployed: new Date(Date.now() - 172800000).toISOString(),
      version: '1.8.7',
      environment: 'production',
      dependencies: ['database'],
      metrics: {
        cpu: Math.floor(Math.random() * 40) + 60,
        memory: Math.floor(Math.random() * 30) + 70,
        requestsPerMinute: Math.floor(Math.random() * 600) + 400,
        errorRate: Math.random() * 5 + 1,
        responseTime: Math.floor(Math.random() * 400) + 200
      }
    }
  ]
}

const generateMockMetrics = (hours = 24) => {
  const now = Date.now()
  const generateSeries = (min, max) => {
    return Array.from({ length: hours }, (_, i) => ({
      timestamp: new Date(now - (hours - i) * 3600000).toISOString(),
      value: Math.floor(Math.random() * (max - min + 1)) + min
    }))
  }

  return {
    cpu: generateSeries(20, 80),
    memory: generateSeries(30, 90),
    network: generateSeries(100, 1000),
    disk: generateSeries(10, 60)
  }
}

// API endpoints
export const dashboardAPI = {
  // Services endpoints
  getServices: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: generateMockServices() }
  },

  getService: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const services = generateMockServices()
    const service = services.find(s => s.id === id)
    if (!service) {
      throw new Error('Service not found')
    }
    return { data: service }
  },

  updateService: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: { id, ...updates } }
  },

  deleteService: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { data: { success: true } }
  },

  // Metrics endpoints
  getMetrics: async (timeRange = '24h') => {
    await new Promise(resolve => setTimeout(resolve, 400))
    const hours = timeRange === '1h' ? 1 : timeRange === '7d' ? 168 : 24
    return { data: generateMockMetrics(hours) }
  },

  getServiceMetrics: async (serviceId, timeRange = '24h') => {
    await new Promise(resolve => setTimeout(resolve, 400))
    const hours = timeRange === '1h' ? 1 : timeRange === '7d' ? 168 : 24
    return { 
      data: {
        serviceId,
        metrics: generateMockMetrics(hours)
      }
    }
  },

  // Health check endpoints
  checkServiceHealth: async (serviceId) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const status = Math.random() > 0.8 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'healthy'
    return { 
      data: { 
        serviceId, 
        status,
        lastChecked: new Date().toISOString(),
        details: {
          uptime: Math.floor(Math.random() * 99) + 1,
          responseTime: Math.floor(Math.random() * 500) + 50
        }
      }
    }
  },

  // Alerts endpoints
  getAlerts: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      data: [
        {
          id: 1,
          type: 'critical',
          title: 'High Error Rate',
          message: 'Service error rate exceeded threshold',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          acknowledged: false
        },
        {
          id: 2,
          type: 'warning',
          title: 'Memory Usage High',
          message: 'Service memory usage at 85%',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          acknowledged: true
        }
      ]
    }
  },

  acknowledgeAlert: async (alertId) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return { data: { success: true, alertId } }
  },

  // System endpoints
  getSystemInfo: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      data: {
        version: '1.0.0',
        uptime: '15 days, 4 hours, 23 minutes',
        services: 15,
        healthyServices: 12,
        warnings: 2,
        critical: 1
      }
    }
  }
}

// Export the axios instance for direct use if needed
export default api