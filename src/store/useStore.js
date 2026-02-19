import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // Services state
      services: [],
      setServices: (services) => set({ services }),
      updateService: (id, updates) =>
        set((state) => ({
          services: state.services.map((service) =>
            service.id === id ? { ...service, ...updates } : service
          ),
        })),
      addService: (service) =>
        set((state) => ({ services: [...state.services, service] })),
      removeService: (id) =>
        set((state) => ({
          services: state.services.filter((service) => service.id !== id),
        })),

      // Metrics state
      metrics: {
        cpu: [],
        memory: [],
        network: [],
        disk: [],
      },
      setMetrics: (metrics) => set({ metrics }),
      updateMetrics: (newMetrics) =>
        set((state) => ({
          metrics: {
            cpu: [...state.metrics.cpu, ...newMetrics.cpu],
            memory: [...state.metrics.memory, ...newMetrics.memory],
            network: [...state.metrics.network, ...newMetrics.network],
            disk: [...state.metrics.disk, ...newMetrics.disk],
          },
        })),

      // Settings state
      settings: {
        theme: 'light',
        notifications: true,
        autoRefresh: true,
        refreshInterval: 30,
      },
      updateSettings: (updates) =>
        set((state) => ({ settings: { ...state.settings, ...updates } })),

      // UI state
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Alerts state
      alerts: [],
      addAlert: (alert) =>
        set((state) => ({ alerts: [...state.alerts, { ...alert, id: Date.now() }] })),
      removeAlert: (id) =>
        set((state) => ({ alerts: state.alerts.filter((alert) => alert.id !== id) })),
      clearAlerts: () => set({ alerts: [] }),

      // Initialize with demo data
      initializeDemoData: () => {
        const demoServices = [
          {
            id: 'auth-service',
            name: 'Authentication Service',
            description: 'Handles user authentication and authorization',
            status: 'healthy',
            owner: 'Platform Team',
            url: 'https://auth.internal.company.com',
            healthCheckUrl: 'https://auth.internal.company.com/health',
            lastDeployed: '2024-01-15T10:30:00Z',
            version: '2.1.3',
            environment: 'production',
            dependencies: ['user-service', 'database'],
            metrics: {
              cpu: 45,
              memory: 60,
              requestsPerMinute: 1200,
              errorRate: 0.1,
              responseTime: 120
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
            lastDeployed: '2024-01-14T14:20:00Z',
            version: '1.8.7',
            environment: 'production',
            dependencies: ['database'],
            metrics: {
              cpu: 75,
              memory: 85,
              requestsPerMinute: 800,
              errorRate: 2.5,
              responseTime: 280
            }
          },
          {
            id: 'payment-service',
            name: 'Payment Processing Service',
            description: 'Handles all payment transactions',
            status: 'critical',
            owner: 'FinTech Team',
            url: 'https://payment.internal.company.com',
            healthCheckUrl: 'https://payment.internal.company.com/health',
            lastDeployed: '2024-01-10T09:15:00Z',
            version: '3.2.1',
            environment: 'production',
            dependencies: ['auth-service', 'database', 'external-payment-gateway'],
            metrics: {
              cpu: 95,
              memory: 92,
              requestsPerMinute: 50,
              errorRate: 15.2,
              responseTime: 1500
            }
          },
          {
            id: 'notification-service',
            name: 'Notification Service',
            description: 'Sends emails, SMS, and push notifications',
            status: 'healthy',
            owner: 'Platform Team',
            url: 'https://notification.internal.company.com',
            healthCheckUrl: 'https://notification.internal.company.com/health',
            lastDeployed: '2024-01-12T16:45:00Z',
            version: '1.4.2',
            environment: 'staging',
            dependencies: ['user-service'],
            metrics: {
              cpu: 25,
              memory: 40,
              requestsPerMinute: 300,
              errorRate: 0.5,
              responseTime: 80
            }
          },
          {
            id: 'analytics-service',
            name: 'Analytics Service',
            description: 'Collects and processes application metrics',
            status: 'healthy',
            owner: 'Data Team',
            url: 'https://analytics.internal.company.com',
            healthCheckUrl: 'https://analytics.internal.company.com/health',
            lastDeployed: '2024-01-16T11:20:00Z',
            version: '2.0.0',
            environment: 'production',
            dependencies: ['database'],
            metrics: {
              cpu: 35,
              memory: 55,
              requestsPerMinute: 2000,
              errorRate: 0.05,
              responseTime: 60
            }
          }
        ]

        const demoMetrics = {
          cpu: generateTimeSeriesData(24, 20, 80),
          memory: generateTimeSeriesData(24, 30, 90),
          network: generateTimeSeriesData(24, 100, 1000),
          disk: generateTimeSeriesData(24, 10, 60)
        }

        set({
          services: demoServices,
          metrics: demoMetrics,
          alerts: [
            {
              id: 1,
              type: 'critical',
              title: 'Payment Service High Error Rate',
              message: 'Error rate exceeded 10% threshold',
              timestamp: new Date().toISOString(),
              serviceId: 'payment-service'
            },
            {
              id: 2,
              type: 'warning',
              title: 'User Service Memory Usage High',
              message: 'Memory usage at 85%',
              timestamp: new Date().toISOString(),
              serviceId: 'user-service'
            }
          ]
        })
      }
    }),
    {
      name: 'dashboard-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settings: state.settings,
        sidebarCollapsed: state.sidebarCollapsed
      })
    }
  )
)

// Helper function to generate time series data
function generateTimeSeriesData(hours, min, max) {
  const data = []
  const now = Date.now()
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now - i * 60 * 60 * 1000)
    data.push({
      timestamp: timestamp.toISOString(),
      value: Math.floor(Math.random() * (max - min + 1)) + min
    })
  }
  return data
}

export default useStore