import { useState } from 'react'
import {
  RiSearchLine,
  RiCalendarLine,
  RiBellLine,
  RiAddLine,
  RiMenuLine,
  RiCheckDoubleLine,
} from 'react-icons/ri'
import { useApp } from '../context/AppContext'

const PAGE_ACTIONS = {
  dashboard: { btn: '+ New Transaction', modal: 'quickIncome', breadcrumb: ['DASHBOARD', 'Overview'] },
  transactions: { btn: 'Record Transaction', modal: 'quickExpense', breadcrumb: ['FISCAL AUDIT PROTOCOL', 'Real-Time Ledger'] },
  budgets: { btn: 'Create New Budget', modal: 'newBudget', breadcrumb: ['FISCAL SAFEGUARD ENGINE', 'Realtime Ledger Synced'] },
  analytics: { btn: 'Export Dossier', modal: 'exportPdf', breadcrumb: ['INTELLIGENCE HUB', 'May 2025 Ledger Cycle'] },
  recurring: { btn: 'Add Schedule', modal: 'quickExpense', breadcrumb: ['AUTOMATED CASHFLOW', '8 Active Schedules'] },
  wallets: { btn: 'Link New Bank', modal: 'linkBank', breadcrumb: ['WALLET MANAGEMENT', 'Multi-Currency'] },
  settings: { btn: 'Save Changes', modal: null, breadcrumb: ['SYSTEM CONFIGURATION', 'Preferences'] },
}

export default function TopNav({ activePage }) {
  const { user, openModal, setSidebarOpen, showToast, logout } = useApp()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const config = PAGE_ACTIONS[activePage] || PAGE_ACTIONS.dashboard

  const handleActionClick = () => {
    if (config.modal) {
      openModal(config.modal)
    } else {
      showToast('Settings changes saved.')
    }
  }

  return (
    <header className="bf-topnav">
      {/* Mobile Hamburger Menu Toggle */}
      <button
        className="btn btn-link text-dark d-lg-none p-0 me-2"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation menu"
      >
        <RiMenuLine size={22} />
      </button>

      {/* Search */}
      <div className="bf-search">
        <RiSearchLine className="search-icon" size={14} />
        <input
          placeholder="Search transactions, rules, counterparties…"
          aria-label="Search transactions"
        />
        <span className="bf-kbd">⌘K</span>
      </div>

      {/* Right side */}
      <div className="bf-topnav-right">
        {/* Date Picker Pill */}
        <div
          className="bf-date-select d-none d-sm-flex"
          onClick={() => showToast('Active Ledger Period: May 2025 (MTD)')}
        >
          <RiCalendarLine size={14} style={{ color: 'var(--bf-primary)' }} />
          <span>May 2025</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Notification Bell */}
        <div className="position-relative">
          <div
            className="bf-notif-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <RiBellLine size={16} />
            <span className="notif-badge">3</span>
          </div>

          {showNotifications && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded shadow-lg border p-3"
              style={{ width: 280, zIndex: 1100 }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <span className="fw-bold small">Alerts &amp; Notifications</span>
                <span
                  className="text-muted small"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowNotifications(false)}
                >
                  <RiCheckDoubleLine /> Mark read
                </span>
              </div>
              <div className="d-flex flex-column gap-2 small">
                <div className="p-2 rounded bg-light">
                  <div className="fw-semibold text-danger">80% Food &amp; Dining Limit reached</div>
                  <div className="text-muted" style={{ fontSize: '10.5px' }}>
                    14.2% faster burn than April
                  </div>
                </div>
                <div className="p-2 rounded bg-light">
                  <div className="fw-semibold text-success">₦450k Design Retainer Cleared</div>
                  <div className="text-muted" style={{ fontSize: '10.5px' }}>
                    Credited into USD Dom Vault
                  </div>
                </div>
                <div className="p-2 rounded bg-light">
                  <div className="fw-semibold text-primary">Automated Ledger Snapshot Synced</div>
                  <div className="text-muted" style={{ fontSize: '10.5px' }}>
                    AWS Frankfurt / Spanner
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic CTA Button */}
        <button className="bf-btn-primary" onClick={handleActionClick}>
          <RiAddLine size={16} />
          <span className="d-none d-sm-inline">{config.btn}</span>
        </button>

        {/* Avatar with Dropdown info for Bamigbola Abdulmalik Opeyemi */}
        <div className="position-relative">
          <div
            className="bf-avatar"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            title={user.fullName}
          >
            {user.avatarInitials}
          </div>

          {showUserDropdown && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded shadow-lg border p-3"
              style={{ width: 240, zIndex: 1100 }}
            >
              <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--bf-primary), #007d52)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {user.avatarInitials}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div className="fw-bold small text-truncate">{user.displayName}</div>
                  <div className="text-muted" style={{ fontSize: '10.5px' }}>
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="small text-muted mb-2">
                <div>Entity: <strong>{user.entityName}</strong></div>
                <div>Status: <span className="text-success fw-bold">Active Pro Tier</span></div>
              </div>
              <button
                className="btn btn-sm btn-outline-danger w-100"
                onClick={() => {
                  setShowUserDropdown(false)
                  logout()
                }}
              >
                Sign Out / Switch Workspace
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
