# Enterprise Dashboard

A comprehensive service catalog and monitoring platform inspired by Backstage, built with modern React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Dashboard Overview
- **Real-time System Metrics**: CPU, memory, network, and disk usage monitoring
- **Service Health Monitoring**: Live status tracking with health indicators
- **Interactive Charts**: Line charts, bar charts, and pie charts for data visualization
- **Alert Management**: Critical and warning alert notifications
- **System Statistics**: Key performance indicators and service summaries

### Service Catalog
- **Service Discovery**: Comprehensive list of all monitored services
- **Service Details**: Detailed information including metrics, dependencies, and health status
- **Filtering & Search**: Advanced filtering by status, environment, and search functionality
- **Export Capabilities**: CSV export for service data
- **Multi-view Support**: Grid and list views for different use cases

### Metrics & Monitoring
- **Time-series Data**: Historical data visualization with multiple time ranges
- **Chart Types**: Line, bar, and pie charts for different data representations
- **Customizable Dashboards**: Configurable metric displays and thresholds
- **Performance Analytics**: Request volume, error rates, and response times
- **Status Distribution**: Visual representation of service health across the system

### Settings & Configuration
- **User Preferences**: Theme selection (light/dark mode), auto-refresh settings
- **Notification Management**: Email notifications and alert threshold configuration
- **Security Settings**: Authentication, session management, and API access
- **Integrations**: Connected services and webhook management
- **Team Management**: User roles, permissions, and team organization

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern component-based UI framework
- **React Router**: Client-side routing for SPA navigation
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Recharts**: Data visualization library for interactive charts
- **Lucide React**: Modern icon library
- **Zustand**: Lightweight state management
- **React Query**: Server state management and data fetching
- **React Hook Form**: Form handling and validation
- **Headless UI**: Unstyled, accessible UI components
- **Framer Motion**: Smooth animations and transitions

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **PostCSS**: CSS processing with autoprefixer

### Backend (Demo API)
- **Express.js**: Node.js web server
- **CORS**: Cross-origin resource sharing
- **Static File Serving**: Production build serving

## 📁 Project Structure

```
demo-repository/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.jsx      # Main layout wrapper
│   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   ├── Header.jsx      # Top navigation header
│   │   ├── ServiceCard.jsx # Individual service display
│   │   ├── MetricCard.jsx  # Metric display cards
│   │   ├── StatusIndicator.jsx # Service status indicators
│   │   └── ...
│   ├── pages/              # Route-based page components
│   │   ├── Dashboard.jsx   # Main dashboard view
│   │   ├── Services.jsx    # Service catalog
│   │   ├── ServiceDetail.jsx # Individual service details
│   │   ├── Metrics.jsx     # Metrics and charts
│   │   ├── Settings.jsx    # Configuration pages
│   │   └── NotFound.jsx    # 404 error page
│   ├── store/              # State management
│   │   └── useStore.js     # Zustand store configuration
│   ├── services/           # API service layer
│   │   └── api.js          # Mock API endpoints
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── dist/                   # Build output (generated)
├── server.js              # Node.js server for production
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite build configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd demo-repository
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code linting
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests with Jest
- `npm start` - Start production server (requires build first)

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3b82f6 → #1e40af)
- **Status Colors**:
  - Healthy: Green (#10b981)
  - Warning: Yellow (#f59e0b)
  - Critical: Red (#ef4444)
  - Unknown: Gray (#9ca3af)

### Typography
- **Font Family**: Inter (system font stack)
- **Font Sizes**: Responsive scale from xs to 2xl
- **Font Weights**: 300 (light) to 700 (bold)

### Components
- **Cards**: Elevated containers with soft shadows
- **Buttons**: Primary, secondary, and ghost variants
- **Forms**: Consistent input styling with focus states
- **Navigation**: Collapsible sidebar with responsive design

## 🔧 Configuration

### Environment Variables
No environment variables are required for development. The application uses mock data for demonstration purposes.

### Build Configuration
- **Output Directory**: `dist/`
- **Public Path**: `/` (configurable in `vite.config.js`)
- **Source Maps**: Enabled for development, disabled for production

### API Configuration
The application includes a mock API server (`server.js`) for demonstration. In a production environment, you would connect to your actual monitoring systems and APIs.

## 📊 Data Model

### Service Object
```javascript
{
  id: 'service-id',
  name: 'Service Name',
  description: 'Service description',
  status: 'healthy|warning|critical|unknown',
  owner: 'Team Name',
  url: 'https://service.url',
  healthCheckUrl: 'https://service.url/health',
  lastDeployed: '2024-01-15T10:30:00Z',
  version: '1.0.0',
  environment: 'production|staging|development',
  dependencies: ['dependency-service-id'],
  metrics: {
    cpu: 45,           // CPU usage percentage
    memory: 60,        // Memory usage percentage
    requestsPerMinute: 1200,
    errorRate: 0.1,    // Error rate percentage
    responseTime: 120  // Response time in milliseconds
  }
}
```

### Alert Object
```javascript
{
  id: 1,
  type: 'critical|warning',
  title: 'Alert title',
  message: 'Alert message',
  timestamp: '2024-01-15T10:30:00Z',
  acknowledged: false,
  serviceId: 'service-id'
}
```

## 🚀 Deployment

### Development Deployment
1. Run `npm run build` to create production build
2. Start the Node.js server: `npm start`
3. Application will be available at `http://localhost:3000`

### Production Deployment
The application is ready for deployment to any static hosting service:
- **Vercel**: Automatic deployment from Git
- **Netlify**: Drag and drop deployment
- **GitHub Pages**: Static site hosting
- **AWS S3**: Static website hosting
- **Docker**: Containerized deployment

### Docker Support
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Backstage**: Inspiration for the service catalog concept
- **React Ecosystem**: All the amazing libraries and tools
- **Tailwind CSS**: For making styling a breeze
- **Recharts**: For beautiful and interactive data visualization

## 📞 Support

For support, email support@company.com or join our Slack channel #dashboard-support.

---

**Enterprise Dashboard** - Making service monitoring beautiful and accessible! 🎯
