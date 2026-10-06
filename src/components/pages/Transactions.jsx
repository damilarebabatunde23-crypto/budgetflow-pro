import { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { RiDownload2Line, RiFilter2Line } from 'react-icons/ri'

const TRANSACTIONS = [
  { date: 'May 16, 2025', time: '02:45 PM', merchant: 'Shoprite Ikeja Mall', detail: 'Household pantry, dairy & weekly provisions', category: 'Food & Dining', catColor: '#00b074', amount: '₦42,850', type: 'debit', icon: '🛒', iconBg: '#e6f9f2', checked: true },
  { date: 'May 15, 2025', time: '10:15 AM', merchant: 'Synergy Labs Wire', detail: 'Product Design Retainer (May Milestone #1)', category: 'Income', catColor: '#3498db', amount: '+₦350,000', type: 'credit', icon: '💼', iconBg: '#e8f4fd' },
  { date: 'May 14, 2025', time: '08:30 PM', merchant: 'Uber Victoria Island', detail: 'VI to Ikeja GRA Client Briefing commute', category: 'Transport', catColor: '#f39c12', amount: '₦4,800', type: 'debit', icon: '🚗', iconBg: '#fff8e1' },
  { date: 'May 12, 2025', time: '07:00 AM', merchant: 'Cowrywise Halal Fund', detail: 'Automated recurring treasury stash allocation', category: 'Investment', catColor: '#9b59b6', amount: '₦50,000', type: 'debit', icon: '📈', iconBg: '#f5eef8' },
  { date: 'May 10, 2025', time: '04:12 PM', merchant: 'Ikeja Electric (IKEDC)', detail: 'Prepaid Token Units (Studio Workspace)', category: 'Utilities', catColor: '#f39c12', amount: '₦15,000', type: 'debit', icon: '⚡', iconBg: '#fff8e1' },
  { date: 'May 09, 2025', time: '11:00 AM', merchant: 'MTN Hynet Fiber', detail: 'Unlimited Business 100Mbps Monthly Renewal', category: 'Utilities', catColor: '#f39c12', amount: '₦28,000', type: 'debit', icon: '📡', iconBg: '#e8f4fd' },
  { date: 'May 07, 2025', time: '01:14 AM', merchant: 'Netflix Subscription', detail: 'Premium Ultra HD family streaming tier', category: 'Entertainment', catColor: '#e74c3c', amount: '₦11,500', type: 'debit', icon: '🎬', iconBg: '#fef0ef' },
  { date: 'May 05, 2025', time: '03:22 PM', merchant: 'HealthPlus Pharmacy', detail: 'Prescription refilling & wellness vitamins', category: 'Healthcare', catColor: '#00b074', amount: '₦8,500', type: 'debit', icon: '💊', iconBg: '#e6f9f2' },
  { date: 'May 02, 2025', time: '09:00 AM', merchant: 'Gumroad Digital Asset Sales', detail: 'BudgetFlow UI Kit Templates payout', category: 'Income', catColor: '#3498db', amount: '+₦127,500', type: 'credit', icon: '💻', iconBg: '#e8f4fd' },
]

export default function Transactions() {
  const [showOCR, setShowOCR] = useState(true)
  const [active, setActive] = useState('All')

  return (
    <div style={{ position: 'relative' }}>
      <div className="d-flex justify-content-center pt-3 pb-1">
        <small style={{ color: 'var(--bf-muted)', fontSize: 11 }}>TRANSACTION VIEWS — Use arrows to navigate</small>
      </div>

      <div style={{ padding: '0 8px' }}>
        <Carousel indicators controls interval={null}
          style={{ borderRadius: 12, overflow: 'hidden' }}>

          {/* Slide 1 — Ledger */}
          <Carousel.Item>
            <div className="bf-page" style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: 40 }}>
              <div className="bf-breadcrumb mb-1">
                <span className="intel-badge"><span className="intel-dot" />FISCAL AUDIT PROTOCOL</span>
                <span className="sep">›</span>
                <span>REAL-TIME LEDGER</span>
              </div>
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
                <div>
                  <h1 className="bf-page-title">Audited Transactions &amp; Ledger</h1>
                  <p className="bf-page-subtitle">Search, filter, and audit all incoming and outgoing financial transactions across institutional wallets.</p>
                </div>
                <div className="d-flex gap-2">
                  <button className="bf-btn-outline"><RiFilter2Line /> Bulk Actions</button>
                  <button className="bf-btn-outline"><RiDownload2Line /> Export CSV</button>
                  <button className="bf-btn-primary">⊕ Record Transaction</button>
                </div>
              </div>

              {/* KPI row */}
              <div className="row g-3 mb-4">
                {[
                  { label: 'TOTAL RECORDS', val: '1,428', note: '✓ All wallets synced', valColor: 'var(--bf-text)' },
                  { label: 'TOTAL DEBITS', val: '₦630,000', note: '↓ 48 outflows this month', valColor: 'var(--bf-danger)' },
                  { label: 'TOTAL CREDITS', val: '+₦1,250,000', note: '↑ +14.2% vs last cycle', valColor: 'var(--bf-primary)' },
                  { label: 'NET CASH DELTA', val: '+₦620,000', note: '📦 Positive treasury margin', valColor: 'var(--bf-primary)' },
                ].map(({ label, val, note, valColor }) => (
                  <div className="col-6 col-xl-3" key={label}>
                    <div className="bf-stat-card h-100">
                      <div className="stat-label">{label}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, color: valColor }}>{val}</div>
                      <div style={{ fontSize: 11, color: 'var(--bf-muted)', marginTop: 4 }}>{note}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Filter bar */}
              <div className="bf-card mb-3" style={{ padding: 14 }}>
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <div className="bf-tabs">
                    {['All', 'Income', 'Expense', 'Transfer'].map(t => (
                      <button key={t} className={`bf-tab ${active === t ? 'active' : ''}`}
                        onClick={() => setActive(t)}>{t}</button>
                    ))}
                  </div>
                  <div style={{ position: 'relative', flex: 1, minWidth: 160 }}>
                    <input placeholder="Search transactions…" style={{
                      width: '100%', border: '1px solid var(--bf-border)', borderRadius: 8,
                      padding: '7px 14px 7px 32px', fontSize: 12, outline: 'none',
                    }} />
                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--bf-muted)' }}>🔍</span>
                  </div>
                  <button className="bf-btn-outline" style={{ fontSize: 12 }}>📅 This Month (May 2025) ▾</button>
                  <button className="bf-btn-outline" style={{ fontSize: 12 }}>💳 All Wallets ▾</button>
                  <button className="bf-btn-outline" style={{ fontSize: 12 }}>≡ Categories 6 ▾</button>
                </div>
              </div>

              {/* Table + OCR Panel */}
              <div className="row g-3">
                <div className={showOCR ? 'col-lg-7' : 'col-12'}>
                  <div className="bf-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="bf-scroll-x">
                      <table className="bf-table">
                        <thead>
                          <tr>
                            <th style={{ width: 32 }}><input type="checkbox" /></th>
                            <th>DATE &amp; TIME</th>
                            <th>MERCHANT / DETAILS</th>
                            <th>CATEGORY</th>
                            <th style={{ textAlign: 'right' }}>AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {TRANSACTIONS.filter(t => active === 'All' || (active === 'Income' && t.type === 'credit') || (active === 'Expense' && t.type === 'debit')).map(txn => (
                            <tr key={txn.merchant + txn.date} style={{ cursor: 'pointer' }}>
                              <td><input type="checkbox" defaultChecked={txn.checked} /></td>
                              <td>
                                <div style={{ fontSize: 12, fontWeight: 600 }}>{txn.date}</div>
                                <div style={{ fontSize: 10, color: 'var(--bf-muted)' }}>{txn.time}</div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <div style={{ width: 32, height: 32, borderRadius: 8, background: txn.iconBg,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>
                                    {txn.icon}
                                  </div>
                                  <div>
                                    <div style={{ fontSize: 13, fontWeight: 600 }}>{txn.merchant}</div>
                                    <div style={{ fontSize: 10, color: 'var(--bf-muted)' }}>{txn.detail}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span style={{ background: txn.catColor + '20', color: txn.catColor, padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                                  {txn.category}
                                </span>
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: txn.type === 'credit' ? 'var(--bf-primary)' : 'var(--bf-text)' }}>
                                  {txn.amount}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Pagination */}
                    <div className="d-flex align-items-center justify-content-between p-3" style={{ fontSize: 12, borderTop: '1px solid var(--bf-border)' }}>
                      <span style={{ color: 'var(--bf-muted)' }}>Showing 1–9 of 142 audited entries</span>
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ color: 'var(--bf-muted)' }}>ROWS: 10</span>
                        <button className="bf-btn-outline" style={{ padding: '3px 8px', fontSize: 11 }}>‹</button>
                        <button className="bf-btn-primary" style={{ padding: '3px 10px', fontSize: 11 }}>1</button>
                        <button className="bf-btn-outline" style={{ padding: '3px 8px', fontSize: 11 }}>2</button>
                        <button className="bf-btn-outline" style={{ padding: '3px 8px', fontSize: 11 }}>3</button>
                        <span style={{ color: 'var(--bf-muted)' }}>…</span>
                        <button className="bf-btn-outline" style={{ padding: '3px 8px', fontSize: 11 }}>15</button>
                        <button className="bf-btn-outline" style={{ padding: '3px 8px', fontSize: 11 }}>›</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OCR Panel */}
                {showOCR && (
                  <div className="col-lg-5">
                    <div className="ocr-panel">
                      <div className="ocr-header">
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>🔍 OCR Receipt Audit</div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--bf-primary)', letterSpacing: 0.5 }}>AUTOMATED VERIFICATION</div>
                        </div>
                        <button onClick={() => setShowOCR(false)}
                          style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'var(--bf-muted)' }}>×</button>
                      </div>

                      {/* Receipt image mock */}
                      <div style={{ background: 'linear-gradient(135deg, #1a2332, #2d3f55)', borderRadius: 10, padding: 16, marginBottom: 14, position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 8, right: 8 }}>
                          <span className="bf-badge bf-badge-green">✓ Matched to Ledger</span>
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, marginBottom: 4 }}>PARSED RECEIPT #90218</div>
                        <div style={{ color: 'white', fontWeight: 700 }}>Shoprite Nigeria Ltd</div>
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Ikeja City Mall, Alausa, Lagos</div>
                      </div>

                      <div className="d-flex justify-content-between mb-2" style={{ fontSize: 11, fontWeight: 700, color: 'var(--bf-muted)' }}>
                        <span>Itemization</span><span>Subtotal</span>
                      </div>

                      {[
                        { item: '1× Danish Full Cream Milk 1L', price: '₦4,200.00' },
                        { item: '2× Olive Oil Extra Virgin 500ml', price: '₦18,500.00' },
                        { item: '1× Golden Penny Pasta Box (1kg)', price: '₦12,150.00' },
                        { item: '3× Sliced Multigrain Loaf', price: '₦8,000.00' },
                      ].map(({ item, price }) => (
                        <div key={item} className="d-flex justify-content-between py-1 border-bottom" style={{ fontSize: 11 }}>
                          <span>{item}</span><span style={{ fontWeight: 600 }}>{price}</span>
                        </div>
                      ))}

                      <div className="d-flex justify-content-between mt-2 py-2" style={{ borderTop: '2px solid var(--bf-border)' }}>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>Total OCR Total</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--bf-danger)' }}>₦42,850.00</span>
                      </div>

                      <div className="mt-2">
                        {[
                          { label: 'Wallet Deducted:', val: 'GTBank Corporate •• 8912' },
                          { label: 'Tax / VAT (7.5%):', val: '₦2,989.53' },
                          { label: 'Audit Compliance:', val: '✅ Compliant', valColor: 'var(--bf-primary)' },
                          { label: 'Auditor Sign-off:', val: 'Dr. A. Adeleke (Internal)' },
                        ].map(({ label, val, valColor }) => (
                          <div key={label} className="d-flex justify-content-between py-1" style={{ fontSize: 11 }}>
                            <span style={{ color: 'var(--bf-muted)' }}>{label}</span>
                            <span style={{ fontWeight: 600, color: valColor }}>{val}</span>
                          </div>
                        ))}
                      </div>

                      <div className="d-flex gap-2 mt-3">
                        <button className="bf-btn-outline flex-grow-1">⬇ PDF Slip</button>
                        <button className="bf-btn-primary flex-grow-1">↻ Re-Audit</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 2 — Bulk Import */}
          <Carousel.Item>
            <div className="bf-page" style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: 40 }}>
              <h1 className="bf-page-title mb-2">Bulk Import &amp; Reconciliation</h1>
              <p className="bf-page-subtitle mb-4">Import bank statements, CSV files, or connect via Open Banking API for automated reconciliation</p>

              <div className="row g-3">
                {[
                  { icon: '📄', title: 'CSV / Excel Import', desc: 'Upload your bank statement CSV or XLSX file for automated categorization and reconciliation.', btn: 'Upload File', color: '#3498db' },
                  { icon: '🏦', title: 'Open Banking API', desc: 'Connect directly to your bank via open banking protocols for real-time transaction sync.', btn: 'Connect Bank', color: '#00b074' },
                  { icon: '📷', title: 'OCR Receipt Batch', desc: 'Upload multiple receipt images for bulk OCR processing and automated ledger matching.', btn: 'Upload Receipts', color: '#f39c12' },
                  { icon: '🔄', title: 'Reconciliation Report', desc: 'Run a full reconciliation check between your ledger and imported bank data to flag discrepancies.', btn: 'Run Report', color: '#9b59b6' },
                ].map(({ icon, title, desc, btn, color }) => (
                  <div className="col-md-6" key={title}>
                    <div className="bf-card h-100 text-center" style={{ border: `1px solid ${color}20` }}>
                      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{title}</div>
                      <div style={{ fontSize: 12, color: 'var(--bf-muted)', marginBottom: 16, lineHeight: 1.5 }}>{desc}</div>
                      <button className="bf-btn-primary w-100" style={{ background: color }}>{btn}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  )
}
