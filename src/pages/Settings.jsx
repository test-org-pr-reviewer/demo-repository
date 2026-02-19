import { useState } from 'react'
import { 
  Shield, 
  Bell, 
  Sun, 
  Moon, 
  Database, 
  Users, 
  Key, 
  Globe, 
  Save, 
  RefreshCw,
  Plus,
  Trash2,
  Edit
} from 'lucide-react'
import { useStore } from '../store/useStore'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const settings = useStore((state) => state.settings)
  const updateSettings = useStore((state) => state.updateSettings)
  
  const [formData, setFormData] = useState(settings)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    updateSettings(formData)
    setIsSaving(false)
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'integrations', name: 'Integrations', icon: Database },
    { id: 'users', name: 'Users & Teams', icon: Users },
  ]

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="light"
                  checked={formData.theme === 'light'}
                  onChange={(e) => setFormData({...formData, theme: e.target.value})}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 flex items-center">
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="dark"
                  checked={formData.theme === 'dark'}
                  onChange={(e) => setFormData({...formData, theme: e.target.value})}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 flex items-center">
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Auto-refresh</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.autoRefresh}
                  onChange={(e) => setFormData({...formData, autoRefresh: e.target.checked})}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2">Enable auto-refresh</span>
              </label>
              {formData.autoRefresh && (
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">Interval:</label>
                  <select
                    value={formData.refreshInterval}
                    onChange={(e) => setFormData({...formData, refreshInterval: parseInt(e.target.value)})}
                    className="input-field text-sm"
                  >
                    <option value={15}>15 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={60}>1 minute</option>
                    <option value={300}>5 minutes</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Time Range</label>
            <select
              value="24h"
              className="input-field"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention</label>
            <select
              value="30d"
              className="input-field"
            >
              <option value="7d">7 days</option>
              <option value="30d">30 days</option>
              <option value="90d">90 days</option>
              <option value="1y">1 year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
              <p className="text-sm text-gray-500">Receive email alerts for critical issues</p>
            </div>
            <input
              type="checkbox"
              checked={formData.notifications}
              onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
              className="text-primary-600 focus:ring-primary-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Alert Thresholds</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">CPU Usage (%)</label>
                <input
                  type="number"
                  value="80"
                  className="input-field"
                  placeholder="80"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Memory Usage (%)</label>
                <input
                  type="number"
                  value="85"
                  className="input-field"
                  placeholder="85"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Error Rate (%)</label>
                <input
                  type="number"
                  value="5"
                  className="input-field"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Response Time (ms)</label>
                <input
                  type="number"
                  value="1000"
                  className="input-field"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-500">admin@company.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600">
                <Edit className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <Plus className="h-4 w-4" />
            <span>Add Notification Channel</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
              <select className="input-field">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry</label>
              <select className="input-field">
                <option>Never</option>
                <option>30 days</option>
                <option>60 days</option>
                <option>90 days</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
              <span className="ml-2">Enable Two-Factor Authentication</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
              <span className="ml-2">Require VPN Access</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Access</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium">Monitoring API</p>
              <p className="text-sm text-gray-500">API key for external monitoring systems</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600">
                <Key className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <Plus className="h-4 w-4" />
            <span>Generate New API Key</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Services</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Slack', connected: true, icon: 'S' },
              { name: 'PagerDuty', connected: false, icon: 'P' },
              { name: 'Datadog', connected: true, icon: 'D' },
              { name: 'New Relic', connected: false, icon: 'N' },
              { name: 'Grafana', connected: true, icon: 'G' },
              { name: 'Prometheus', connected: true, icon: 'P' },
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium">{service.icon}</span>
                  </div>
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className={`text-sm ${service.connected ? 'text-green-600' : 'text-red-600'}`}>
                      {service.connected ? 'Connected' : 'Not Connected'}
                    </p>
                  </div>
                </div>
                <button className="btn-secondary text-sm">
                  {service.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Webhooks</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium">Service Status Changes</p>
              <p className="text-sm text-gray-500">https://hooks.example.com/status</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-green-600">
                <RefreshCw className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Edit className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <Plus className="h-4 w-4" />
            <span>Add Webhook</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderUsersSettings = () => (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
        <div className="space-y-4">
          {[
            { name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active' },
            { name: 'Jane Smith', email: 'jane@company.com', role: 'Developer', status: 'Active' },
            { name: 'Bob Wilson', email: 'bob@company.com', role: 'Viewer', status: 'Inactive' },
          ].map((user) => (
            <div key={user.email} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                  user.role === 'Developer' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Teams</h3>
        <div className="space-y-4">
          {[
            { name: 'Platform Team', members: 5, services: 8 },
            { name: 'Backend Team', members: 3, services: 4 },
            { name: 'Data Team', members: 2, services: 3 },
          ].map((team) => (
            <div key={team.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{team.name}</p>
                  <p className="text-sm text-gray-500">{team.members} members • {team.services} services</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary text-sm">Manage</button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings()
      case 'notifications': return renderNotificationSettings()
      case 'security': return renderSecuritySettings()
      case 'integrations': return renderIntegrationsSettings()
      case 'users': return renderUsersSettings()
      default: return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure your dashboard preferences and system settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default Settings