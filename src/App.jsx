import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import Modals from './components/Modals'
import Toasts from './components/Toasts'

import Auth from './components/pages/Auth'
import Analytics from './components/pages/Analytics'
import Transactions from './components/pages/Transactions'
import Budgets from './components/pages/Budgets'
import Recurring from './components/pages/Recurring'
import Settings from './components/pages/Settings'
import Wallets from './components/pages/Wallets'
import Dashboard from './components/pages/Dashboard'

const PAGES = {
  dashboard: Dashboard,
  transactions: Transactions,
  budgets: Budgets,
  analytics: Analytics,
  recurring: Recurring,
  wallets: Wallets,
  settings: Settings,
}

function MainLayout() {
  const { isAuthenticated } = useApp()
  const [activePage, setActivePage] = useState('dashboard')

  // If user is not logged in, show the Login/Signup Screen
  if (!isAuthenticated) {
    return (
      <>
        <Auth />
        <Toasts />
      </>
    )
  }

  const PageComponent = PAGES[activePage] || Dashboard

  return (
    <div className="bf-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="bf-main">
        <TopNav activePage={activePage} />
        <PageComponent />
      </div>
      <Modals />
      <Toasts />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  )
}
