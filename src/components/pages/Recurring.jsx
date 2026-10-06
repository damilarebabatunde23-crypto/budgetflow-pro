import { Carousel } from 'react-bootstrap'
import { RiAddLine, RiSettings4Line, RiDeleteBinLine } from 'react-icons/ri'

const RECURRING = [
  {
    name: 'AWS Cloud Infrastructure',
    badges: [{ text: 'Active', color: 'green' }, { text: 'Auto-Debit', color: 'blue' }],
    detail: 'Monthly on 24th · Debits USD Domiciliary (***9012)',
    next: 'Next: May 24, 2025',
    cluster: 'DevOps & Compute Cluster',
    amount: '₦210,000',
    monthly: '$140.00 / month',
    icon: '☁️', iconBg: '#e8f4fd',
    action: 'Manage',
  },
  {
    name: 'Office Studio Leasehold (Quarterly)',
    badges: [{ text: 'Escrow Reserved', color: 'yellow' }],
    detail: 'Next billing: June 1, 2025 · Account: GTBank Corporate (***4410)',
    next: 'in 14 Days · Amortized at ₦150,000/mo',
    cluster: '',
    amount: '₦450,000',
    monthly: 'Quarterly charge',
    icon: '🏢', iconBg: '#f5eef8',
    action: 'Manage',
  },
  {
    name: 'Senior Backend Engineer Retainer',
    badges: [{ text: 'Auto-Disburse', color: 'gray' }],
    detail: 'Bi-weekly on 15th & 30th · Source: GTBank Corporate (***4410)',
    next: 'Next run: May 30 · Core Engineering / Contractor',
    cluster: '',
    amount: '₦350,000',
    monthly: '₦700,000 monthly run-rate',
    icon: '👨‍💻', iconBg: '#e6f9f2',
    action: 'Modify',
  },
  {
    name: 'Fibre Business Internet (MTN)',
    badges: [{ text: 'Due in 3 Days', color: 'red' }],
    detail: 'Monthly on 19th · Debit mandate confirmed on GTBank',
    next: 'Next: May 19, 2025 · Lekki Phase 1 HQ Terminal',
    cluster: '',
    amount: '₦28,000',
    monthly: 'Auto-Pay Prepared',
    icon: '📡', iconBg: '#e8f4fd',
    action: 'Details',
  },
  {
    name: 'Netflix Premium 4K + Spotify Family',
    badges: [{ text: 'Renewed May 7', color: 'green' }],
    detail: 'Monthly on 7th · Card ending in Mastercard (***8832)',
    next: 'Next debit: June 7, 2025 · Entertainment & Media',
    cluster: '',
    amount: '₦11,500',
    monthly: 'Settled this period',
    icon: '🎬', iconBg: '#fef0ef',
    action: 'History',
  },
  {
    name: 'Figma Enterprise & GitHub Teams',
    badges: [{ text: 'USD Vault', color: 'blue' }],
    detail: 'Monthly on 1st · USD Virtual Debit Card',
    next: 'Next cycle: June 1, 2025 · 1 seat flag',
    cluster: '',
    amount: '₦67,500',
    monthly: '$45.00 / month',
    icon: '🎨', iconBg: '#f5eef8',
    action: 'Manage Seats',
  },
]

function RecurringItem({ item }) {
  return (
    <div className="rec-item">
      <div className="d-flex align-items-start gap-3">
        <div style={{ width: 40, height: 40, borderRadius: 10, background: item.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
          {item.icon}
        </div>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
            <span style={{ fontWeight: 700, fontSize: 13 }}>{item.name}</span>
            {item.badges.map(b => (
              <span key={b.text} className={`bf-badge bf-badge-${b.color}`}>{b.text}</span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--bf-muted)' }}>{item.detail}</div>
          <div style={{ fontSize: 11, color: 'var(--bf-muted)', marginTop: 2 }}>
            <span style={{ color: 'var(--bf-text)', fontWeight: 600 }}>{item.next}</span>
            {item.cluster && <> &nbsp;·&nbsp; {item.cluster}</>}
          </div>
        </div>
        <div className="text-end" style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--bf-text)', letterSpacing: -0.5 }}>{item.amount}</div>
          <div style={{ fontSize: 11, color: 'var(--bf-muted)' }}>{item.monthly}</div>
          <button className="bf-btn-outline mt-2" style={{ padding: '4px 12px', fontSize: 11 }}>{item.action}</button>
        </div>
      </div>
    </div>
  )
}

export default function Recurring() {
  return (
    <div style={{ position: 'relative' }}>
      <div className="d-flex justify-content-center pt-3 pb-1">
        <small style={{ color: 'var(--bf-muted)', fontSize: 11 }}>RECURRING VIEWS — Use arrows to navigate</small>
      </div>

      <div style={{ padding: '0 8px' }}>
        <Carousel indicators controls interval={null}
          style={{ borderRadius: 12, overflow: 'hidden' }}>

          {/* Slide 1 — Active Commitments */}
          <Carousel.Item>
            <div className="bf-page" style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: 40 }}>
              <div className="bf-breadcrumb mb-1">
                <span className="intel-badge"><span className="intel-dot" />AUTOMATED CASHFLOW &amp; COMMITMENTS</span>
                <span className="sep">·</span>
                <span>8 Active Schedules</span>
              </div>
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
                <div>
                  <h1 className="bf-page-title">Recurring Charges &amp; Subscriptions</h1>
                  <p className="bf-page-subtitle">Monitor contractual billings, recurring salary disbursements, SaaS subscriptions, and scheduled debt amortizations across dual-currency vaults.</p>
                </div>
                <div className="d-flex gap-2">
                  <button className="bf-btn-outline">📋 List</button>
                  <button className="bf-btn-outline">📅 Calendar</button>
                  <button className="bf-btn-outline">📈 Run Forecast Model</button>
                  <button className="bf-btn-primary"><RiAddLine /> Add Schedule</button>
                </div>
              </div>

              {/* KPIs */}
              <div className="row g-3 mb-4">
                {[
                  { label: 'Monthly Commitments', count: '8 Active', val: '₦318,450', note: 'Next run: May 18 (in 2 days)' },
                  { label: 'Due in Next 7 Days', count: '3 Due Soon', val: '₦82,000', note: 'Fiber Net & Cloud instances', badge: 'Due Soon', badgeColor: 'yellow' },
                  { label: 'Projected Annual Drain', count: '+3.2% MoM', val: '₦3,821,400', note: 'Based on dynamic FX rate (~₦1,500/\$)' },
                  { label: 'Auto-Debit Vault Health', count: 'Funded', val: '98.4% COVERAGE', note: 'GTBank Corp & USD Dom linked', badge: 'Funded', badgeColor: 'green' },
                ].map(({ label, count, val, note, badge, badgeColor }) => (
                  <div className="col-6 col-xl-3" key={label}>
                    <div className="bf-stat-card h-100">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <div className="stat-label">{label}</div>
                        {badge && <span className={`bf-badge bf-badge-${badgeColor}`}>{badge}</span>}
                      </div>
                      <div className="stat-value" style={{ fontSize: 18 }}>{val}</div>
                      <div style={{ fontSize: 11, color: 'var(--bf-muted)', marginTop: 4 }}>{note}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Smart Cancellation Watchdog */}
              <div className="bf-card mb-4" style={{ background: 'linear-gradient(135deg, #fff8e1, #fffbf0)', border: '1px solid #f39c12' }}>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-3">
                    <span style={{ fontSize: 24 }}>🔍</span>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ fontWeight: 700, fontSize: 13 }}>Smart Cancellation Watchdog</span>
                        <span className="bf-badge bf-badge-yellow">1 Optimization Found</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--bf-muted)' }}>
                        1 unused seat detected on Figma Enterprise (inactive &gt;35 days). Downgrading saves \$15.00/mo (~₦22,500.00/mo).
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="bf-btn-outline">Dismiss</button>
                    <button className="bf-btn-primary">Review Seat Allocation</button>
                  </div>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <div className="bf-tabs">
                  {['All Commitments (8)', 'SaaS & Cloud (3)', 'Living & Rent (2)', 'Payroll & Staff (2)', 'Debt & Loans'].map((t, i) => (
                    <button key={t} className={`bf-tab ${i === 0 ? 'active' : ''}`}>{t}</button>
                  ))}
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input placeholder="Filter schedules…" style={{ border: '1px solid var(--bf-border)', borderRadius: 8, padding: '6px 12px', fontSize: 12, outline: 'none' }} />
                  <button className="bf-btn-outline">Sort: Due Date ▾</button>
                </div>
              </div>

              {/* Recurring list */}
              <div className="row g-0">
                <div className="col-lg-8">
                  {RECURRING.map(item => <RecurringItem key={item.name} item={item} />)}
                </div>

                {/* Right panel */}
                <div className="col-lg-4 ps-lg-3">
                  {/* Upcoming debits */}
                  <div className="bf-card mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="bf-section-title">Upcoming Debits</div>
                      <span style={{ fontSize: 11, color: 'var(--bf-muted)' }}>May – Jun 2025</span>
                    </div>
                    {[
                      { name: 'MTN Fibre Internet', date: 'May 18 · Auto-debit', amount: '₦28,000', color: '#f39c12' },
                      { name: 'AWS Cloud Hosting', date: 'May 24 · $140.00', amount: '₦218,000', color: '#3498db' },
                      { name: 'Developer Payroll Retainer', date: 'May 30 · Direct Disburse', amount: '₦350,000', color: '#00b074' },
                      { name: 'Office Lease Installment', date: 'June 01 · Escrow Transfer', amount: '₦450,000', color: '#9b59b6' },
                    ].map(d => (
                      <div key={d.name} className="d-flex align-items-center justify-content-between py-2 border-bottom" style={{ fontSize: 12 }}>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{ width: 8, height: 8, background: d.color, borderRadius: '50%' }} />
                          <div>
                            <div style={{ fontWeight: 600 }}>{d.name}</div>
                            <div style={{ color: 'var(--bf-muted)', fontSize: 10 }}>{d.date}</div>
                          </div>
                        </div>
                        <span style={{ fontWeight: 700 }}>{d.amount}</span>
                      </div>
                    ))}

                    <div className="mt-3 p-2 rounded" style={{ background: 'var(--bf-bg)' }}>
                      <div style={{ fontSize: 11, color: 'var(--bf-muted)' }}>Vault Auto-Debit Buffer</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--bf-primary)' }}>+₦658,000 Available</div>
                    </div>
                  </div>

                  {/* Spend projection */}
                  <div className="bf-card mb-3">
                    <div className="bf-section-title mb-3">Spend Projection — By Category</div>
                    {[
                      { name: 'Software & Cloud (SaaS)', pct: 52, val: '₦165,594', color: '#3498db' },
                      { name: 'Facilities & Office Studio', pct: 31, val: '₦98,720', color: '#0a1628' },
                      { name: 'Staff & Retainers', pct: 14, val: '₦44,583', color: '#f39c12' },
                      { name: 'Utilities & Telecom', pct: 3, val: '₦9,553', color: '#00b074' },
                    ].map(s => (
                      <div key={s.name} className="mb-2">
                        <div className="d-flex justify-content-between mb-1" style={{ fontSize: 12 }}>
                          <div className="d-flex align-items-center gap-2">
                            <div style={{ width: 10, height: 10, background: s.color, borderRadius: 2 }} />
                            <span>{s.name}</span>
                          </div>
                          <span style={{ fontWeight: 600 }}>{s.val}</span>
                        </div>
                        <div className="bf-progress">
                          <div className="bf-progress-bar" style={{ width: `${s.pct}%`, background: s.color }} />
                        </div>
                      </div>
                    ))}
                    <div className="mt-2" style={{ fontSize: 11, color: 'var(--bf-muted)' }}>
                      Weighted Run Rate: ₦318,450/month
                    </div>
                  </div>

                  {/* Auto Sweep */}
                  <div className="bf-card">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="bf-section-title">Auto-Sweep &amp; Overdraft</div>
                      <span className="bf-badge bf-badge-green">Active</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--bf-muted)', marginBottom: 12 }}>
                      Automatically sweep liquid funds into GTBank Corporate if debit mandates risk returning unpaid
                    </div>
                    <div style={{ background: 'var(--bf-bg)', borderRadius: 8, padding: 12, fontSize: 12 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>🔒 Designated Backup Account</div>
                      <div style={{ color: 'var(--bf-muted)' }}>Access Bank Personal Savings</div>
                      <div style={{ color: 'var(--bf-muted)' }}>Acct: **** 9811</div>
                      <div style={{ color: 'var(--bf-primary)', fontWeight: 600 }}>₦2,450,000 liquid</div>
                    </div>
                    <button className="bf-btn-outline w-100 mt-3">Configure Thresholds →</button>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 2 — Calendar View Placeholder */}
          <Carousel.Item>
            <div className="bf-page" style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: 40 }}>
              <h1 className="bf-page-title mb-2">Recurring Calendar View</h1>
              <p className="bf-page-subtitle mb-4">Visual timeline of all upcoming payment obligations</p>
              <div className="bf-card">
                <div className="row g-2">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                    const hasDebit = [7, 18, 19, 24, 30].includes(day)
                    const isDue = [18, 19].includes(day)
                    return (
                      <div className="col" key={day} style={{ minWidth: 40, textAlign: 'center' }}>
                        <div style={{
                          padding: '8px 4px',
                          borderRadius: 8,
                          background: isDue ? '#fef0ef' : hasDebit ? '#e6f9f2' : 'transparent',
                          border: isDue ? '1px solid #e74c3c' : hasDebit ? '1px solid #00b074' : '1px solid transparent',
                          cursor: 'pointer',
                        }}>
                          <div style={{ fontSize: 12, fontWeight: day === 18 ? 800 : 500 }}>{day}</div>
                          {hasDebit && <div style={{ fontSize: 8, color: isDue ? '#e74c3c' : '#00b074', marginTop: 2 }}>₦</div>}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="d-flex gap-4 mt-4" style={{ fontSize: 11, color: 'var(--bf-muted)' }}>
                  <span><span style={{ color: '#00b074' }}>●</span> Scheduled Debit</span>
                  <span><span style={{ color: '#e74c3c' }}>●</span> Due Soon (&lt;3 days)</span>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  )
}
