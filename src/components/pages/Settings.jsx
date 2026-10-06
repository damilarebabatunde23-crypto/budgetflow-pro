import { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useApp } from '../../context/AppContext'
import {
  RiCheckLine,
  RiAlertLine,
  RiShieldLine,
  RiDownload2Line,
  RiDeleteBin6Line,
} from 'react-icons/ri'

const SECTIONS_NAV = [
  'General & Profile',
  'Security & Multi-FX',
  'Connected Banks',
  'Threshold Alerts',
  'Data Export & Audit',
  'API & Webhooks',
]

function Toggle({ on }) {
  const [state, setState] = useState(on)
  return <div className={`toggle-switch ${state ? 'on' : ''}`} onClick={() => setState(!state)} />
}

export default function Settings() {
  const { user, setUser, showToast, openModal } = useApp()

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    displayName: user.displayName,
    entityName: user.entityName,
    tin: user.tin,
  })

  const handleSave = e => {
    e.preventDefault()
    setUser(prev => ({ ...prev, ...formData }))
    showToast('Profile and system configuration saved successfully!')
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className="d-flex justify-content-center pt-3 pb-1">
        <small style={{ color: 'var(--bf-muted)', fontSize: 11 }}>
          SETTINGS VIEWS — Use arrows to navigate
        </small>
      </div>

      <div style={{ padding: '0 8px' }}>
        <Carousel indicators controls interval={null} style={{ borderRadius: 12, overflow: 'hidden' }}>
          {/* Slide 1 — Profile + Currency + Security */}
          <Carousel.Item>
            <div className="bf-page" style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: 40 }}>
              <div className="bf-breadcrumb mb-1">
                <span>SYSTEM CONFIGURATION</span>
                <span className="sep">›</span>
                <span>Preferences</span>
                <span className="ms-2 bf-badge bf-badge-green">v8.3.2</span>
              </div>
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
                <div>
                  <h1 className="bf-page-title">Settings &amp; System Preferences</h1>
                  <p className="bf-page-subtitle">
                    Configure multi-currency ledgers, security protocols, API keys, automated burn feeds, and export schedules.
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="bf-btn-outline"
                    onClick={() => {
                      setFormData({
                        fullName: user.fullName,
                        displayName: user.displayName,
                        entityName: user.entityName,
                        tin: user.tin,
                      })
                      showToast('Unsaved changes discarded.', 'info')
                    }}
                  >
                    ↺ Discard
                  </button>
                  <button className="bf-btn-primary" onClick={handleSave}>
                    💾 Save Changes
                  </button>
                </div>
              </div>

              <div className="row g-3">
                {/* Left: nav */}
                <div className="col-lg-3">
                  <div className="bf-card p-2 shadow-sm border-0">
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: 'var(--bf-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        padding: '8px 12px',
                      }}
                    >
                      NAVIGATION · {SECTIONS_NAV.length} Sections
                    </div>
                    {SECTIONS_NAV.map((s, i) => (
                      <div
                        key={s}
                        style={{
                          padding: '9px 12px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          background: i === 0 ? 'var(--bf-primary-light)' : 'transparent',
                          color: i === 0 ? 'var(--bf-primary)' : 'var(--bf-text)',
                          fontWeight: i === 0 ? 700 : 500,
                          fontSize: 12,
                          marginBottom: 2,
                        }}
                      >
                        {s}
                        {i === 1 && <span className="bf-badge bf-badge-red ms-2">2FA</span>}
                        {i === 2 && <span className="bf-badge bf-badge-green ms-2">4/4</span>}
                      </div>
                    ))}

                    {/* Sync status */}
                    <div style={{ borderTop: '1px solid var(--bf-border)', marginTop: 12, paddingTop: 12 }}>
                      <div style={{ fontSize: 10, color: 'var(--bf-muted)', fontWeight: 600 }}>
                        DAILY SYNCED · 100%
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--bf-muted)', marginTop: 4, lineHeight: 1.4 }}>
                        Automated daily ledger heartbeat auto-synced via certified DNM attestation service
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: content */}
                <div className="col-lg-9">
                  {/* Profile */}
                  <div className="settings-section shadow-sm border-0">
                    <div className="settings-section-title">
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--bf-primary), #007d52)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 800,
                          fontSize: 13,
                        }}
                      >
                        {user.avatarInitials}
                      </div>
                      <div>
                        <div className="fw-bold">{user.fullName}</div>
                        <div style={{ fontSize: 11, fontWeight: 400, color: 'var(--bf-muted)' }}>
                          {user.email} · {user.entityName} compliant
                        </div>
                      </div>
                      <div className="ms-auto text-end">
                        <div style={{ fontSize: 10, color: 'var(--bf-muted)' }}>SUBSCRIPTION PLAN</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--bf-primary)' }}>
                          {user.plan}
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--bf-muted)' }}>Active from Nov 2024</div>
                        <div
                          style={{ fontSize: 11, color: 'var(--bf-primary)', cursor: 'pointer' }}
                          onClick={() => showToast('Subscription active: Pro Enterprise Tier.')}
                        >
                          Manage Subscription →
                        </div>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="bf-label">Full Legal Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        />
                        <div style={{ fontSize: 10, color: 'var(--bf-muted)', marginTop: 3 }}>
                          Matches corporate banking compliance registries
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="bf-label">Display / Preferred Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.displayName}
                          onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                        />
                        <div style={{ fontSize: 10, color: 'var(--bf-muted)', marginTop: 3 }}>
                          Appears in ledger audit trails &amp; notifications
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="bf-label">Business / Entity Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.entityName}
                          onChange={e => setFormData({ ...formData, entityName: e.target.value })}
                        />
                        <div style={{ fontSize: 10, color: 'var(--bf-muted)', marginTop: 3 }}>
                          Primary reporting unit for consolidated cashflows
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="bf-label">Tax Identification Number (TIN)</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value={formData.tin}
                            onChange={e => setFormData({ ...formData, tin: e.target.value })}
                          />
                          <span className="input-group-text bg-white text-success">
                            <RiCheckLine />
                          </span>
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--bf-muted)', marginTop: 3 }}>
                          FIRS Verified · Active tax filing status
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Regional & Currency */}
                  <div className="settings-section shadow-sm border-0">
                    <div className="settings-section-title">
                      <span>🌍</span> Regional, Currency &amp; Ledger Formatting
                      <span className="ms-auto bf-badge bf-badge-gray">ISO 4217</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--bf-muted)', marginBottom: 16 }}>
                      Define foundational currency valuation rules and numerical presentations
                    </div>
                    <div className="row g-3 mb-3">
                      {[
                        {
                          label: 'PRIMARY BASE',
                          val: '₦ NGN',
                          sub: 'Nigerian Naira',
                          note: 'Ledger Denomination · Default',
                        },
                        {
                          label: 'SECONDARY MULTI-FX',
                          val: '$ USD',
                          sub: 'US Dollar',
                          note: 'Conversion: 1 USD = ₦1,500.00 Active',
                        },
                        {
                          label: 'SECONDARY MULTI-FX',
                          val: '£ GBP',
                          sub: 'British Pound',
                          note: 'Conversion: 1 GBP = ₦1,980.22 Active',
                        },
                      ].map(({ label, val, sub, note }) => (
                        <div className="col-md-4" key={val}>
                          <div
                            style={{
                              border: '1px solid var(--bf-primary)',
                              borderRadius: 10,
                              padding: 14,
                              background: 'var(--bf-primary-light)',
                            }}
                          >
                            <div
                              style={{
                                fontSize: 9,
                                fontWeight: 700,
                                color: 'var(--bf-muted)',
                                letterSpacing: 0.5,
                                textTransform: 'uppercase',
                                marginBottom: 4,
                              }}
                            >
                              {label}
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--bf-text)' }}>
                              {val}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--bf-text)' }}>
                              {sub}
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--bf-muted)', marginTop: 4 }}>
                              {note}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        background: 'var(--bf-bg)',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 12,
                        color: 'var(--bf-muted)',
                      }}
                    >
                      Real-Time FX Conversion Provider: Central Bank CBN Official Mid-Market / NAFEM Feed · Auto-sync hourly &nbsp;
                      <span className="bf-badge bf-badge-green">● Live CBN Socket</span>
                      &nbsp;{' '}
                      <span
                        style={{ color: 'var(--bf-primary)', cursor: 'pointer', fontWeight: 600 }}
                        onClick={() => showToast('NAFEM Exchange rates resynced!')}
                      >
                        Force Sync
                      </span>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="settings-section shadow-sm border-0">
                    <div className="settings-section-title">
                      <RiShieldLine size={18} color="var(--bf-primary)" />
                      Security &amp; Access Protocols
                      <span className="ms-auto bf-badge bf-badge-blue">SOC-2 TYPE II</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--bf-muted)', marginBottom: 16 }}>
                      Protect sensitive fiscal ledgers with multi-tier hardware and software authenticators
                    </div>

                    <div className="row g-3 mb-3">
                      {[
                        {
                          title: 'Two-Factor Authentication (2FA)',
                          badge: 'ENFORCED',
                          sub: 'Status: Enabled via Authenticator App (TOTP)',
                          sub2: 'Regenerate Backup Codes',
                          color: 'green',
                        },
                        {
                          title: 'Biometric Authentication',
                          badge: 'ACTIVE',
                          sub: 'TouchID + FaceID (WebAuthn/FIDO2 Passkeys)',
                          sub2: 'Configure Passkeys',
                          color: 'blue',
                        },
                      ].map(({ title, badge, sub, sub2, color }) => (
                        <div className="col-md-6" key={title}>
                          <div style={{ border: '1px solid var(--bf-border)', borderRadius: 10, padding: 14 }}>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <span style={{ fontSize: 13, fontWeight: 700 }}>{title}</span>
                              <span className={`bf-badge bf-badge-${color}`}>{badge}</span>
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--bf-muted)' }}>{sub}</div>
                            <div
                              style={{
                                fontSize: 11,
                                color: 'var(--bf-primary)',
                                fontWeight: 600,
                                marginTop: 4,
                                cursor: 'pointer',
                              }}
                              onClick={() => showToast(`${title} configuration verified.`)}
                            >
                              {sub2}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Active sessions */}
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                      Active Authorized Sessions
                    </div>
                    {[
                      { device: 'MacBook Pro 16" — Lagos, Nigeria', time: 'Active Now', color: 'green' },
                      { device: 'iPhone 15 Pro — Victoria Island, Lagos', time: 'Active 12m ago', color: 'gray' },
                    ].map(({ device, time, color }) => (
                      <div
                        key={device}
                        className="d-flex align-items-center justify-content-between py-2 border-bottom"
                        style={{ fontSize: 12 }}
                      >
                        <span>{device}</span>
                        <span className={`bf-badge bf-badge-${color}`}>{time}</span>
                      </div>
                    ))}
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--bf-primary)',
                        marginTop: 8,
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                      onClick={() => showToast('All secondary sessions revoked successfully.')}
                    >
                      Revoke Other Sessions →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 2 — Alerts + Data + Danger Zone */}
          <Carousel.Item>
            <div className="bf-page" style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: 40 }}>
              <h1 className="bf-page-title mb-4">Notifications, Data &amp; Danger Zone</h1>

              <div className="row g-3">
                <div className="col-lg-8">
                  {/* Budget Alerts */}
                  <div className="settings-section shadow-sm border-0">
                    <div className="settings-section-title">
                      <RiAlertLine color="var(--bf-warning)" size={18} />
                      Budget Alerts &amp; Threshold Notifications
                      <span className="ms-auto bf-badge bf-badge-gray">INSTANT PUSH</span>
                    </div>
                    {[
                      {
                        label: '80% Caution Alert',
                        desc: 'Triggers notification when an envelope category crosses 80% before day 20 of billing cycle. Channels: Push Notification + Registered Email',
                        badge: 'PREVENTATIVE',
                        on: true,
                        badgeColor: 'yellow',
                      },
                      {
                        label: '100% Hard Ceiling Breach',
                        desc: 'Immediate dispatch upon budget exhaustion. Disables auto-sweep until manual authorization. Channels: Priority SMS + Instant Webhook + High-Priority Push',
                        badge: 'CRITICAL',
                        on: true,
                        badgeColor: 'red',
                      },
                      {
                        label: 'Weekly Digest & Cashflow Runway Summary',
                        desc: 'Curated PDF & interactive digest delivered Mondays at 08:00 AM West Africa Time (WAT).',
                        badge: 'SCHEDULED',
                        on: true,
                        badgeColor: 'blue',
                      },
                      {
                        label: 'Auto-Sweep & Cushion Savings Notification',
                        desc: 'Notifies when surplus operating funds are routed into high-yield treasury cushions.',
                        badge: 'RETENTION',
                        on: true,
                        badgeColor: 'green',
                      },
                    ].map(({ label, desc, badge, on, badgeColor }) => (
                      <div
                        key={label}
                        className="d-flex align-items-center justify-content-between py-3 border-bottom gap-3"
                      >
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
                            {badge && <span className={`bf-badge bf-badge-${badgeColor}`}>{badge}</span>}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--bf-muted)' }}>{desc}</div>
                        </div>
                        <Toggle on={on} />
                      </div>
                    ))}
                  </div>

                  {/* Data Backup */}
                  <div className="settings-section shadow-sm border-0">
                    <div className="settings-section-title">
                      🗄️ Data Backup, Offline Cache &amp; Danger Zone
                      <span className="ms-auto bf-badge bf-badge-blue">REDUNDANT</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--bf-muted)', marginBottom: 16 }}>
                      Manage offline-indexed database storage, immutable cloud replication, and account lifecycle.
                    </div>

                    <div className="row g-3 mb-4">
                      {[
                        {
                          label: 'Local Offline Cache (IndexedDB)',
                          desc: '48.2 MB stored locally (1,428 audited transactions indexed for zero-latency retrieval).',
                          btn: 'Clear Local Cache',
                          note: 'Last synced: 2 hrs ago',
                        },
                        {
                          label: 'Automated Daily Cloud Backup',
                          desc: 'Google Cloud Spanner / AWS S3 Encrypted snapshot replication across Frankfurt & Johannesburg regions.',
                          btn: 'Trigger Manual Snapshot',
                          note: 'ACTIVE — 99.99% SLA',
                        },
                      ].map(({ label, desc, btn, note }) => (
                        <div className="col-md-6" key={label}>
                          <div style={{ border: '1px solid var(--bf-border)', borderRadius: 10, padding: 14 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{label}</div>
                            <div style={{ fontSize: 11, color: 'var(--bf-muted)', marginBottom: 10 }}>{desc}</div>
                            <div style={{ fontSize: 10, color: 'var(--bf-muted)', marginBottom: 8 }}>{note}</div>
                            <button
                              className="bf-btn-outline"
                              style={{ fontSize: 11, padding: '4px 10px' }}
                              onClick={() => showToast(`${btn} completed.`)}
                            >
                              {btn}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Danger Zone */}
                    <div style={{ border: '1px solid #e74c3c', borderRadius: 10, padding: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#e74c3c', marginBottom: 16 }}>
                        🔴 DANGER ZONE
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--bf-muted)', marginBottom: 16 }}>
                        Irreversible operations regarding historical financial records.
                      </div>

                      {[
                        {
                          label: 'Export Complete Ledger Archive',
                          desc: 'Download compressed bundle containing all JSON ledger rows and cryptographic checksum receipts.',
                          btn: 'Export Archive (.ZIP)',
                          btnStyle: 'outline',
                          icon: <RiDownload2Line />,
                          action: () => showToast('Archive ZIP packaging started. Download will begin shortly.'),
                        },
                        {
                          label: 'Delete Account & Purge Data',
                          desc: 'Permanently deletes Workspace BF-94821 and purges all bank feed tokens in accordance with NDPR & GDPR compliance.',
                          btn: 'Purge Workspace',
                          btnStyle: 'danger',
                          icon: <RiDeleteBin6Line />,
                          action: () => showToast('Account deletion request initiated.', 'error'),
                        },
                      ].map(({ label, desc, btn, btnStyle, icon, action }) => (
                        <div
                          key={label}
                          className="d-flex align-items-center justify-content-between py-3 border-bottom gap-3 flex-wrap"
                        >
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
                            <div style={{ fontSize: 11, color: 'var(--bf-muted)' }}>{desc}</div>
                          </div>
                          <button
                            className={btnStyle === 'danger' ? 'bf-btn-primary' : 'bf-btn-outline'}
                            style={
                              btnStyle === 'danger'
                                ? { background: '#e74c3c', fontSize: 12 }
                                : { fontSize: 12, borderColor: '#e74c3c', color: '#e74c3c' }
                            }
                            onClick={action}
                          >
                            {icon} {btn}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right quick info */}
                <div className="col-lg-4">
                  <div className="bf-card shadow-sm border-0">
                    <div className="bf-section-title mb-3">Account Summary</div>
                    {[
                      { label: 'Authorized Signatory', val: user.displayName },
                      { label: 'Plan', val: user.plan },
                      { label: 'Member Since', val: 'Nov 2024' },
                      { label: 'Total Transactions', val: '1,428 Records' },
                      { label: 'Connected Banks', val: '4 Active Vaults' },
                      { label: 'Active Budgets', val: '4 Categories' },
                      { label: 'API Keys', val: '2 Active' },
                    ].map(({ label, val }) => (
                      <div
                        key={label}
                        className="d-flex justify-content-between py-2 border-bottom"
                        style={{ fontSize: 12 }}
                      >
                        <span style={{ color: 'var(--bf-muted)' }}>{label}</span>
                        <span style={{ fontWeight: 700 }}>{val}</span>
                      </div>
                    ))}

                    <button
                      className="bf-btn-primary w-100 mt-4 justify-content-center"
                      onClick={() => openModal('exportPdf')}
                    >
                      <RiDownload2Line size={16} /> Generate Certified PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  )
}
