import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center animate-fade-in">
        <div>
          <div className="mx-auto h-24 w-24 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center">
            <div className="text-white text-4xl font-bold">4</div>
            <div className="text-white text-4xl font-bold rotate-180">4</div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Page not found</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-soft">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Here are some helpful links:</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                ← Go to Dashboard
              </button>
              <button
                onClick={() => navigate('/services')}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                Services Overview
              </button>
              <button
                onClick={() => navigate('/metrics')}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                System Metrics
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                Settings
              </button>
            </div>
          </div>
          
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center justify-center space-x-2 w-full"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go back</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound