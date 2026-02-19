import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import Sidebar from './Sidebar'
import Header from './Header'
import AlertBanner from './AlertBanner'

const Layout = () => {
  const location = useLocation()
  const [isInitialized, setIsInitialized] = useState(false)
  const sidebarCollapsed = useStore((state) => state.sidebarCollapsed)
  const initializeDemoData = useStore((state) => state.initializeDemoData)

  useEffect(() => {
    if (!isInitialized) {
      initializeDemoData()
      setIsInitialized(true)
    }
  }, [isInitialized, initializeDemoData])

  // Hide sidebar on mobile for certain routes
  const hideSidebarRoutes = ['/login', '/signup']
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!shouldHideSidebar && (
        <Sidebar collapsed={sidebarCollapsed} />
      )}
      
      <div className={`flex-1 flex flex-col ${shouldHideSidebar ? '' : sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <Header />
        
        <main className="flex-1 overflow-auto">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <AlertBanner />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout