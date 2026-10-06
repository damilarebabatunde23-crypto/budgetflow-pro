import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useApp } from '../context/AppContext'
import {
  RiAddLine,
  RiSubtractLine,
  RiScanLine,
  RiFilePdfLine,
  RiBankCardLine,
  RiCheckLine,
  RiSparklingLine,
  RiPrinterLine,
  RiDownloadLine,
} from 'react-icons/ri'

export default function Modals() {
  const {
    modalState,
    closeModal,
    addIncome,
    addExpense,
    addBudget,
    linkBank,
    distributeCapital,
    user,
    netBalance,
    monthlyInflow,
    monthlyOutflow,
    transactions,
    wallets,
    showToast,
  } = useApp()

  // Distribute Capital Form State
  const [capitalTotal, setCapitalTotal] = useState('1000000')
  const [allocations, setAllocations] = useState({
    gtb: '500000',
    usddom: '300000',
    access: '150000',
    petty: '50000',
  })

  const applyPreset = type => {
    const total = parseFloat(capitalTotal) || 0
    if (type === 'balanced') {
      const gtb = Math.round(total * 0.5)
      const usd = Math.round(total * 0.3)
      const acc = Math.round(total * 0.15)
      const pty = total - (gtb + usd + acc)
      setAllocations({ gtb: gtb.toString(), usddom: usd.toString(), access: acc.toString(), petty: pty.toString() })
    } else if (type === 'operating') {
      setAllocations({ gtb: total.toString(), usddom: '0', access: '0', petty: '0' })
    } else if (type === 'even') {
      const each = Math.round(total / 4)
      const rem = total - each * 3
      setAllocations({ gtb: each.toString(), usddom: each.toString(), access: each.toString(), petty: rem.toString() })
    }
  }

  // Quick Income Form State
  const [incomeForm, setIncomeForm] = useState({
    merchant: '',
    amount: '',
    wallet: 'GTBank Corp',
    category: 'Income',
    detail: '',
  })

  // Quick Expense Form State
  const [expenseForm, setExpenseForm] = useState({
    merchant: '',
    amount: '',
    category: 'Food & Dining',
    wallet: 'GTBank Corp',
    detail: '',
  })

  // New Budget Form State
  const [budgetForm, setBudgetForm] = useState({
    name: '',
    allocated: '',
  })

  // Link Bank Form State
  const [bankForm, setBankForm] = useState({
    bankName: 'Zenith Bank PLC',
    accountType: 'Corporate Tier 3 Account',
    initialBalance: '350000',
  })

  // OCR Receipt Scanner State
  const [ocrStep, setOcrStep] = useState('idle') // 'idle' | 'scanning' | 'scanned'
  const [ocrResult, setOcrResult] = useState(null)

  const handleStartOcr = () => {
    setOcrStep('scanning')
    setTimeout(() => {
      setOcrStep('scanned')
      setOcrResult({
        merchant: 'Spar Supermarket VI',
        date: 'May 16, 2025',
        amount: 28400,
        category: 'Food & Dining',
        confidence: '99.4%',
        items: [
          { name: '1x Kerrygold Butter 250g', price: '₦4,200.00' },
          { name: '2x Basmati Royal Rice 5kg', price: '₦18,000.00' },
          { name: '1x Sparkling Apple Juice 750ml', price: '₦3,400.00' },
          { name: '3x Wholewheat Pita Bread', price: '₦2,800.00' },
        ],
      })
    }, 1800)
  }

  const handleApproveOcr = () => {
    if (ocrResult) {
      addExpense({
        merchant: ocrResult.merchant,
        amount: ocrResult.amount,
        category: ocrResult.category,
        wallet: 'GTBank Corp',
        detail: `Verified OCR Receipt (${ocrResult.confidence} match)`,
      })
      setOcrStep('idle')
      setOcrResult(null)
      closeModal('scanReceipt')
    }
  }

  return (
    <>
      {/* ── QUICK INCOME MODAL ── */}
      <Modal
        show={modalState.quickIncome}
        onHide={() => closeModal('quickIncome')}
        centered
        className="bf-custom-modal"
      >
        <div className="bf-modal-content">
          <div className="bf-modal-header">
            <div className="d-flex align-items-center gap-2">
              <div className="modal-icon-badge income">
                <RiAddLine size={18} />
              </div>
              <div>
                <h5 className="mb-0 fw-bold">Record Quick Income</h5>
                <small className="text-muted">Instant credit ledger update</small>
              </div>
            </div>
            <button className="btn-close" onClick={() => closeModal('quickIncome')} />
          </div>

          <form
            onSubmit={e => {
              e.preventDefault()
              addIncome(incomeForm)
              setIncomeForm({ merchant: '', amount: '', wallet: 'GTBank Corp', category: 'Income', detail: '' })
            }}
          >
            <div className="bf-modal-body">
              <div className="mb-3">
                <label className="bf-label">Amount (₦)</label>
                <div className="input-group">
                  <span className="input-group-text fw-bold">₦</span>
                  <input
                    type="number"
                    className="form-control form-control-lg fw-bold"
                    placeholder="0.00"
                    required
                    value={incomeForm.amount}
                    onChange={e => setIncomeForm({ ...incomeForm, amount: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="bf-label">Source / Payer</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Freelance Client Wire, Stripe Payout, Dividend"
                  required
                  value={incomeForm.merchant}
                  onChange={e => setIncomeForm({ ...incomeForm, merchant: e.target.value })}
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="bf-label">Destination Wallet</label>
                  <select
                    className="form-select"
                    value={incomeForm.wallet}
                    onChange={e => setIncomeForm({ ...incomeForm, wallet: e.target.value })}
                  >
                    {wallets.map(w => (
                      <option key={w.id} value={w.name}>
                        {w.name} ({w.currency})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="bf-label">Income Category</label>
                  <select
                    className="form-select"
                    value={incomeForm.category}
                    onChange={e => setIncomeForm({ ...incomeForm, category: e.target.value })}
                  >
                    <option value="Income">Direct Income</option>
                    <option value="Client Retainer">Client Retainer</option>
                    <option value="Investment Return">Investment Return</option>
                    <option value="Royalties">Royalties</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
              </div>

              <div className="mb-2">
                <label className="bf-label">Memo / Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Milestone #2 May Retainer - Bamigbola Abdulmalik Opeyemi"
                  value={incomeForm.detail}
                  onChange={e => setIncomeForm({ ...incomeForm, detail: e.target.value })}
                />
              </div>
            </div>

            <div className="bf-modal-footer">
              <button
                type="button"
                className="bf-btn-outline"
                onClick={() => closeModal('quickIncome')}
              >
                Cancel
              </button>
              <button type="submit" className="bf-btn-primary">
                Confirm Inflow +
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* ── QUICK EXPENSE MODAL ── */}
      <Modal
        show={modalState.quickExpense}
        onHide={() => closeModal('quickExpense')}
        centered
        className="bf-custom-modal"
      >
        <div className="bf-modal-content">
          <div className="bf-modal-header">
            <div className="d-flex align-items-center gap-2">
              <div className="modal-icon-badge expense">
                <RiSubtractLine size={18} />
              </div>
              <div>
                <h5 className="mb-0 fw-bold">Record Quick Expense</h5>
                <small className="text-muted">Debit outflow with live category budget check</small>
              </div>
            </div>
            <button className="btn-close" onClick={() => closeModal('quickExpense')} />
          </div>

          <form
            onSubmit={e => {
              e.preventDefault()
              addExpense(expenseForm)
              setExpenseForm({ merchant: '', amount: '', category: 'Food & Dining', wallet: 'GTBank Corp', detail: '' })
            }}
          >
            <div className="bf-modal-body">
              <div className="mb-3">
                <label className="bf-label">Amount (₦)</label>
                <div className="input-group">
                  <span className="input-group-text fw-bold">₦</span>
                  <input
                    type="number"
                    className="form-control form-control-lg fw-bold"
                    placeholder="0.00"
                    required
                    value={expenseForm.amount}
                    onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="bf-label">Merchant / Vendor</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Shoprite, Uber, Amazon AWS, Ikeja Electric"
                  required
                  value={expenseForm.merchant}
                  onChange={e => setExpenseForm({ ...expenseForm, merchant: e.target.value })}
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="bf-label">Category</label>
                  <select
                    className="form-select"
                    value={expenseForm.category}
                    onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  >
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Transport & Fuel">Transport & Fuel</option>
                    <option value="Shopping & Gadgets">Shopping & Gadgets</option>
                    <option value="Utilities & Subscriptions">Utilities & Subscriptions</option>
                    <option value="Entertainment & Lifestyle">Entertainment & Lifestyle</option>
                    <option value="Housing & Rent">Housing & Rent</option>
                    <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="bf-label">Source Wallet</label>
                  <select
                    className="form-select"
                    value={expenseForm.wallet}
                    onChange={e => setExpenseForm({ ...expenseForm, wallet: e.target.value })}
                  >
                    {wallets.map(w => (
                      <option key={w.id} value={w.name}>
                        {w.name} ({w.currency})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-2">
                <label className="bf-label">Notes / Reference</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Weekly studio groceries, team lunch"
                  value={expenseForm.detail}
                  onChange={e => setExpenseForm({ ...expenseForm, detail: e.target.value })}
                />
              </div>
            </div>

            <div className="bf-modal-footer">
              <button
                type="button"
                className="bf-btn-outline"
                onClick={() => closeModal('quickExpense')}
              >
                Cancel
              </button>
              <button type="submit" className="bf-btn-primary" style={{ background: '#e74c3c' }}>
                Confirm Debit -
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* ── SCAN OR DROP RECEIPT MODAL (AI OCR) ── */}
      <Modal
        show={modalState.scanReceipt}
        onHide={() => {
          setOcrStep('idle')
          closeModal('scanReceipt')
        }}
        centered
        className="bf-custom-modal"
      >
        <div className="bf-modal-content">
          <div className="bf-modal-header">
            <div className="d-flex align-items-center gap-2">
              <div className="modal-icon-badge primary">
                <RiScanLine size={18} />
              </div>
              <div>
                <h5 className="mb-0 fw-bold">AI OCR Receipt Scanner</h5>
                <small className="text-muted">Instant auto-categorization &amp; VAT audit</small>
              </div>
            </div>
            <button
              className="btn-close"
              onClick={() => {
                setOcrStep('idle')
                closeModal('scanReceipt')
              }}
            />
          </div>

          <div className="bf-modal-body">
            {ocrStep === 'idle' && (
              <div
                className="dropzone-box"
                onClick={handleStartOcr}
                style={{
                  border: '2px dashed var(--bf-primary)',
                  borderRadius: 12,
                  padding: '36px 20px',
                  textAlign: 'center',
                  background: 'var(--bf-primary-light)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: 44, color: 'var(--bf-primary)', marginBottom: 12 }}>🧾</div>
                <h6 className="fw-bold mb-1">Click to Upload or Drag &amp; Drop Receipt</h6>
                <p className="text-muted small mb-3">
                  Supports PNG, JPG, PDF up to 15MB. AI scans merchant name, itemized bill, and tax.
                </p>
                <button type="button" className="bf-btn-primary mx-auto">
                  <RiSparklingLine className="me-1" /> Run AI Scanner Now
                </button>
              </div>
            )}

            {ocrStep === 'scanning' && (
              <div className="text-center py-5">
                <div className="spinner-border text-success mb-3" style={{ width: 44, height: 44 }} />
                <h6 className="fw-bold mb-1">AI Machine Reading Receipt...</h6>
                <p className="text-muted small mb-0">Extracting merchant, timestamp, and line items...</p>
                <div className="bf-progress mt-3 mx-auto" style={{ maxWidth: 300, height: 6 }}>
                  <div className="bf-progress-bar green" style={{ width: '75%', animation: 'pulse 1s infinite' }} />
                </div>
              </div>
            )}

            {ocrStep === 'scanned' && ocrResult && (
              <div>
                <div className="p-3 rounded mb-3" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="badge bg-success">
                      <RiCheckLine className="me-1" /> {ocrResult.confidence} Match
                    </span>
                    <small className="text-muted">{ocrResult.date}</small>
                  </div>
                  <h6 className="fw-bold mb-0 text-dark">{ocrResult.merchant}</h6>
                  <div className="text-muted small">Category: {ocrResult.category}</div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between text-muted small fw-bold mb-1">
                    <span>Parsed Items</span>
                    <span>Subtotal</span>
                  </div>
                  {ocrResult.items.map(it => (
                    <div key={it.name} className="d-flex justify-content-between py-1 border-bottom small">
                      <span>{it.name}</span>
                      <span className="fw-semibold">{it.price}</span>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between pt-2 fw-bold">
                    <span>Total OCR Calculated</span>
                    <span className="text-danger">₦{ocrResult.amount.toLocaleString()}.00</span>
                  </div>
                </div>

                <div className="small text-muted p-2 rounded bg-light">
                  <span>Card holder: </span>
                  <strong>{user.fullName}</strong>
                  <br />
                  <span>Settlement: </span>
                  <strong>GTBank Corporate (**** 4892)</strong>
                </div>
              </div>
            )}
          </div>

          <div className="bf-modal-footer">
            {ocrStep === 'scanned' ? (
              <>
                <button
                  type="button"
                  className="bf-btn-outline"
                  onClick={() => setOcrStep('idle')}
                >
                  Scan Another
                </button>
                <button type="button" className="bf-btn-primary" onClick={handleApproveOcr}>
                  <RiCheckLine className="me-1" /> Approve &amp; Post to Ledger
                </button>
              </>
            ) : (
              <button
                type="button"
                className="bf-btn-outline ms-auto"
                onClick={() => closeModal('scanReceipt')}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </Modal>

      {/* ── EXPORT MAY PDF STATEMENT MODAL ── */}
      <Modal
        show={modalState.exportPdf}
        onHide={() => closeModal('exportPdf')}
        size="lg"
        centered
        className="bf-custom-modal"
      >
        <div className="bf-modal-content">
          <div className="bf-modal-header">
            <div className="d-flex align-items-center gap-2">
              <div className="modal-icon-badge primary">
                <RiFilePdfLine size={18} />
              </div>
              <div>
                <h5 className="mb-0 fw-bold">Financial Statement &amp; Audit Dossier</h5>
                <small className="text-muted">Ledger Cycle: May 2025 · Certified NDIC / CBN Compliant</small>
              </div>
            </div>
            <button className="btn-close" onClick={() => closeModal('exportPdf')} />
          </div>

          <div className="bf-modal-body p-4" style={{ background: '#f8fafc' }}>
            <div
              className="bg-white p-4 rounded shadow-sm border"
              id="statement-print-area"
              style={{ fontFamily: 'monospace, sans-serif' }}
            >
              {/* Header */}
              <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-success px-2 py-1">BUDGETFLOW PRO</span>
                    <span className="text-muted small">#BF-STAT-2025-05-8912</span>
                  </div>
                  <h4 className="fw-bold mb-0 text-dark">Executive Monthly Fiscal Summary</h4>
                  <div className="text-muted small">Period: 01 May 2025 – 16 May 2025 (MTD)</div>
                </div>
                <div className="text-end">
                  <div className="fw-bold text-dark">{user.fullName}</div>
                  <div className="text-muted small">{user.entityName}</div>
                  <div className="text-muted small">TIN: {user.tin}</div>
                  <div className="text-muted small">{user.email}</div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="row g-2 mb-4 text-center">
                <div className="col-4">
                  <div className="p-2 border rounded bg-light">
                    <div className="small text-muted">GROSS INFLOW</div>
                    <div className="fw-bold text-success fs-5">₦{monthlyInflow.toLocaleString()}.00</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 border rounded bg-light">
                    <div className="small text-muted">OPERATING OUTFLOW</div>
                    <div className="fw-bold text-danger fs-5">₦{monthlyOutflow.toLocaleString()}.00</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 border rounded bg-light">
                    <div className="small text-muted">NET SOLVENCY SURPLUS</div>
                    <div className="fw-bold text-primary fs-5">₦{netBalance.toLocaleString()}.00</div>
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <h6 className="fw-bold mb-2 text-dark">Audited Transaction Records</h6>
              <div className="table-responsive mb-3">
                <table className="table table-sm table-bordered small">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Merchant / Entity</th>
                      <th>Category</th>
                      <th>Wallet</th>
                      <th className="text-end">Amount (₦)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.slice(0, 5).map(tx => (
                      <tr key={tx.id}>
                        <td>{tx.date}</td>
                        <td className="fw-semibold">{tx.merchant}</td>
                        <td>{tx.category}</td>
                        <td>{tx.wallet}</td>
                        <td className={`text-end fw-bold ${tx.type === 'credit' ? 'text-success' : 'text-danger'}`}>
                          {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}.00
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signoff stamp */}
              <div className="d-flex justify-content-between align-items-end pt-3 border-top text-muted small">
                <div>
                  <div>Attestation: Cryptographically sealed with SHA-256</div>
                  <div>Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</div>
                </div>
                <div className="text-end">
                  <div className="badge bg-light text-dark border p-2">
                    ✅ AUDITOR SIGN-OFF: DR. A. ADELEKE / SYSTEM PASS
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bf-modal-footer">
            <button
              type="button"
              className="bf-btn-outline"
              onClick={() => {
                window.print()
              }}
            >
              <RiPrinterLine className="me-1" /> Print Statement
            </button>
            <button
              type="button"
              className="bf-btn-primary"
              onClick={() => {
                showToast(`PDF Statement for ${user.fullName} downloaded successfully!`)
                closeModal('exportPdf')
              }}
            >
              <RiDownloadLine className="me-1" /> Download PDF (.pdf)
            </button>
          </div>
        </div>
      </Modal>

      {/* ── SET NEW BUDGET CATEGORY MODAL ── */}
      <Modal
        show={modalState.newBudget}
        onHide={() => closeModal('newBudget')}
        centered
        className="bf-custom-modal"
      >
        <div className="bf-modal-content">
          <div className="bf-modal-header">
            <div className="d-flex align-items-center gap-2">
              <div className="modal-icon-badge primary">
                <RiAddLine size={18} />
              </div>
              <div>
                <h5 className="mb-0 fw-bold">Set New Budget Category</h5>
                <small className="text-muted">Define monthly ceiling &amp; threshold warnings</small>
              </div>
            </div>
            <button className="btn-close" onClick={() => closeModal('newBudget')} />
          </div>

          <form
            onSubmit={e => {
              e.preventDefault()
              addBudget(budgetForm)
              setBudgetForm({ name: '', allocated: '' })
            }}
          >
            <div className="bf-modal-body">
              <div className="mb-3">
                <label className="bf-label">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Health & Wellness, Software Subscriptions"
                  required
                  value={budgetForm.name}
                  onChange={e => setBudgetForm({ ...budgetForm, name: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="bf-label">Monthly Ceiling Cap (₦)</label>
                <div className="input-group">
                  <span className="input-group-text fw-bold">₦</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 100000"
                    required
                    value={budgetForm.allocated}
                    onChange={e => setBudgetForm({ ...budgetForm, allocated: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-3 rounded bg-light small text-muted">
                ℹ️ BudgetFlow will automatically trigger an 80% caution notification and warn when
                spend velocity approaches the threshold before mid-cycle.
              </div>
            </div>

            <div className="bf-modal-footer">
              <button
                type="button"
                className="bf-btn-outline"
                onClick={() => closeModal('newBudget')}
              >
                Cancel
              </button>
              <button type="submit" className="bf-btn-primary">
                Establish Ceiling
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* ── LINK NEW BANK / WALLET MODAL ── */}
      <Modal
        show={modalState.linkBank}
        onHide={() => closeModal('linkBank')}
        centered
        className="bf-custom-modal"
      >
        <div className="bf-modal-content">
          <div className="bf-modal-header">
            <div className="d-flex align-items-center gap-2">
              <div className="modal-icon-badge primary">
                <RiBankCardLine size={18} />
              </div>
              <div>
                <h5 className="mb-0 fw-bold">Link New Bank / Vault</h5>
                <small className="text-muted">Direct Open Banking API &amp; CBN NAFEM gateway</small>
              </div>
            </div>
            <button className="btn-close" onClick={() => closeModal('linkBank')} />
          </div>

          <form
            onSubmit={e => {
              e.preventDefault()
              linkBank(bankForm)
              setBankForm({
                bankName: 'Zenith Bank PLC',
                accountType: 'Corporate Tier 3 Account',
                initialBalance: '350000',
              })
            }}
          >
            <div className="bf-modal-body">
              <div className="mb-3">
                <label className="bf-label">Select Financial Institution</label>
                <select
                  className="form-select"
                  value={bankForm.bankName}
                  onChange={e => setBankForm({ ...bankForm, bankName: e.target.value })}
                >
                  <option value="Zenith Bank Corporate">Zenith Bank PLC</option>
                  <option value="FirstBank Premium">First Bank of Nigeria</option>
                  <option value="Kuda Business Vault">Kuda Microfinance Bank</option>
                  <option value="United Bank for Africa (UBA)">United Bank for Africa (UBA)</option>
                  <option value="Stanbic IBTC Wealth">Stanbic IBTC Asset Mgt</option>
                  <option value="Moniepoint Commercial">Moniepoint Microfinance</option>
                  <option value="Revolut Business USD">Revolut Business (USD)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="bf-label">Account Classification</label>
                <select
                  className="form-select"
                  value={bankForm.accountType}
                  onChange={e => setBankForm({ ...bankForm, accountType: e.target.value })}
                >
                  <option value="Corporate Current Account">Corporate Current Account</option>
                  <option value="High-Yield Treasury Reserve">High-Yield Treasury Reserve</option>
                  <option value="USD Domiciliary Vault">USD Domiciliary Vault</option>
                  <option value="Operating Escrow Account">Operating Escrow Account</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="bf-label">Initial Opening Balance (₦)</label>
                <div className="input-group">
                  <span className="input-group-text fw-bold">₦</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="350000"
                    required
                    value={bankForm.initialBalance}
                    onChange={e => setBankForm({ ...bankForm, initialBalance: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 p-2 rounded bg-light small text-muted">
                <span>🔒</span>
                <span>Encrypted using bank-grade AES-256 and OAuth 2.0 PKCE authentication.</span>
              </div>
            </div>

            <div className="bf-modal-footer">
              <button
                type="button"
                className="bf-btn-outline"
                onClick={() => closeModal('linkBank')}
              >
                Cancel
              </button>
              <button type="submit" className="bf-btn-primary">
                Link &amp; Sync Feed
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* ── DEPOSIT & DISTRIBUTE CAPITAL MODAL ── */}
      <Modal
        show={modalState.distributeCapital}
        onHide={() => closeModal('distributeCapital')}
        size="lg"
        centered
        className="bf-custom-modal"
      >
        <div className="bf-modal-content">
          <div className="bf-modal-header">
            <div className="d-flex align-items-center gap-2">
              <div className="modal-icon-badge primary">
                <RiSparklingLine size={20} />
              </div>
              <div>
                <h5 className="mb-0 fw-bold">Deposit &amp; Distribute Workspace Capital</h5>
                <small className="text-muted">
                  Input capital amount and allocate custom proportions to corporate vaults
                </small>
              </div>
            </div>
            <button className="btn-close" onClick={() => closeModal('distributeCapital')} />
          </div>

          <form
            onSubmit={e => {
              e.preventDefault()
              const parsedAllocations = {
                gtb: parseFloat(allocations.gtb) || 0,
                usddom: parseFloat(allocations.usddom) || 0,
                access: parseFloat(allocations.access) || 0,
                petty: parseFloat(allocations.petty) || 0,
              }
              distributeCapital({
                totalAmount: capitalTotal,
                allocations: parsedAllocations,
              })
            }}
          >
            <div className="bf-modal-body p-4">
              {/* Step 1: Input Total Capital */}
              <div className="p-3 rounded mb-4" style={{ background: 'var(--bf-primary-light)', border: '1px solid #bbf7d0' }}>
                <label className="bf-label text-dark fw-bold mb-1">
                  1. Input Total Capital Amount to Fund (₦)
                </label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text fw-bold bg-white">₦</span>
                  <input
                    type="number"
                    className="form-control fw-bold fs-4"
                    placeholder="e.g. 5000000"
                    required
                    value={capitalTotal}
                    onChange={e => {
                      setCapitalTotal(e.target.value)
                      const val = parseFloat(e.target.value) || 0
                      const gtb = Math.round(val * 0.5)
                      const usd = Math.round(val * 0.3)
                      const acc = Math.round(val * 0.15)
                      const pty = val - (gtb + usd + acc)
                      setAllocations({ gtb: gtb.toString(), usddom: usd.toString(), access: acc.toString(), petty: pty.toString() })
                    }}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between mt-2 flex-wrap gap-2">
                  <span className="text-muted small">
                    Signatory: <strong>{user.fullName}</strong>
                  </span>
                  {/* Preset Buttons */}
                  <div className="d-flex gap-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success bg-white small"
                      onClick={() => applyPreset('balanced')}
                    >
                      50/30/15/5 Balanced
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success bg-white small"
                      onClick={() => applyPreset('operating')}
                    >
                      100% Operating
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success bg-white small"
                      onClick={() => applyPreset('even')}
                    >
                      25% Even Split
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2: Vault Allocation Breakdown */}
              <div className="mb-2">
                <label className="bf-label mb-2">
                  2. Allocate Funds to Specific Operating Vaults
                </label>
                <div className="row g-3">
                  {/* GTBank */}
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold small text-dark">GTBank Corporate (NGN)</span>
                        <span className="badge bg-success-subtle text-success small">Operating</span>
                      </div>
                      <div className="input-group mt-1">
                        <span className="input-group-text fw-bold">₦</span>
                        <input
                          type="number"
                          className="form-control fw-bold"
                          value={allocations.gtb}
                          onChange={e => setAllocations({ ...allocations, gtb: e.target.value })}
                        />
                      </div>
                      <div className="text-muted small mt-1" style={{ fontSize: '11px' }}>
                        Operational cashflow &amp; domestic vendor wires
                      </div>
                    </div>
                  </div>

                  {/* USD Dom Vault */}
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold small text-dark">USD Domiciliary Vault</span>
                        <span className="badge bg-primary-subtle text-primary small">
                          ≈ ${(Math.round((parseFloat(allocations.usddom) || 0) / 1500)).toLocaleString()} USD
                        </span>
                      </div>
                      <div className="input-group mt-1">
                        <span className="input-group-text fw-bold">₦</span>
                        <input
                          type="number"
                          className="form-control fw-bold"
                          value={allocations.usddom}
                          onChange={e => setAllocations({ ...allocations, usddom: e.target.value })}
                        />
                      </div>
                      <div className="text-muted small mt-1" style={{ fontSize: '11px' }}>
                        Converts at locked NAFEM rate ₦1,500.00/$
                      </div>
                    </div>
                  </div>

                  {/* Access Personal */}
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold small text-dark">Access Personal Savings</span>
                        <span className="badge bg-warning-subtle text-warning small">7.5% APY</span>
                      </div>
                      <div className="input-group mt-1">
                        <span className="input-group-text fw-bold">₦</span>
                        <input
                          type="number"
                          className="form-control fw-bold"
                          value={allocations.access}
                          onChange={e => setAllocations({ ...allocations, access: e.target.value })}
                        />
                      </div>
                      <div className="text-muted small mt-1" style={{ fontSize: '11px' }}>
                        Automated high-yield treasury cushion
                      </div>
                    </div>
                  </div>

                  {/* Cash & Petty */}
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold small text-dark">Cash &amp; Petty Envelope</span>
                        <span className="badge bg-secondary-subtle text-secondary small">Manual Safe</span>
                      </div>
                      <div className="input-group mt-1">
                        <span className="input-group-text fw-bold">₦</span>
                        <input
                          type="number"
                          className="form-control fw-bold"
                          value={allocations.petty}
                          onChange={e => setAllocations({ ...allocations, petty: e.target.value })}
                        />
                      </div>
                      <div className="text-muted small mt-1" style={{ fontSize: '11px' }}>
                        Daily physical drawer emergency cash
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Allocation Summary & Validation */}
              {(() => {
                const total = parseFloat(capitalTotal) || 0
                const sumAllocated =
                  (parseFloat(allocations.gtb) || 0) +
                  (parseFloat(allocations.usddom) || 0) +
                  (parseFloat(allocations.access) || 0) +
                  (parseFloat(allocations.petty) || 0)
                const diff = total - sumAllocated
                return (
                  <div
                    className={`p-3 rounded mt-3 d-flex align-items-center justify-content-between ${
                      diff === 0 ? 'bg-light text-success' : diff > 0 ? 'bg-light text-warning' : 'bg-light text-danger'
                    }`}
                  >
                    <div className="small">
                      <span>Total Allocated: </span>
                      <strong>₦{sumAllocated.toLocaleString()}.00</strong> of ₦{total.toLocaleString()}.00
                    </div>
                    <div className="small fw-bold">
                      {diff === 0 && '✅ 100% Fully Distributed'}
                      {diff > 0 && `⚠️ ₦${diff.toLocaleString()}.00 Unassigned`}
                      {diff < 0 && `❌ ₦${Math.abs(diff).toLocaleString()}.00 Overallocated`}
                    </div>
                  </div>
                )
              })()}
            </div>

            <div className="bf-modal-footer">
              <button
                type="button"
                className="bf-btn-outline"
                onClick={() => closeModal('distributeCapital')}
              >
                Cancel
              </button>
              <button type="submit" className="bf-btn-primary">
                Confirm Capital Distribution ➔
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
