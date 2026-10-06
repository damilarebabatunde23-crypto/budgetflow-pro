import { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useApp } from '../../context/AppContext'
import {
  RiRefreshLine,
  RiExchangeLine,
  RiAddLine,
  RiLockLine,
  RiShieldCheckLine,
  RiArrowRightLine,
  RiLayoutGridLine,
  RiListCheck2,
  RiInformationLine,
  RiCheckLine,
  RiSparklingLine,
} from 'react-icons/ri'

export default function Wallets() {
  const {
    wallets,
    reconciliations,
    executeInternalTransfer,
    openModal,
    syncFeeds,
    netBalance,
  } = useApp()

  // Carousel slide state
  const [slideIndex, setSlideIndex] = useState(0)

  // View toggle: grid or list
  const [viewMode, setViewMode] = useState('grid')

  // Transfer Form State
  const [sourceWalletId, setSourceWalletId] = useState('usddom')
  const [destWalletId, setDestWalletId] = useState('gtb')
  const [transferAmount, setTransferAmount] = useState('200')
  const [transferMemo, setTransferMemo] = useState('Q2 Server Architecture settlement')

  // Reconciliation Filter State
  const [logFilter, setLogFilter] = useState('All Logs')

  // Locked exchange rate (USD to NGN)
  const lockedRate = 1500

  const sourceWallet = wallets.find(w => w.id === sourceWalletId) || wallets[0]
  const destWallet = wallets.find(w => w.id === destWalletId) || wallets[1]

  // Calculate settlement credit
  const calculatedSettlement = () => {
    const amt = parseFloat(transferAmount) || 0
    if (sourceWallet.currency === 'USD' && destWallet.currency === 'NGN') {
      return amt * lockedRate
    } else if (sourceWallet.currency === 'NGN' && destWallet.currency === 'USD') {
      return amt / lockedRate
    }
    return amt
  }

  const handleMaxAmount = () => {
    if (sourceWallet) {
      setTransferAmount(sourceWallet.balance.toString())
    }
  }

  const handleExecuteTransfer = e => {
    e.preventDefault()
    const amt = parseFloat(transferAmount)
    if (!amt || amt <= 0) return

    executeInternalTransfer({
      sourceId: sourceWalletId,
      destId: destWalletId,
      sourceAmount: amt,
      destAmount: calculatedSettlement(),
      memo: transferMemo,
    })
  }

  // Filtered reconciliation logs
  const filteredLogs = reconciliations.filter(item => {
    if (logFilter === 'Bank Feeds') return item.category === 'Bank Feeds'
    if (logFilter === 'Internal Sweeps') return item.category === 'Internal Sweeps'
    return true
  })

  return (
    <div className="bf-page py-3">
      {/* ── TOP HEADER ── */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <div>
          <div className="bf-breadcrumb mb-1">
            <span className="text-muted fw-bold">LIQUIDITY &amp; RESERVES</span>
            <span className="sep">·</span>
            <span>4 Live Portfolios</span>
          </div>
          <h2 className="bf-page-title mb-1">Wallets &amp; Multi-Currency Accounts</h2>
          <p className="bf-page-subtitle mb-0">
            Manage connected Open Banking feeds, segregated operational vaults, and real-time foreign currency conversions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button
            className="btn text-white fw-bold d-flex align-items-center gap-1"
            onClick={() => openModal('distributeCapital')}
            style={{ background: '#0a1628', borderRadius: 8, padding: '7px 14px', fontSize: '13px' }}
          >
            <RiSparklingLine size={15} /> Distribute Capital
          </button>
          <button className="bf-btn-outline" onClick={syncFeeds}>
            <RiRefreshLine size={15} /> Sync Feeds <span className="badge bg-light text-muted border ms-1">3m ago</span>
          </button>
          <button
            className="bf-btn-outline"
            onClick={() => {
              const el = document.getElementById('rebalance-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <RiExchangeLine size={15} /> Transfer Funds
          </button>
          <button className="bf-btn-primary" onClick={() => openModal('linkBank')}>
            <RiAddLine size={16} /> Link New Bank / Wallet
          </button>
        </div>
      </div>

      <Carousel
        activeIndex={slideIndex}
        onSelect={idx => setSlideIndex(idx)}
        controls={false}
        indicators={false}
        interval={null}
      >
        {/* ============================================================
            SLIDE 1 : EXACT WALLETS & MULTI-CURRENCY SCREEN
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
                  <div className="fw-bold fs-6">Consolidated Liquidity is ₦0.00 — Ready for Capital Allocation</div>
                  <div className="small text-white-50">
                    Input your capital amount to allocate opening balances into GTBank, USD Dom, Access Savings, and Petty Cash.
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

          {/* ── TOP ROW: CONSOLIDATED NET LIQUIDITY + ASSET ALLOCATION ── */}
          <div className="row g-4 mb-4">
            {/* Left: Consolidated Net Liquidity */}
            <div className="col-lg-7">
              <div className="bf-card p-4 h-100 shadow-sm border-0 position-relative">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="stat-label mb-0">CONSOLIDATED NET LIQUIDITY</span>
                  <span className="bf-badge bf-badge-green">
                    {netBalance > 0 ? 'AUDITED REAL-TIME' : 'Awaiting Opening Capital'}
                  </span>
                </div>

                <div className="d-flex align-items-baseline gap-3 mb-2 flex-wrap">
                  <h1 className="fw-extrabold text-dark mb-0" style={{ letterSpacing: '-1.5px', fontSize: '38px' }}>
                    ₦{netBalance.toLocaleString()}.00
                  </h1>
                  <span className="bf-badge bf-badge-green fw-bold">+14.2% MoM</span>
                </div>

                <p className="text-muted small mb-3">
                  Combined capital held across Nigerian sovereign accounts, domiciliary FX reserves, and petty cash vaults.
                </p>

                <div className="d-flex align-items-center gap-3 text-muted small mb-3 flex-wrap">
                  <span className="d-flex align-items-center gap-1">
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00b074' }} />
                    USD Equivalent <strong className="text-dark">$3,233.47</strong>
                  </span>
                  <span className="sep">·</span>
                  <span className="d-flex align-items-center gap-1">
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3498db' }} />
                    GBP Equivalent <strong className="text-dark">£2,552.74</strong>
                  </span>
                </div>

                <div className="pt-2 border-top">
                  <span className="badge bg-light text-muted border fw-semibold small">
                    <RiLockLine className="me-1" /> NDIC INSURED
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Asset Allocation Matrix */}
            <div className="col-lg-5">
              <div className="bf-card p-4 h-100 shadow-sm border-0 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="fw-bold mb-0 text-dark">Asset Allocation Matrix</h6>
                    <span className="stat-label mb-0">BY CURRENCY UNIT</span>
                  </div>

                  {/* Segmented multi-color bar */}
                  <div className="segmented-bar mb-3" style={{ height: 10, borderRadius: 5, display: 'flex', overflow: 'hidden' }}>
                    <div style={{ width: '50.5%', background: '#00b074' }} title="GTBank Corp (50.5%)" />
                    <div style={{ width: '38.6%', background: '#3498db' }} title="USD Vault (38.6%)" />
                    <div style={{ width: '8.6%', background: '#f59e0b' }} title="Personal Savings (8.6%)" />
                    <div style={{ width: '2.3%', background: '#94a3b8' }} title="Petty Cash (2.3%)" />
                  </div>

                  {/* Legend Grid */}
                  <div className="row g-2 mb-3 small">
                    <div className="col-6">
                      <span className="d-flex align-items-center gap-1 text-muted">
                        <span style={{ width: 8, height: 8, background: '#00b074', borderRadius: 2 }} />
                        GTBank Corp (50.5%)
                      </span>
                    </div>
                    <div className="col-6">
                      <span className="d-flex align-items-center gap-1 text-muted">
                        <span style={{ width: 8, height: 8, background: '#3498db', borderRadius: 2 }} />
                        USD Vault (38.6%)
                      </span>
                    </div>
                    <div className="col-6">
                      <span className="d-flex align-items-center gap-1 text-muted">
                        <span style={{ width: 8, height: 8, background: '#f59e0b', borderRadius: 2 }} />
                        Personal Savings (8.6%)
                      </span>
                    </div>
                    <div className="col-6">
                      <span className="d-flex align-items-center gap-1 text-muted">
                        <span style={{ width: 8, height: 8, background: '#94a3b8', borderRadius: 2 }} />
                        Petty Cash (2.3%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between pt-2 border-top small text-muted">
                  <span className="d-flex align-items-center gap-1">
                    <RiShieldCheckLine className="text-success" /> Bank-grade 256-bit encryption
                  </span>
                  <a href="#feeds" className="text-decoration-none fw-bold small" style={{ color: 'var(--bf-primary)' }}>
                    MANAGE FEEDS ➔
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 2 : OPERATING WALLETS & FEEDS ── */}
          <div className="mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold mb-0 text-dark">Operating Wallets &amp; Feeds</h5>
              <div className="d-flex align-items-center gap-2">
                <button
                  className={`btn btn-sm ${viewMode === 'grid' ? 'btn-light border fw-bold' : 'btn-link text-muted'}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid View"
                >
                  <RiLayoutGridLine size={16} />
                </button>
                <button
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-light border fw-bold' : 'btn-link text-muted'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List View"
                >
                  <RiListCheck2 size={16} />
                </button>
              </div>
            </div>

            {/* 4 Wallet Cards */}
            <div className="row g-3">
              {/* Card 1: GTBank Corporate */}
              <div className="col-md-6 col-xl-3">
                <div className="bf-card p-3 h-100 shadow-sm border-0 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            background: '#e05915',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: 10,
                          }}
                        >
                          GTB
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">GTBank Corporate</div>
                          <div className="text-muted" style={{ fontSize: '10.5px' }}>
                            Naira Current Account
                          </div>
                        </div>
                      </div>
                      <span className="bf-badge bf-badge-green" style={{ fontSize: '9px' }}>
                        ACTIVE
                      </span>
                    </div>

                    <div className="stat-label mb-1" style={{ fontSize: '9.5px' }}>
                      AVAILABLE BALANCE
                    </div>
                    <div className="fw-bold fs-5 text-dark mb-1">
                      ₦{wallets.find(w => w.id === 'gtb')?.balance.toLocaleString()}.00
                    </div>

                    <div className="d-flex justify-content-between text-muted" style={{ fontSize: '11px' }}>
                      <span>Acc: **** 4892</span>
                      <span className="text-success fw-semibold">Sync: 2m ago</span>
                    </div>

                    {/* Sparkbars */}
                    <div className="d-flex align-items-end gap-1 mt-3 mb-2" style={{ height: 24 }}>
                      {[30, 45, 60, 50, 80, 95].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${h}%`,
                            background: '#00b074',
                            borderRadius: 2,
                            opacity: 0.8,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top small">
                    <span className="text-success fw-bold" style={{ cursor: 'pointer', fontSize: '11.5px' }}>
                      View Ledger ↗
                    </span>
                    <button
                      className="btn btn-sm btn-light border py-1 px-3 small"
                      onClick={() => {
                        setSourceWalletId('gtb')
                        const el = document.getElementById('rebalance-section')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Transfer
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: USD Dom Vault */}
              <div className="col-md-6 col-xl-3">
                <div className="bf-card p-3 h-100 shadow-sm border-0 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            background: '#3498db',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: 10,
                          }}
                        >
                          $FX
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">USD Dom Vault</div>
                          <div className="text-muted" style={{ fontSize: '10.5px' }}>
                            Access Bank Domiciliary
                          </div>
                        </div>
                      </div>
                      <span className="bf-badge bf-badge-blue" style={{ fontSize: '9px' }}>
                        FOREIGN
                      </span>
                    </div>

                    <div className="stat-label mb-1" style={{ fontSize: '9.5px' }}>
                      VAULT BALANCE (USD)
                    </div>
                    <div className="fw-bold fs-5 text-dark mb-1">
                      ${wallets.find(w => w.id === 'usddom')?.balance.toLocaleString()}.00
                    </div>

                    <div className="d-flex justify-content-between text-muted" style={{ fontSize: '11px' }}>
                      <span>≈ ₦{(wallets.find(w => w.id === 'usddom')?.balance * 1500).toLocaleString()}.00</span>
                      <span>1 USD = ₦1,500</span>
                    </div>

                    {/* Sparkbars */}
                    <div className="d-flex align-items-end gap-1 mt-3 mb-2" style={{ height: 24 }}>
                      {[40, 55, 30, 70, 65, 85].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${h}%`,
                            background: '#64748b',
                            borderRadius: 2,
                            opacity: 0.6,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top small">
                    <span className="text-muted" style={{ cursor: 'pointer', fontSize: '11.5px' }}>
                      FX Rates ⟳
                    </span>
                    <button
                      className="btn btn-sm btn-light border py-1 px-3 small"
                      onClick={() => {
                        setSourceWalletId('usddom')
                        const el = document.getElementById('rebalance-section')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Convert
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Access Personal */}
              <div className="col-md-6 col-xl-3">
                <div className="bf-card p-3 h-100 shadow-sm border-0 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            background: '#047857',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: 10,
                          }}
                        >
                          ACS
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">Access Personal</div>
                          <div className="text-muted" style={{ fontSize: '10.5px' }}>
                            High-Yield Savings
                          </div>
                        </div>
                      </div>
                      <span className="bf-badge bf-badge-yellow" style={{ fontSize: '9px' }}>
                        7.5% APY
                      </span>
                    </div>

                    <div className="stat-label mb-1" style={{ fontSize: '9.5px' }}>
                      SAVINGS BALANCE
                    </div>
                    <div className="fw-bold fs-5 text-dark mb-1">
                      ₦{wallets.find(w => w.id === 'access')?.balance.toLocaleString()}.00
                    </div>

                    <div className="d-flex justify-content-between text-muted" style={{ fontSize: '11px' }}>
                      <span>Acc: **** 8821</span>
                      <span className="text-warning fw-semibold">+₦2,595 int/mo</span>
                    </div>

                    {/* Sparkbars */}
                    <div className="d-flex align-items-end gap-1 mt-3 mb-2" style={{ height: 24 }}>
                      {[20, 35, 45, 60, 75, 90].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${h}%`,
                            background: '#f59e0b',
                            borderRadius: 2,
                            opacity: 0.8,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top small">
                    <span className="text-muted" style={{ cursor: 'pointer', fontSize: '11.5px' }}>
                      Interest Plan ⓘ
                    </span>
                    <button
                      className="btn btn-sm btn-light border py-1 px-3 small"
                      onClick={() => openModal('quickIncome')}
                    >
                      Add Funds
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 4: Cash & Petty Vault */}
              <div className="col-md-6 col-xl-3">
                <div className="bf-card p-3 h-100 shadow-sm border-0 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            background: '#475569',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: 12,
                          }}
                        >
                          💼
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">Cash &amp; Petty Vault</div>
                          <div className="text-muted" style={{ fontSize: '10.5px' }}>
                            Physical Cash Envelope
                          </div>
                        </div>
                      </div>
                      <span className="bf-badge bf-badge-gray" style={{ fontSize: '9px' }}>
                        MANUAL
                      </span>
                    </div>

                    <div className="stat-label mb-1" style={{ fontSize: '9.5px' }}>
                      SAFE DRAWER RESERVES
                    </div>
                    <div className="fw-bold fs-5 text-dark mb-1">
                      ₦{wallets.find(w => w.id === 'petty')?.balance.toLocaleString()}.00
                    </div>

                    <div className="d-flex justify-content-between text-muted" style={{ fontSize: '11px' }}>
                      <span>Envelope #01</span>
                      <span>Reconciled 1d ago</span>
                    </div>

                    {/* Sparkbars */}
                    <div className="d-flex align-items-end gap-1 mt-3 mb-2" style={{ height: 24 }}>
                      {[30, 40, 30, 45, 35, 50].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${h}%`,
                            background: '#94a3b8',
                            borderRadius: 2,
                            opacity: 0.6,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top small">
                    <span className="text-muted" style={{ cursor: 'pointer', fontSize: '11.5px' }}>
                      Count Safe ≡
                    </span>
                    <button
                      className="btn btn-sm btn-light border py-1 px-3 small"
                      onClick={() => openModal('quickExpense')}
                    >
                      Log Expense
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 3 : INTERNAL ACCOUNT REBALANCE + FX BENCHMARKS ── */}
          <div className="row g-4 mb-4" id="rebalance-section">
            {/* Left: Internal Account Rebalance */}
            <div className="col-lg-7">
              <div className="bf-card p-4 h-100 shadow-sm border-0">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: '#dcfce7',
                        color: '#15803d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <RiExchangeLine size={18} />
                    </div>
                    <h6 className="fw-bold mb-0 text-dark">Internal Account Rebalance</h6>
                  </div>
                  <span className="bf-badge bf-badge-green">INSTANT SETTLEMENT</span>
                </div>
                <p className="text-muted small mb-3">Instant zero-fee transfer between verified wallets</p>

                <form onSubmit={handleExecuteTransfer}>
                  <div className="row g-2 mb-3">
                    <div className="col-md-6">
                      <label className="bf-label">SOURCE (FROM)</label>
                      <select
                        className="form-select small"
                        value={sourceWalletId}
                        onChange={e => setSourceWalletId(e.target.value)}
                      >
                        {wallets.map(w => (
                          <option key={w.id} value={w.id}>
                            {w.name} ({w.currency === 'USD' ? `$${w.balance.toLocaleString()}` : `₦${w.balance.toLocaleString()}`})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="bf-label">DESTINATION (TO)</label>
                      <select
                        className="form-select small"
                        value={destWalletId}
                        onChange={e => setDestWalletId(e.target.value)}
                      >
                        {wallets.map(w => (
                          <option key={w.id} value={w.id}>
                            {w.name} ({w.currency === 'USD' ? `$${w.balance.toLocaleString()}` : `₦${w.balance.toLocaleString()}`})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-md-6">
                      <label className="bf-label">TRANSFER AMOUNT</label>
                      <div className="input-group">
                        <span className="input-group-text fw-bold">
                          {sourceWallet.currency === 'USD' ? '$' : '₦'}
                        </span>
                        <input
                          type="number"
                          className="form-control fw-bold"
                          placeholder="0.00"
                          value={transferAmount}
                          onChange={e => setTransferAmount(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm fw-bold px-2"
                          onClick={handleMaxAmount}
                        >
                          MAX
                        </button>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex justify-content-between">
                        <label className="bf-label">SETTLEMENT CREDIT</label>
                        <span className="stat-label mb-0" style={{ fontSize: '9px' }}>
                          LOCKED RATE ₦{lockedRate.toLocaleString()}/$
                        </span>
                      </div>
                      <div
                        className="form-control fw-bold"
                        style={{ background: '#f8fafc', color: '#00b074' }}
                      >
                        {destWallet.currency === 'USD' ? '$' : '₦'}
                        {calculatedSettlement().toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="bf-label">ALLOCATION MEMO / TAG</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Q2 Server Architecture settlement"
                      value={transferMemo}
                      onChange={e => setTransferMemo(e.target.value)}
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 flex-wrap gap-2">
                    <span className="text-muted small d-flex align-items-center gap-1">
                      <RiShieldCheckLine className="text-success" /> Zero intermediary transfer markup
                    </span>
                    <button
                      type="submit"
                      className="bf-btn-primary"
                      style={{ borderRadius: 8, padding: '10px 22px' }}
                    >
                      Execute Internal Transfer ➔
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: FX Treasury Benchmarks & Active Balance Cushion */}
            <div className="col-lg-5 d-flex flex-column gap-3">
              {/* FX Treasury Benchmarks */}
              <div className="bf-card p-3 shadow-sm border-0">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h6 className="fw-bold mb-0 text-dark">FX Treasury Benchmarks</h6>
                  <span className="bf-badge bf-badge-green">CBN / NAFEM</span>
                </div>

                <div className="d-flex flex-column gap-2 mb-2">
                  <div className="p-2 rounded bg-light border d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-bold small text-dark">USD / NGN Spot</div>
                      <div className="text-muted" style={{ fontSize: '10.5px' }}>
                        Interbank Mid-Market
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-dark fs-6">₦1,500.00</div>
                      <div className="text-success small fw-semibold">-0.42% 24h</div>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-light border d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-bold small text-dark">GBP / NGN Spot</div>
                      <div className="text-muted" style={{ fontSize: '10.5px' }}>
                        Commercial Bank Offer
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-dark fs-6">₦1,980.22</div>
                      <div className="text-danger small fw-semibold">+0.35% 24h</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Balance Cushion Rule */}
              <div className="bf-card p-3 shadow-sm border-0">
                <div className="d-flex align-items-start gap-2 mb-2">
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 6,
                      background: '#ede9fe',
                      color: '#6366f1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <RiShieldCheckLine size={18} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark small">Active Balance Cushion Rule</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '11px', lineHeight: 1.4 }}>
                      GTBank Corporate is set to maintain a minimum floor balance of ₦500,000. Automated auto-sweep buffers excess funds into Access High-Yield Savings every Sunday at 23:59 UTC.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between pt-2 border-top small">
                  <span className="text-success fw-bold" style={{ fontSize: '11px' }}>
                    ● AUTO-SWEEP SCHEDULED IN 3 DAYS
                  </span>
                  <a href="#rules" className="text-decoration-none fw-semibold small text-muted">
                    Adjust Rules
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 4 : RECENT FEED SYNC & LEDGER RECONCILIATIONS ── */}
          <div className="bf-card p-4 shadow-sm border-0 mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
              <div>
                <h5 className="fw-bold mb-0 text-dark">Recent Feed Sync &amp; Ledger Reconciliations</h5>
                <p className="text-muted small mb-0">Audit trails, direct debit schedules, and real-time bank ledger status</p>
              </div>

              {/* Filter Pills */}
              <div className="d-flex align-items-center gap-1">
                {['All Logs', 'Bank Feeds', 'Internal Sweeps'].map(f => (
                  <button
                    key={f}
                    className={`btn btn-sm ${
                      logFilter === f ? 'btn-light border fw-bold text-dark' : 'btn-link text-muted'
                    }`}
                    style={{ fontSize: '11.5px', textDecoration: 'none' }}
                    onClick={() => setLogFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle border-0 mb-0">
                <thead>
                  <tr className="text-muted small border-bottom">
                    <th className="border-0 pb-2">EVENT / ENTITY</th>
                    <th className="border-0 pb-2">ACCOUNT CHANNEL</th>
                    <th className="border-0 pb-2">STATUS / PROTOCOL</th>
                    <th className="border-0 pb-2">TIMESTAMP</th>
                    <th className="border-0 pb-2 text-end">FLOW AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map(item => (
                    <tr key={item.id} className="border-bottom">
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: item.type === 'credit' ? '#dcfce7' : '#fee2e2',
                              color: item.type === 'credit' ? '#15803d' : '#b91c1c',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 14,
                              flexShrink: 0,
                            }}
                          >
                            {item.type === 'credit' ? '↓' : '↑'}
                          </div>
                          <div>
                            <div className="fw-bold text-dark small">{item.event}</div>
                            <div className="text-muted" style={{ fontSize: '11px' }}>
                              {item.ref}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted small">{item.channel}</td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            background:
                              item.statusColor === 'green'
                                ? '#dcfce7'
                                : item.statusColor === 'blue'
                                ? '#e0f2fe'
                                : item.statusColor === 'amber'
                                ? '#fef3c7'
                                : '#f1f5f9',
                            color:
                              item.statusColor === 'green'
                                ? '#15803d'
                                : item.statusColor === 'blue'
                                ? '#0369a1'
                                : item.statusColor === 'amber'
                                ? '#b45309'
                                : '#475569',
                            fontWeight: 600,
                            fontSize: '10.5px',
                            padding: '4px 8px',
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="text-muted small">{item.timestamp}</td>
                      <td className="text-end">
                        <span
                          className="fw-bold"
                          style={{
                            color: item.type === 'credit' ? '#00b074' : '#e74c3c',
                            fontSize: '13.5px',
                          }}
                        >
                          {item.amount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="d-flex align-items-center justify-content-between pt-3 border-top small text-muted">
              <span>Showing {filteredLogs.length} of 142 historical ledger transactions</span>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-light border py-1 px-3">Previous</button>
                <button className="btn btn-sm btn-light border py-1 px-3">Next</button>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* ============================================================
            SLIDE 2 : FX TREASURY BENCHMARKS & ROUTING
        ============================================================ */}
        <Carousel.Item>
          <div className="bf-card p-4 shadow-sm border-0 mb-4">
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
              <div>
                <span className="bf-badge-pulse">FX TREASURY PORTFOLIO</span>
                <h2 className="fw-bold text-dark mt-1 mb-0">Multi-Currency Hedging &amp; SWIFT Feeds</h2>
                <div className="text-muted small">Global remittance coordinates for Bamigbola Abdulmalik Opeyemi</div>
              </div>
              <button className="bf-btn-outline" onClick={() => setSlideIndex(0)}>
                Back to Wallets Overview
              </button>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="p-3 border rounded bg-light">
                  <div className="stat-label">DOMICILIARY SWIFT ROUTING</div>
                  <div className="fw-bold text-dark fs-5 mb-1">GTBINGLA</div>
                  <div className="text-muted small">Intermediary: Citibank New York</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded bg-light">
                  <div className="stat-label">NAFEM PARALLEL SPREAD</div>
                  <div className="fw-bold text-dark fs-5 mb-1">₦18.40 (1.2%)</div>
                  <div className="text-success small fw-semibold">Narrow spread · Optimal liquidation</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded bg-light">
                  <div className="stat-label">CROSS-BORDER SETTLEMENT SPEED</div>
                  <div className="fw-bold text-dark fs-5 mb-1">&lt; 14 Mins</div>
                  <div className="text-primary small fw-semibold">Automated API STP Clearing</div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded bg-white">
              <h6 className="fw-bold text-dark mb-2">Automated Liquidity Cushion Protocol</h6>
              <p className="text-muted small mb-0">
                All foreign remittances entering via Stripe, Deel, or Wire SWIFT are automatically checked against
                Nigerian statutory CBN guidelines, credited into the designated USD Domiciliary Vault, and available for
                instant zero-fee settlement into GTBank Corporate or Access Personal.
              </p>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
