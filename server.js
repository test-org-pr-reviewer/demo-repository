const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

// Enable CORS for development
app.use(cors())

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// API endpoints for demo purposes
app.get('/api/services', (req, res) => {
  res.json([
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
      lastDeployed: new Date(Date.now() - 172800000).toISOString(),
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
    }
  ])
})

app.get('/api/metrics', (req, res) => {
  const hours = parseInt(req.query.hours) || 24
  const generateSeries = (min, max) => {
    return Array.from({ length: hours }, (_, i) => ({
      timestamp: new Date(Date.now() - (hours - i) * 3600000).toISOString(),
      value: Math.floor(Math.random() * (max - min + 1)) + min
    }))
  }

  res.json({
    cpu: generateSeries(20, 80),
    memory: generateSeries(30, 90),
    network: generateSeries(100, 1000),
    disk: generateSeries(10, 60)
  })
})

app.get('/api/alerts', (req, res) => {
  res.json([
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
  ])
})

// Serve the React app for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Dashboard available at: http://localhost:${PORT}`)
})