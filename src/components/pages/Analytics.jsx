import { RiBarChart2Line, RiArrowUpLine, RiArrowDownLine, RiSparklingLine } from 'react-icons/ri'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { Carousel } from 'react-bootstrap'

const cashflowData = [
  { day: 'May 01', inflow: 180000, outflow: 60000 },
  { day: 'May 07', inflow: 320000, outflow: 130000 },
  { day: 'May 14', inflow: 490000, outflow: 220000 },
  { day: 'May 21', inflow: 680000, outflow: 340000 },
  { day: 'May 23', inflow: 812500, outflow: 413000 },
  { day: 'May 31', inflow: 1100000, outflow: 540000 },
]

const incomeData = [
  { month: 'Jan', inflow: 480000, outflow: 310000, margin: 170000 },
  { month: 'Feb', inflow: 520000, outflow: 350000, margin: 170000 },
  { month: 'Mar', inflow: 490000, outflow: 340000, margin: 150000 },
  { month: 'Apr', inflow: 560000, outflow: 390000, margin: 170000 },
  { month: 'May', inflow: 812000, outflow: 630000, margin: 182000 },
  { month: 'Jun', inflow: 620000, outflow: 420000, margin: 200000 },
]

const donutData = [
  { name: 'Food & Dining',       pct: 38, color: '#00b074', amount: '₦239,400' },
  { name: 'Housing & Rent',      pct: 26, color: '#3498db', amount: '₦157,500' },
  { name: 'Transport & Fuel',    pct: 15, color: '#f39c12', amount: '₦94,500'  },
  { name: 'Bills & Utilities',   pct: 12, color: '#9b59b6', amount: '₦75,600'  },
  { name: 'Entertainment',       pct:  9, color: '#e74c3c', amount: '₦63,000'  },
]

const merchants = [
  { rank: 1, name: 'Shoprite Ikeja',       amount: '₦112,900', bar: 100, color: '#00b074' },
  { rank: 2, name: 'Ikeja Electric',        amount: '₦45,800',  bar: 40,  color: '#3498db' },
  { rank: 3, name: 'Uber Rides & Delivery', amount: '₦28,400',  bar: 25,  color: '#f39c12' },
  { rank: 4, name: 'TotalEnergies Fuel',    amount: '₦24,800',  bar: 22,  color: '#9b59b6' },
  { rank: 5, name: 'Netflix Subscription',  amount: '₦7,900',   bar: 7,   color: '#e74c3c' },
]

function CustomTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div className="custom-tooltip">
        <div style={{ marginBottom: 4, color: '#8b9ab0', fontSize: 11 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }}>
            {p.name}: ₦{p.value?.toLocaleString()}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Analytics() {
  return (
    <div style={{ position: 'relative' }}>
      <div className="d-flex justify-content-center gap-2 pt-3 pb-1">
        <small style={{ color: 'var(--bf-muted)', fontSize: 11 }}>
          ANALYTICS VIEWS — Use arrows to navigate slides
        </small>
      </div>

      <div style={{ padding: '0 8px' }}>
        <Carousel indicators controls interval={null}
          style={{ borderRadius: 12, overflow: 'hidden' }}>

          {/* Slide 1 — Overview KPIs + Charts */}
          <Carousel.Item>
            <div className="bf-page" style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: 40 }}>
              <div className="bf-breadcrumb mb-1">
                <span className="intel-badge"><span className="intel-dot" />INTELLIGENCE HUB</span>
                <span className="sep">›</span>
                <span>May 2025 Ledger Cycle</span>
              </div>
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
                <div>
                  <h1 className="bf-page-title">Financial Analytics &amp; Insights</h1>
                  <p className="bf-page-subtitle">Deep dive into spending velocity, income trends, and category distribution</p>
                </div>
                <div className="bf-header-actions">
                  <div className="bf-tabs">
                    {['Weekly','Monthly','Quarterly','Yearly','Custom ≡'].map((t, i) => (
                      <button key={t} className={`bf-tab ${i === 1 ? 'active' : ''}`}>{t}</button>
                    ))}
                  </div>
                  <button className="bf-btn-outline">⬇ Export</button>
                </div>
              </div>

              {/* KPI row */}
              <div className="row g-3 mb-4">
                {[
                  { label: 'SAVINGS VELOCITY',    value: '49.6%',    sub: '+6.2% MoM', up: true,  icon: '💹' },
                  { label: 'AVG DAILY BURN RATE', value: '₦21,000',  sub: '-4.1% vs Apr', up: false, icon: '🔥' },
                  { label: 'PEAK EXPENSE SEGMENT',value: 'Food & Dining', sub: '38.8% of total', up: null, icon: '🍽️' },
                  { label: 'NET CASHFLOW SURPLUS', value: '₦620,000', sub: 'Optimal Margin', up: true, icon: '💎', green: true },
                ].map(({ label, value, sub, up, icon, green }) => (
                  <div className="col-6 col-xl-3" key={label}>
                    <div className="bf-stat-card h-100">
                      <div className="stat-label d-flex justify-content-between">
                        {label} <span>{icon}</span>
                      </div>
                      <div className={`stat-value ${green ? 'green' : ''}`}>{value}</div>
                      {up !== null
                        ? <div className={`stat-change ${up ? 'up' : 'down'}`}>
                            {up ? <RiArrowUpLine /> : <RiArrowDownLine />} {sub}
                          </div>
                        : <div className="mt-1" style={{ fontSize: 11, color: 'var(--bf-muted)' }}>{sub}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="row g-3">
                <div className="col-lg-8">
                  <div className="bf-card mb-3">
                    <div className="bf-section-title mb-1">Cumulative Cash Flow Trajectory</div>
                    <div className="bf-section-sub">Real-time cumulative outflow vs inflow trajectory tracked against upper soft ceiling</div>
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={cashflowData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                        <defs>
                          <linearGradient id="inflowA" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00b074" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#00b074" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="outflowA" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#e74c3c" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#e74c3c" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false} />
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#8b9ab0' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#8b9ab0' }} axisLine={false} tickLine={false}
                          tickFormatter={v => `₦${(v/1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="inflow" name="Inflow" stroke="#00b074" strokeWidth={2.5}
                          fill="url(#inflowA)" dot={false} />
                        <Area type="monotone" dataKey="outflow" name="Outflow" stroke="#e74c3c" strokeWidth={2}
                          fill="url(#outflowA)" dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bf-card">
                    <div className="bf-section-title mb-1">6-Month Income vs Expense Trend</div>
                    <div className="bf-section-sub">Historical breakdown of monthly gross inflow, operational burn, and residual margin</div>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={incomeData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }} barGap={2}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#8b9ab0' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#8b9ab0' }} axisLine={false} tickLine={false}
                          tickFormatter={v => `₦${(v/1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="inflow"  name="Inflow"  fill="#00b074" radius={[4,4,0,0]} barSize={14} />
                        <Bar dataKey="outflow" name="Outflow" fill="#3498db" radius={[4,4,0,0]} barSize={14} opacity={0.7}/>
                        <Bar dataKey="margin"  name="Margin"  fill="#f39c12" radius={[4,4,0,0]} barSize={14} opacity={0.8}/>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="col-lg-4 d-flex flex-column gap-3">
                  {/* Donut */}
                  <div className="bf-card">
                    <div className="bf-section-title mb-1">Category Distribution</div>
                    <div className="bf-section-sub">Expense categorization audit</div>
                    <div className="text-center my-2">
                      <svg viewBox="0 0 120 120" width="110" height="110">
                        {(() => {
                          let offset = 0
                          const r = 44; const circ = 2 * Math.PI * r
                          return donutData.map(({ pct, color, name }) => {
                            const dash = (pct / 100) * circ
                            const el = (
                              <circle key={name} cx="60" cy="60" r={r}
                                fill="none" stroke={color} strokeWidth="18"
                                strokeDasharray={`${dash} ${circ}`}
                                strokeDashoffset={-offset}
                                transform="rotate(-90 60 60)"
                              />
                            )
                            offset += dash; return el
                          })
                        })()}
                        <text x="60" y="57" textAnchor="middle" fontSize="8" fill="#6b7a8d" fontWeight="600">TOTAL SPENT</text>
                        <text x="60" y="68" textAnchor="middle" fontSize="10" fill="#1a2332" fontWeight="700">₦630,000</text>
                        <text x="60" y="78" textAnchor="middle" fontSize="7.5" fill="#00b074">84% of Limit</text>
                      </svg>
                    </div>
                    {donutData.map(({ name, pct, color, amount }) => (
                      <div key={name} className="d-flex align-items-center justify-content-between py-1" style={{ fontSize: 11 }}>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{ width: 8, height: 8, background: color, borderRadius: '50%' }} />
                          <span>{name}</span>
                        </div>
                        <div className="d-flex gap-2">
                          <span style={{ fontWeight: 600 }}>{amount}</span>
                          <span style={{ color: 'var(--bf-muted)' }}>{pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top Merchants */}
                  <div className="bf-card">
                    <div className="bf-section-title mb-1">Top Merchants</div>
                    <div className="bf-section-sub">High-volume expenditure counterparties</div>
                    {merchants.map(({ rank, name, amount, bar, color }) => (
                      <div key={rank} className="merchant-row">
                        <div className="merchant-rank">{rank}</div>
                        <div className="flex-grow-1">
                          <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
                          <div style={{ height: 3, background: color, borderRadius: 2, width: `${bar}%`, marginTop: 4 }} />
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700 }}>{amount}</div>
                      </div>
                    ))}
                    <div className="mt-3" style={{ fontSize: 11, color: 'var(--bf-primary)', fontWeight: 600, cursor: 'pointer' }}>
                      View all 48 transaction vendors →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 2 — Predictive Runway */}
          <Carousel.Item>
            <div className="bf-page" style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: 40 }}>
              <div className="bf-breadcrumb mb-1">
                <RiSparklingLine />
                <span>Financial Run-Rate &amp; Predictive Runway</span>
                <span className="bf-badge bf-badge-blue ms-2">Monte Carlo v2.4</span>
              </div>
              <h1 className="bf-page-title mb-1">Predictive Financial Runway</h1>
              <p className="bf-page-subtitle mb-4">Stochastic multi-period financial model simulating forward solvency and compounding wealth velocity</p>

              <div className="row g-3 mb-4">
                {[
                  { label: 'ZERO-INCOME RUNWAY', val: '14.2', unit: 'Months', note: 'Fixed burn of ₦630k/mo', badge: 'Secure', color: 'green' },
                  { label: 'EST. SAVINGS DEC 31', val: '₦7.44M', unit: '', note: 'Savings velocity + 12.5% p.a.', badge: 'On Track', color: 'blue' },
                  { label: 'INFLATION EXPOSURE', val: '2.4%', unit: 'Hedge Resilience', note: 'Fixed return diversification', badge: 'Guarded', color: 'yellow' },
                ].map(({ label, val, unit, note, badge, color }) => (
                  <div className="col-md-4" key={label}>
                    <div className="bf-card text-center h-100">
                      <div className="stat-label mb-2">{label}</div>
                      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, color: 'var(--bf-text)' }}>{val}</div>
                      {unit && <div style={{ fontSize: 13, color: 'var(--bf-muted)', fontWeight: 600 }}>{unit}</div>}
                      <div style={{ fontSize: 11, color: 'var(--bf-muted)', marginTop: 8 }}>{note}</div>
                      <span className={`bf-badge bf-badge-${color} mt-3 d-inline-block`}>{badge}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="insight-banner">
                <div className="insight-icon">
                  <RiSparklingLine color="white" size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Optimization Advisory</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                    Dining expenses peaked during weekends (+64%). Shifting ₦40,000 from discretionary recreation
                    into your savings vault pushes projected end-of-year surplus past ₦7,920,000.
                  </div>
                </div>
                <button className="bf-btn-primary ms-auto" style={{ whiteSpace: 'nowrap' }}>Simulate Scenario</button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  )
}
