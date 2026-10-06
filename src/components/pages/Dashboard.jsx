import { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useApp } from '../../context/AppContext'
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiExchangeDollarLine,
  RiCloudLine,
  RiFileTextLine,
  RiSettings4Line,
  RiAddLine,
  RiSubtractLine,
  RiArrowRightLine,
  RiSparklingLine,
  RiShieldCheckLine,
  RiBarChartLine,
} from 'react-icons/ri'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts'

const incomeExpenseChartData = [
  { month: 'Jan', inflow: 850000, outflow: 520000 },
  { month: 'Feb', inflow: 980000, outflow: 590000 },
  { month: 'Mar', inflow: 780000, outflow: 740000 },
  { month: 'Apr', inflow: 1100000, outflow: 560000 },
  { month: 'May (MTD)', inflow: 1250000, outflow: 630000, margin: 620000 },
]

const runwayData = [
  { d: 'May 01', v: 4200000 },
  { d: 'May 05', v: 4450000 },
  { d: 'May 09', v: 4320000 },
  { d: 'May 12', v: 4680000 },
  { d: 'May 16', v: 4850200 },
]

function ChartTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div className="custom-tooltip">
        <div style={{ marginBottom: 4, color: '#8b9ab0', fontSize: 11 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }}>
            {p.name}: ₦{Number(p.value).toLocaleString()}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const {
    netBalance,
    monthlyInflow,
    monthlyOutflow,
    transactions,
    budgets,
    openModal,
    user,
  } = useApp()

  const [slideIndex, setSlideIndex] = useState(0)

  const handlePrev = () => {
    setSlideIndex(prev => (prev === 0 ? 2 : prev - 1))
  }

  const handleNext = () => {
    setSlideIndex(prev => (prev === 2 ? 0 : prev + 1))
  }

  return (
    <div className="bf-page py-3">
      {/* ── TOP HEADER WITH EXECUTIVE PULSE & CAROUSEL NAVIGATION ── */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <div className="d-flex align-items-center gap-2">
          <span className="bf-badge-pulse">EXECUTIVE PULSE</span>
          <span className="fw-bold text-dark fs-6">Financial Overview &amp; Insights</span>
        </div>

        {/* Carousel indicator controls */}
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center gap-1 me-2">
            {[0, 1, 2].map(idx => (
              <span
                key={idx}
                onClick={() => setSlideIndex(idx)}
                style={{
                  width: idx === slideIndex ? 18 : 7,
                  height: 7,
                  borderRadius: 4,
                  background: idx === slideIndex ? 'var(--bf-primary)' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
          <button
            className="carousel-btn-arrow"
            onClick={handlePrev}
            aria-label="Previous Slide"
          >
            ‹
          </button>
          <button
            className="carousel-btn-arrow"
            onClick={handleNext}
            aria-label="Next Slide"
          >
            ›
          </button>
        </div>
      </div>

      <Carousel
        activeIndex={slideIndex}
        onSelect={selectedIndex => setSlideIndex(selectedIndex)}
        controls={false}
        indicators={false}
        interval={null}
      >
        {/* ============================================================
            SLIDE 1 : PRIMARY DASHBOARD (EXECUTIVE OVERVIEW)
        ============================================================ */}
        <Carousel.Item>
          {/* Zero Balance Initial Capital Notification */}
          {netBalance === 0 && (
            <div
              className="p-3 rounded mb-3 d-flex align-items-center justify-content-between flex-wrap gap-3 shadow-sm"
              style={{ background: 'linear-gradient(135deg, #0a1628, #162a45)', color: 'white' }}
            >
              <div className="d-flex align-items-center gap-3">
                <span className="fs-3">🏛️</span>
                <div>
                  <div className="fw-bold fs-6">Opening Balance is ₦0.00 — Ready for Capital Allocation</div>
                  <div className="small text-white-50">
                    Input your capital amount to distribute into your operating wallets and discipline envelopes.
                  </div>
                </div>
              </div>
              <button
                className="bf-btn-primary"
                onClick={() => openModal('distributeCapital')}
                style={{ whiteSpace: 'nowrap', padding: '10px 20px' }}
              >
                <RiSparklingLine className="me-1" /> Deposit &amp; Distribute Capital
              </button>
            </div>
          )}

          {/* ── TOTAL CONSOLIDATED NET BALANCE CARD ── */}
          <div className="bf-card mb-4 p-4 shadow-sm border-0">
            <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-3">
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="stat-label mb-0">TOTAL CONSOLIDATED NET BALANCE</span>
                  <span className="bf-badge bf-badge-green">
                    {netBalance > 0 ? '+18.4% vs last month' : 'Awaiting Opening Capital'}
                  </span>
                </div>
                <div className="d-flex align-items-baseline gap-3 flex-wrap">
                  <h1 className="fw-extrabold mb-0 text-dark" style={{ letterSpacing: '-1.5px', fontSize: '38px' }}>
                    ₦{netBalance.toLocaleString()}.00
                  </h1>
                  <span className="text-muted small fw-semibold">VAL: 16 MAY 2025</span>
                </div>
              </div>

              {/* Quick Actions Header Buttons */}
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <button
                  className="btn text-white fw-bold d-flex align-items-center gap-1"
                  onClick={() => openModal('distributeCapital')}
                  style={{ borderRadius: 8, padding: '9px 16px', background: '#0a1628' }}
                >
                  <RiSparklingLine size={16} /> Distribute Capital
                </button>
                <button
                  className="bf-btn-primary"
                  onClick={() => openModal('quickIncome')}
                  style={{ borderRadius: 8, padding: '9px 18px' }}
                >
                  <RiAddLine size={16} /> Quick Income
                </button>
                <button
                  className="bf-btn-outline"
                  onClick={() => openModal('quickExpense')}
                  style={{ borderRadius: 8, padding: '9px 18px' }}
                >
                  <RiSubtractLine size={16} /> Quick Expense
                </button>
              </div>
            </div>

            {/* 3 Metric Pills Row */}
            <div className="row g-3 pt-2">
              <div className="col-md-4">
                <div className="metric-pill-box">
                  <div className="metric-pill-icon inflow">
                    <RiArrowDownLine size={18} />
                  </div>
                  <div>
                    <div className="metric-pill-label">MONTHLY INFLOW (MAY)</div>
                    <div className="metric-pill-val text-dark">
                      ₦{monthlyInflow.toLocaleString()}.00
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="metric-pill-box">
                  <div className="metric-pill-icon outflow">
                    <RiArrowUpLine size={18} />
                  </div>
                  <div>
                    <div className="metric-pill-label">MONTHLY OUTFLOW (MAY)</div>
                    <div className="metric-pill-val text-dark">
                      ₦{monthlyOutflow.toLocaleString()}.00
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="metric-pill-box">
                  <div className="metric-pill-icon retained">
                    <RiExchangeDollarLine size={18} />
                  </div>
                  <div>
                    <div className="metric-pill-label">RETAINED NET CASHFLOW</div>
                    <div className="metric-pill-val" style={{ color: '#00b074' }}>
                      +₦{(monthlyInflow - monthlyOutflow).toLocaleString()}.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── TWO-COLUMN MAIN CONTENT ── */}
          <div className="row g-4">
            {/* ── LEFT COLUMN (8 COLS) ── */}
            <div className="col-lg-8">
              {/* 1. Historical Cash Flow Dynamics */}
              <div className="bf-card mb-4 p-4 shadow-sm border-0">
                <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                  <div>
                    <div className="stat-label mb-0">HISTORICAL CASH FLOW DYNAMICS</div>
                    <h5 className="fw-bold mb-0 text-dark">Income vs. Expense Trend</h5>
                  </div>
                  <div className="d-flex align-items-center gap-3 small">
                    <span className="d-flex align-items-center gap-1 text-muted">
                      <span style={{ width: 10, height: 10, background: '#00b074', borderRadius: 2 }} />
                      Inflow (₦)
                    </span>
                    <span className="d-flex align-items-center gap-1 text-muted">
                      <span style={{ width: 10, height: 10, background: '#e74c3c', borderRadius: 2 }} />
                      Outflow (₦)
                    </span>
                    <span className="badge bg-light text-muted border">Jan - May 2025</span>
                  </div>
                </div>

                {/* Relative container for chart and May pill */}
                <div style={{ position: 'relative' }}>
                  {/* May MTD Tooltip Badge Pin */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '7%',
                      top: '12px',
                      background: '#0a1628',
                      color: 'white',
                      padding: '3px 8px',
                      borderRadius: 6,
                      fontSize: '10px',
                      fontWeight: 700,
                      zIndex: 2,
                    }}
                  >
                    +₦620k MTD
                  </div>

                  <ResponsiveContainer width="100%" height={210}>
                    <BarChart
                      data={incomeExpenseChartData}
                      margin={{ top: 15, right: 10, bottom: 0, left: -15 }}
                      barGap={6}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="inflow" name="Inflow" fill="#00b074" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="outflow" name="Outflow" fill="#e74c3c" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Sub metrics footer */}
                <div className="row g-2 pt-3 mt-1 border-top text-center text-md-start">
                  <div className="col-4">
                    <div className="stat-label mb-1">Quarterly Avg Outflow</div>
                    <div className="fw-bold text-dark fs-6">₦585,000/mo</div>
                  </div>
                  <div className="col-4">
                    <div className="stat-label mb-1">Savings Rate Velocity</div>
                    <div className="fw-bold fs-6" style={{ color: '#00b074' }}>
                      49.6% Peak Inflow
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-label mb-1">Variance Forecast</div>
                    <div className="fw-bold text-dark fs-6">+12.2% Retained</div>
                  </div>
                </div>
              </div>

              {/* 2. Expenditure Allocation: Category Spend Breakdown */}
              <div className="bf-card mb-4 p-4 shadow-sm border-0">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <div className="stat-label mb-0">EXPENDITURE ALLOCATION</div>
                    <h5 className="fw-bold mb-0 text-dark">Category Spend Breakdown</h5>
                  </div>
                  <div className="fw-bold text-muted small">Total: ₦630,000.00</div>
                </div>

                <div className="d-flex flex-column gap-3">
                  {[
                    {
                      name: 'Food & Dining',
                      badge: 'Highest Share',
                      amount: '₦239,400.00',
                      pct: 38,
                      color: '#00b074',
                    },
                    {
                      name: 'Housing & Rent Allocation',
                      amount: '₦157,500.00',
                      pct: 25,
                      color: '#3498db',
                    },
                    {
                      name: 'Transportation & Fuel',
                      amount: '₦94,500.00',
                      pct: 15,
                      color: '#f59e0b',
                    },
                    {
                      name: 'Utilities & Subscriptions',
                      amount: '₦75,600.00',
                      pct: 12,
                      color: '#06b6d4',
                    },
                    {
                      name: 'Entertainment & Lifestyle',
                      amount: '₦63,000.00',
                      pct: 10,
                      color: '#64748b',
                    },
                  ].map(cat => (
                    <div key={cat.name}>
                      <div className="d-flex align-items-center justify-content-between mb-1 small">
                        <div className="d-flex align-items-center gap-2">
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: cat.color,
                              display: 'inline-block',
                            }}
                          />
                          <span className="fw-semibold text-dark">{cat.name}</span>
                          {cat.badge && (
                            <span className="badge bg-light text-muted border py-0 px-2 small">
                              {cat.badge}
                            </span>
                          )}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-bold text-dark">{cat.amount}</span>
                          <span className="text-muted fw-semibold">{cat.pct}%</span>
                        </div>
                      </div>
                      <div className="bf-progress" style={{ height: 6 }}>
                        <div
                          className="bf-progress-bar"
                          style={{ width: `${cat.pct}%`, background: cat.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Audited Ledger: Recent Transactions */}
              <div className="bf-card p-4 shadow-sm border-0">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <div className="stat-label mb-0">AUDITED LEDGER</div>
                    <h5 className="fw-bold mb-0 text-dark">Recent Transactions</h5>
                  </div>
                  <a
                    href="#transactions"
                    className="text-decoration-none fw-bold small d-flex align-items-center gap-1"
                    style={{ color: 'var(--bf-primary)' }}
                  >
                    VIEW ALL RECORDS <RiArrowRightLine />
                  </a>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle border-0 mb-0">
                    <thead>
                      <tr className="text-muted small border-bottom">
                        <th className="border-0 pb-2">MERCHANT / SOURCE</th>
                        <th className="border-0 pb-2">DATE</th>
                        <th className="border-0 pb-2">CATEGORY</th>
                        <th className="border-0 pb-2">WALLET</th>
                        <th className="border-0 pb-2 text-end">AMOUNT (₦)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.slice(0, 5).map(tx => (
                        <tr key={tx.id} className="border-bottom">
                          <td className="py-3">
                            <div className="d-flex align-items-center gap-2">
                              <div
                                style={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: 8,
                                  background: tx.iconBg,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 15,
                                  flexShrink: 0,
                                }}
                              >
                                {tx.icon}
                              </div>
                              <div>
                                <div className="fw-bold text-dark small">{tx.merchant}</div>
                                <div className="text-muted" style={{ fontSize: '11px' }}>
                                  {tx.detail}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-muted small">{tx.date}</td>
                          <td>
                            <span
                              className="badge"
                              style={{
                                background:
                                  tx.type === 'credit'
                                    ? '#dcfce7'
                                    : tx.category === 'Food & Dining'
                                    ? '#f1f5f9'
                                    : tx.category === 'Transport'
                                    ? '#ede9fe'
                                    : tx.category === 'Utilities'
                                    ? '#fef3c7'
                                    : '#fee2e2',
                                color:
                                  tx.type === 'credit'
                                    ? '#15803d'
                                    : tx.category === 'Food & Dining'
                                    ? '#475569'
                                    : tx.category === 'Transport'
                                    ? '#6366f1'
                                    : tx.category === 'Utilities'
                                    ? '#b45309'
                                    : '#b91c1c',
                                fontWeight: 600,
                                fontSize: '11px',
                                padding: '4px 8px',
                              }}
                            >
                              {tx.category}
                            </span>
                          </td>
                          <td className="text-muted small">{tx.wallet}</td>
                          <td className="text-end">
                            <span
                              className="fw-bold"
                              style={{
                                color: tx.type === 'credit' ? '#00b074' : '#1e293b',
                                fontSize: '14px',
                              }}
                            >
                              {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}.00
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN (4 COLS) ── */}
            <div className="col-lg-4 d-flex flex-column gap-4">
              {/* 1. Discipline Limits: Active Budgets */}
              <div className="bf-card p-4 shadow-sm border-0">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <div className="stat-label mb-0">DISCIPLINE LIMITS</div>
                    <h5 className="fw-bold mb-0 text-dark">Active Budgets</h5>
                  </div>
                  <RiSettings4Line className="text-muted" size={18} style={{ cursor: 'pointer' }} />
                </div>

                <div className="d-flex flex-column gap-3 mb-3">
                  {budgets.map(b => (
                    <div key={b.id} className="p-3 rounded border bg-light bg-opacity-50">
                      <div className="d-flex align-items-start justify-content-between mb-1">
                        <div>
                          <div className="fw-bold text-dark small">{b.name}</div>
                          <div className="text-muted small">
                            ₦{b.spent.toLocaleString()} / ₦{b.allocated.toLocaleString()}
                          </div>
                        </div>
                        <span
                          className={`bf-badge ${
                            b.badgeColor === 'red'
                              ? 'bf-badge-red'
                              : b.badgeColor === 'amber'
                              ? 'bf-badge-yellow'
                              : b.badgeColor === 'cyan'
                              ? 'bf-badge-blue'
                              : 'bf-badge-green'
                          }`}
                          style={{ fontSize: '10px' }}
                        >
                          {b.badge}
                        </span>
                      </div>

                      <div className="bf-progress my-2" style={{ height: 6 }}>
                        <div
                          className="bf-progress-bar"
                          style={{
                            width: `${Math.min(100, Math.round((b.spent / b.allocated) * 100))}%`,
                            background: b.barColor,
                          }}
                        />
                      </div>

                      <div className="d-flex justify-content-between text-muted" style={{ fontSize: '11px' }}>
                        <span>{b.note.split('·')[0]}</span>
                        <span className="fw-semibold">{b.note.split('·')[1]}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="bf-btn-outline w-100 justify-content-center"
                  onClick={() => openModal('newBudget')}
                  style={{ borderRadius: 8, padding: '9px 14px' }}
                >
                  <RiAddLine size={16} /> Set New Budget Category
                </button>
              </div>

              {/* 2. Sync & Productivity: Quick Actions */}
              <div className="bf-card p-4 shadow-sm border-0">
                <div className="stat-label mb-0">SYNC &amp; PRODUCTIVITY</div>
                <h5 className="fw-bold mb-3 text-dark">Quick Actions</h5>

                {/* Cloud Sync Status */}
                <div className="p-3 rounded border mb-3 bg-light bg-opacity-75">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#00b074',
                          display: 'inline-block',
                          boxShadow: '0 0 0 2px rgba(0, 176, 116, 0.2)',
                        }}
                      />
                      <div>
                        <div className="fw-bold small text-dark">Offline-Ready Sync</div>
                        <div className="text-muted" style={{ fontSize: '11px' }}>
                          All changes synced to cloud
                        </div>
                      </div>
                    </div>
                    <RiCloudLine size={20} className="text-muted" />
                  </div>
                </div>

                {/* Scan or Drop Receipt Card */}
                <div
                  className="p-4 rounded border text-center mb-3"
                  onClick={() => openModal('scanReceipt')}
                  style={{
                    background: '#f8fafc',
                    cursor: 'pointer',
                    borderStyle: 'dashed',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--bf-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: 'var(--bf-primary-light)',
                      color: 'var(--bf-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 10px',
                      fontSize: 22,
                    }}
                  >
                    <RiFileTextLine />
                  </div>
                  <div className="fw-bold text-dark small mb-1">Scan or Drop Receipt</div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>
                    AI OCR auto-categorizes merchant &amp; sum
                  </div>
                </div>

                {/* Export May PDF Statement Button */}
                <button
                  className="btn w-100 text-white fw-bold d-flex align-items-center justify-content-center gap-2"
                  onClick={() => openModal('exportPdf')}
                  style={{
                    background: '#1a2332',
                    borderRadius: 8,
                    padding: '12px',
                    fontSize: '13px',
                  }}
                >
                  <RiFileTextLine size={16} /> Export May PDF Statement
                </button>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* ============================================================
            SLIDE 2 : DEEP DIVE ANALYTICS & WEALTH SOLVENCY
        ============================================================ */}
        <Carousel.Item>
          <div className="bf-card p-4 shadow-sm border-0 mb-4">
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
              <div>
                <span className="bf-badge-pulse">ANALYTICS DEEP-DIVE</span>
                <h2 className="fw-bold text-dark mt-1 mb-0">Solvency &amp; Cash Velocity Metrics</h2>
                <div className="text-muted small">
                  Curated profile analytics for {user.fullName} ({user.entityName})
                </div>
              </div>
              <div className="d-flex gap-2">
                <span className="badge bg-success-subtle text-success p-2 px-3 fw-bold">
                  Health Index: 98.4% Exceptional
                </span>
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <div className="p-3 border rounded bg-light">
                  <div className="stat-label">AVERAGE BURN PER DAY</div>
                  <div className="fw-bold fs-4 text-dark">₦20,322</div>
                  <div className="text-success small fw-semibold">↓ -4.1% vs target cap</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 border rounded bg-light">
                  <div className="stat-label">SAVINGS VELOCITY</div>
                  <div className="fw-bold fs-4 text-success">49.6%</div>
                  <div className="text-muted small">Target allocation: 40.0%</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 border rounded bg-light">
                  <div className="stat-label">SAFE LIQUIDITY RUNWAY</div>
                  <div className="fw-bold fs-4 text-dark">14.2 Mos</div>
                  <div className="text-primary small fw-semibold">Zero-income resilience</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 border rounded bg-light">
                  <div className="stat-label">PROJECTED DEC 31 VAULT</div>
                  <div className="fw-bold fs-4 text-dark">₦7,440,000</div>
                  <div className="text-success small fw-semibold">On-track yield (+12.5%)</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="stat-label">CUMULATIVE NET WORTH RUNWAY (MAY 2025)</div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={runwayData}>
                  <defs>
                    <linearGradient id="wealthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00b074" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#00b074" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="d" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => `₦${(v / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="v"
                    name="Net Worth"
                    stroke="#00b074"
                    strokeWidth={2.5}
                    fill="url(#wealthGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Carousel.Item>

        {/* ============================================================
            SLIDE 3 : ASSET ALLOCATION & AUTOMATED RULES
        ============================================================ */}
        <Carousel.Item>
          <div className="bf-card p-4 shadow-sm border-0 mb-4">
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
              <div>
                <span className="bf-badge-pulse">PORTFOLIO SHIELD</span>
                <h2 className="fw-bold text-dark mt-1 mb-0">Automated Discipline &amp; Sweep Rules</h2>
                <div className="text-muted small">Real-time fiscal controls configured for this workspace</div>
              </div>
              <button className="bf-btn-outline" onClick={() => setSlideIndex(0)}>
                Back to Pulse Overview
              </button>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="p-4 border rounded bg-white h-100">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <RiShieldCheckLine size={24} className="text-success" />
                    <h6 className="fw-bold mb-0">Automated High-Yield Sweep</h6>
                  </div>
                  <p className="text-muted small">
                    Every Sunday at 23:59 UTC, funds in <strong>GTBank Corporate</strong> exceeding the
                    ₦500,000 baseline are automatically swept into <strong>Access Personal High-Yield (7.5% APY)</strong>.
                  </p>
                  <div className="p-3 rounded bg-light small mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Floor Balance:</span>
                      <strong>₦500,000.00</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Target Account:</span>
                      <strong>Access Personal (**** 8821)</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Next Sweep Execution:</span>
                      <strong className="text-success">In 3 Days (Sunday)</strong>
                    </div>
                  </div>
                  <span className="badge bg-success">Status: Enabled &amp; Monitored</span>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-4 border rounded bg-white h-100">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <RiBarChartLine size={24} className="text-primary" />
                    <h6 className="fw-bold mb-0">Discipline Ceiling Safeguards</h6>
                  </div>
                  <p className="text-muted small">
                    When any operational budget reaches 80% consumption before day 20 of the ledger cycle,
                    BudgetFlow locks discretionary card charges and triggers instant push authorization.
                  </p>
                  <div className="p-3 rounded bg-light small mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Active Alerts:</span>
                      <strong className="text-warning">Food &amp; Dining (83% Burned)</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Enforcement:</span>
                      <strong>Weekend Cap ₦8,000/day</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Authorized Signatory:</span>
                      <strong>{user.displayName}</strong>
                    </div>
                  </div>
                  <span className="badge bg-primary">Policy Level: Institutional Safeguard</span>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
