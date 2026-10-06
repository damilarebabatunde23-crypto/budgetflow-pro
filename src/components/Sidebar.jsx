import {
  RiDashboardLine,
  RiExchangeDollarLine,
  RiWalletLine,
  RiBarChart2Line,
  RiLoopLeftLine,
  RiBankLine,
  RiSettings4Line,
  RiCloudLine,
  RiCloseLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri'
import { useApp } from '../context/AppContext'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: RiDashboardLine },
  { id: 'transactions', label: 'Transactions', icon: RiExchangeDollarLine },
  { id: 'budgets', label: 'Budgets', icon: RiWalletLine },
  { id: 'analytics', label: 'Analytics', icon: RiBarChart2Line },
  { id: 'recurring', label: 'Recurring', icon: RiLoopLeftLine },
  { id: 'wallets', label: 'Wallets', icon: RiBankLine },
  { id: 'settings', label: 'Settings', icon: RiSettings4Line },
]

export default function Sidebar({ activePage, onNavigate }) {
  const { currency, setCurrency, sidebarOpen, setSidebarOpen, user, logout } = useApp()

  const handleNavClick = id => {
    onNavigate(id)
    if (window.innerWidth < 992) {
      setSidebarOpen(false)
    }
  }

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="bf-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`bf-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="bf-sidebar-logo d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="bf-logo-icon">B</div>
            <div>
              <div className="bf-logo-text">BudgetFlow</div>
              <span className="bf-logo-badge">PRO</span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            className="btn btn-sm btn-link text-white d-lg-none p-0"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        {/* User Mini Card */}
        <div className="px-3 pt-3 pb-2 d-flex align-items-center gap-2 border-bottom border-secondary border-opacity-10">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--bf-primary), #007d52)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '12px',
              flexShrink: 0,
            }}
          >
            {user.avatarInitials}
          </div>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            <div className="text-white small fw-bold" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {user.displayName}
            </div>
            <div className="text-muted" style={{ fontSize: '10px' }}>
              {user.plan.split(' ')[0]} Active
            </div>
          </div>
          <button
            className="btn btn-sm btn-link text-white-50 p-1 ms-auto"
            onClick={logout}
            title="Sign Out of Workspace"
            aria-label="Sign Out"
          >
            <RiLogoutBoxRLine size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="bf-nav">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <div
              key={id}
              className={`bf-nav-item ${activePage === id ? 'active' : ''}`}
              onClick={() => handleNavClick(id)}
            >
              <Icon />
              <span>{label}</span>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="bf-sidebar-footer">
          <div className="currency-switch">
            <span>CURRENCY</span>
            <button
              className={`currency-btn ${currency === 'NGN' ? 'active' : ''}`}
              onClick={() => setCurrency('NGN')}
            >
              ₦ NGN
            </button>
            <button
              className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
              onClick={() => setCurrency('USD')}
            >
              $ USD
            </button>
          </div>
          <div className="cloud-sync">
            <div className="sync-dot" />
            <RiCloudLine size={14} />
            <span>Cloud Sync Active</span>
          </div>
        </div>
      </aside>
    </>
  )
}
