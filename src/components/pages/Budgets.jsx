import { Carousel } from 'react-bootstrap'
import { RiAddLine } from 'react-icons/ri'

const CATEGORIES = [
  {
    name: 'Food & Dining',
    sub: 'Daily Groceries, Takeout & Dine-in',
    icon: '🍽️',
    pct: 83.3,
    color: '#f39c12',
    bg: '#fff8e1',
    spent: '₦125,000',
    remaining: '₦25,000',
    allocated: '₦150,000',
    daily: '₦1,066',
    note: '80% threshold exceeded. Approaching hard ceiling.',
    noteColor: '#f39c12',
    txns: '14 transactions logged',
  },
  {
    name: 'Shopping & Gadgets',
    sub: 'Electronics, Wearables, Gear',
    icon: '🛍️',
    pct: 95.0,
    color: '#e74c3c',
    bg: '#fef0ef',
    spent: '₦95,000',
    remaining: '₦5,000',
    allocated: '₦100,000',
    daily: '₦333',
    note: 'Only ₦5,000 cushion remaining for 15 days.',
    noteColor: '#e74c3c',
    txns: '3 large transactions',
    badge: '95.8% Burned',
  },
  {
    name: 'Transport & Fuel',
    sub: 'Fuel, Ride-hailing & Tolls',
    icon: '🚗',
    pct: 70.0,
    color: '#3498db',
    bg: '#e8f4fd',
    spent: '₦42,000',
    remaining: '₦18,000',
    allocated: '₦60,000',
    daily: '₦1,200',
    note: 'Burn pace matches mid-month expectation.',
    noteColor: '#00b074',
    txns: '11 rides logged',
  },
  {
    name: 'Utilities & Subscriptions',
    sub: 'Power, Internet, SaaS, Cloud',
    icon: '⚡',
    pct: 84.0,
    color: '#9b59b6',
    bg: '#f5eef8',
    spent: '₦75,600',
    remaining: '₦14,400',
    allocated: '₦90,000',
    daily: '₦960',
    note: 'Next cycle renewals occur in 8 days.',
    noteColor: '#f39c12',
    txns: '6 fixed recurring bills',
  },
  {
    name: 'Entertainment & Lifestyle',
    sub: 'Cinemas, Gaming, Outings',
    icon: '🎮',
    pct: 45.0,
    color: '#00b074',
    bg: '#e6f9f2',
    spent: '₦18,000',
    remaining: '₦22,000',
    allocated: '₦40,000',
    daily: '₦1,466',
    note: 'Discipline index optimal: 55% cushion intact.',
    noteColor: '#00b074',
    txns: '5 events recorded',
  },
  {
    name: 'Healthcare & Wellness',
    sub: 'Pharmacies, Gym, Therapy',
    icon: '❤️',
    pct: 25.0,
    color: '#00b074',
    bg: '#e6f9f2',
    spent: '₦12,500',
    remaining: '₦37,500',
    allocated: '₦50,000',
    daily: '₦2,500',
    note: 'Highly defensive balance. Unused surplus projected.',
    noteColor: '#00b074',
    txns: '2 claims cleared',
  },
]

function CategoryCard({ cat }) {
  const barColor = cat.pct >= 90 ? '#e74c3c' : cat.pct >= 75 ? '#f39c12' : '#00b074'
  return (
    <div className="budget-cat-card h-100">
      <div className="top-bar" style={{ background: barColor, opacity: 0.4 }} />
      <div className="d-flex align-items-start justify-content-between mb-1">
        <div className="d-flex align-items-center gap-2">
          <div className="cat-icon-wrap" style={{ background: cat.bg }}>{cat.icon}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{cat.name}</div>
            <div style={{ fontSize: 11, color: 'var(--bf-muted)' }}>{cat.sub}</div>
          </div>
        </div>
        <span className={`bf-badge ${cat.pct >= 90 ? 'bf-badge-red' : cat.pct >= 75 ? 'bf-badge-yellow' : 'bf-badge-green'}`}>
          {cat.pct}% Burned
        </span>
      </div>

      <div className="bf-progress my-2">
        <div className="bf-progress-bar" style={{ width: `${cat.pct}%`, background: barColor }} />
      </div>

      <div className="row g-2 mb-2">
        <div className="col-6">
          <div style={{ fontSize: 10, color: 'var(--bf-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Spent</div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: 'var(--bf-text)' }}>{cat.spent}</div>
        </div>
        <div className="col-6 text-end">
          <div style={{ fontSize: 10, color: 'var(--bf-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Remaining</div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: 'var(--bf-primary)' }}>{cat.remaining}</div>
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--bf-muted)' }}>
        Allocated: {cat.allocated} &nbsp;·&nbsp; {cat.daily}/day safe cap
      </div>

      <div className="mt-2 p-2 rounded" style={{ background: cat.bg, fontSize: 11, color: cat.noteColor, fontWeight: 500 }}>
        {cat.noteColor === '#e74c3c' ? '⚠️ ' : '✅ '}{cat.note}
      </div>

      <div className="d-flex align-items-center justify-content-between mt-2">
        <span style={{ fontSize: 11, color: 'var(--bf-muted)' }}>{cat.txns}</span>
        <button className="bf-btn-outline" style={{ padding: '3px 10px', fontSize: 11 }}>Adjust Limit ≡</button>
      </div>
    </div>
  )
}

export default function Budgets() {
  return (
    <div style={{ position: 'relative' }}>
      <div className="d-flex justify-content-center gap-2 pt-3 pb-1">
        <small style={{ color: 'var(--bf-muted)', fontSize: 11 }}>
          BUDGET VIEWS — Use arrows to navigate
        </small>
      </div>

      <div style={{ padding: '0 8px' }}>
        <Carousel indicators controls interval={null}
          style={{ borderRadius: 12, overflow: 'hidden' }}>

          {/* Slide 1 — Summary + Category Grid */}
          <Carousel.Item>
            <div className="bf-page" style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: 40 }}>
              <div className="bf-breadcrumb mb-1">
                <span className="intel-badge"><span className="intel-dot" />FISCAL SAFEGUARD ENGINE</span>
                <span className="sep">·</span>
                <span>Realtime Ledger Synced</span>
              </div>
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
                <div>
                  <h1 className="bf-page-title">Budgets &amp; Discipline Limits</h1>
                  <p className="bf-page-subtitle">Set monthly category ceilings, monitor dynamic burn velocities, and secure cash cushions.</p>
                </div>
                <button className="bf-btn-primary"><RiAddLine /> Create New Budget</button>
              </div>

              {/* Summary KPIs */}
              <div className="row g-3 mb-3">
                {[
                  { label: 'TOTAL ALLOCATED CAP',  val: '₦1,200,000', sub: '10 Categories active' },
                  { label: 'DISBURSED TO DATE',     val: '₦845,300',   sub: 'Velocity: +4.2% vs Apr', badge: '70.4%' },
                  { label: 'REMAINING CUSHION',     val: '₦354,700',   sub: 'Buffer intact (29.6%)' },
                  { label: 'SAFE RUN RATE',         val: '₦23,646/day',sub: '15d remaining', badge: 'Recommended daily spend ceiling' },
                ].map(({ label, val, sub, badge }) => (
                  <div className="col-6 col-xl-3" key={label}>
                    <div className="bf-stat-card h-100">
                      <div className="stat-label">{label}</div>
                      <div className="stat-value" style={{ fontSize: 20 }}>{val}</div>
                      <div style={{ fontSize: 11, color: 'var(--bf-muted)', marginTop: 4 }}>{sub}</div>
                      {badge && <div className="mt-1"><span className="bf-badge bf-badge-green">{badge}</span></div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Global burn health bar */}
              <div className="bf-card mb-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span style={{ fontSize: 12, fontWeight: 700 }}>● Global Burn Health Status: <span style={{ color: '#f39c12' }}>In Caution Band (70.4%)</span></span>
                  <div className="d-flex gap-3" style={{ fontSize: 10, color: 'var(--bf-muted)' }}>
                    <span>● Safe &lt;70%</span><span>⚠ Warning 70–85%</span><span>🔴 Alert &gt;85%</span>
                  </div>
                </div>
                <div className="bf-progress" style={{ height: 10 }}>
                  <div className="bf-progress-bar" style={{ width: '70%', background: '#f39c12' }} />
                </div>
                <div className="d-flex justify-content-between mt-1" style={{ fontSize: 10, color: 'var(--bf-muted)' }}>
                  <span>₦0 (Month Start)</span>
                  <span>Threshold: ₦840,959 (70%)</span>
                  <span>Ceiling: ₦1,020,836 (85%)</span>
                  <span>Target: ₦1,200,000</span>
                </div>
              </div>

              {/* Category Grid */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <span className="bf-section-title">Category Discipline Modules</span>
                  <span style={{ fontSize: 12, color: 'var(--bf-muted)', marginLeft: 8 }}>6 of 10 displayed</span>
                </div>
                <button className="bf-btn-outline">≡ Filter Priority</button>
              </div>

              <div className="row g-3">
                {CATEGORIES.slice(0, 4).map(cat => (
                  <div className="col-md-6" key={cat.name}>
                    <CategoryCard cat={cat} />
                  </div>
                ))}
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 2 — More categories + Budget Intelligence */}
          <Carousel.Item>
            <div className="bf-page" style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: 40 }}>
              <div className="bf-breadcrumb mb-1">
                <span className="intel-badge"><span className="intel-dot" />FISCAL SAFEGUARD ENGINE</span>
                <span className="sep">·</span>
                <span>Budget Intelligence Panel</span>
              </div>
              <h1 className="bf-page-title mb-3">Budget Intelligence &amp; Automation</h1>

              <div className="row g-3 mb-4">
                {CATEGORIES.slice(4).map(cat => (
                  <div className="col-md-6" key={cat.name}>
                    <CategoryCard cat={cat} />
                  </div>
                ))}
              </div>

              {/* Budget Burn Intelligence */}
              <div className="row g-3">
                <div className="col-lg-6">
                  <div className="bf-card h-100">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="bf-section-title">Budget Burn Intelligence</div>
                      <span className="bf-badge bf-badge-green">Active</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--bf-muted)', marginBottom: 16 }}>Machine Learning Forecast</div>

                    <div style={{ background: 'var(--bf-bg)', borderRadius: 10, padding: 14, marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#e74c3c', marginBottom: 6 }}>
                        Accelerated Run-Rate: Food &amp; Dining
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--bf-muted)', lineHeight: 1.5 }}>
                        Groceries &amp; casual takeout are burning 14.2% faster than last month. Current trajectory projects
                        you will breach your limit on <strong>May 24th</strong>.
                      </div>
                    </div>

                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--bf-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Recommended Actions:
                    </div>
                    {[
                      { text: 'Reallocate ₦15,000 from Healthcare', btn: 'Apply' },
                      { text: 'Enforce Weekend Cap (₦8,000 max)', btn: 'Set Cap' },
                    ].map(({ text, btn }) => (
                      <div key={text} className="d-flex align-items-center justify-content-between py-2 border-bottom">
                        <span style={{ fontSize: 12 }}>→ {text}</span>
                        <button className="bf-btn-primary" style={{ padding: '4px 12px', fontSize: 11 }}>{btn}</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="bf-card h-100">
                    <div className="bf-section-title mb-3">Automated Rollover Rules</div>
                    <div style={{ fontSize: 12, color: 'var(--bf-muted)', marginBottom: 16 }}>Month-End Discipline Handlers</div>

                    {[
                      { label: 'Auto-sweep to Savings Vault', desc: 'Transfer unspent balances into Wealth Reserve', on: true },
                      { label: 'Deficit Carry-over Penalty', desc: 'Deduct exceeded sums from next month\'s cap', on: false },
                    ].map(({ label, desc, on }) => (
                      <div key={label} className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
                          <div style={{ fontSize: 11, color: 'var(--bf-muted)' }}>{desc}</div>
                        </div>
                        <div className={`toggle-switch ${on ? 'on' : ''}`} />
                      </div>
                    ))}

                    <div className="mt-3 p-3 rounded" style={{ background: 'linear-gradient(135deg, #0a1628, #0d2240)', color: 'white' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>🏦 Fiscal Peace of Mind</div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>You are on track to save ₦354,700 this month.</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                        Maintaining your daily ceiling of ₦23,646 guarantees meeting your Q2 investment goals.
                      </div>
                    </div>
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
