import { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useApp } from '../../context/AppContext'
import {
  RiLockLine,
  RiMailLine,
  RiUserLine,
  RiBuildingLine,
  RiEyeLine,
  RiEyeOffLine,
  RiShieldCheckLine,
  RiSparklingLine,
  RiBankCardLine,
  RiFlashlightLine,
} from 'react-icons/ri'

export default function Auth() {
  const { login, signup, loginDemo } = useApp()
  const [authMode, setAuthMode] = useState('login') // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false)

  // Login form state - starts clean and blank
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    remember: true,
  })

  // Signup form state - starts clean and blank
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    displayName: '',
    entityName: '',
    email: '',
    password: '',
    initialCapital: '',
  })

  const handleLoginSubmit = e => {
    e.preventDefault()
    login(loginForm.email, loginForm.password)
  }

  const handleSignupSubmit = e => {
    e.preventDefault()
    signup(signupForm)
  }

  return (
    <div className="auth-shell">
      <div className="container-fluid p-0">
        <div className="row g-0 min-vh-100">
          {/* ── LEFT PANE: BRAND CAROUSEL (DESKTOP) ── */}
          <div className="col-lg-6 d-none d-lg-flex auth-carousel-pane flex-column justify-content-between p-5 text-white">
            {/* Top Logo */}
            <div className="d-flex align-items-center gap-2">
              <div className="bf-logo-icon">B</div>
              <div>
                <div className="bf-logo-text fs-5">BudgetFlow</div>
                <span className="bf-logo-badge">PRO ENTERPRISE</span>
              </div>
            </div>

            {/* Middle Feature Carousel */}
            <div className="my-auto py-4">
              <Carousel indicators controls={false} interval={4000} fade>
                {/* Slide 1 */}
                <Carousel.Item>
                  <div className="auth-carousel-slide">
                    <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 mb-3 fw-bold">
                      <RiShieldCheckLine className="me-1" /> MULTI-CURRENCY VAULTS
                    </span>
                    <h2 className="display-6 fw-bold mb-3">
                      Sovereign Treasury &amp; Real-Time Ledger Allocation
                    </h2>
                    <p className="text-white-50 fs-6 mb-4" style={{ lineHeight: 1.6 }}>
                      Manage segregated corporate accounts across Nigerian Naira and USD Domiciliary
                      holdings with instant NAFEM spot conversions and zero intermediary fee markups.
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center gap-2 small text-white-50">
                        <span className="text-success fs-5">●</span> 256-bit AES Encryption
                      </div>
                      <div className="d-flex align-items-center gap-2 small text-white-50">
                        <span className="text-success fs-5">●</span> NDIC Insured
                      </div>
                    </div>
                  </div>
                </Carousel.Item>

                {/* Slide 2 */}
                <Carousel.Item>
                  <div className="auth-carousel-slide">
                    <span className="badge bg-info-subtle text-info border border-info-subtle px-3 py-1 mb-3 fw-bold">
                      <RiSparklingLine className="me-1" /> CAPITAL DISTRIBUTION
                    </span>
                    <h2 className="display-6 fw-bold mb-3">
                      Input &amp; Distribute Capital on Your Own Terms
                    </h2>
                    <p className="text-white-50 fs-6 mb-4" style={{ lineHeight: 1.6 }}>
                      Start fresh with zero balances. Deposit your opening business capital and allocate
                      custom proportions into operational reserves, tax buffers, and high-yield vaults.
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center gap-2 small text-white-50">
                        <span className="text-info fs-5">●</span> Custom Envelope Ratios
                      </div>
                      <div className="d-flex align-items-center gap-2 small text-white-50">
                        <span className="text-info fs-5">●</span> Automated High-Yield Sweeps
                      </div>
                    </div>
                  </div>
                </Carousel.Item>

                {/* Slide 3 */}
                <Carousel.Item>
                  <div className="auth-carousel-slide">
                    <span className="badge bg-warning-subtle text-warning border border-warning-subtle px-3 py-1 mb-3 fw-bold">
                      <RiBankCardLine className="me-1" /> AI AUDIT &amp; OCR
                    </span>
                    <h2 className="display-6 fw-bold mb-3">
                      Machine-Reading Receipts with Certified PDF Exports
                    </h2>
                    <p className="text-white-50 fs-6 mb-4" style={{ lineHeight: 1.6 }}>
                      Instantly drag and drop receipts for automated merchant extraction, line-item itemization,
                      and generate audited monthly dossiers signed off for statutory tax compliance.
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center gap-2 small text-white-50">
                        <span className="text-warning fs-5">●</span> Automated VAT 7.5% Audit
                      </div>
                      <div className="d-flex align-items-center gap-2 small text-white-50">
                        <span className="text-warning fs-5">●</span> Instant Cryptographic Seals
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>

            {/* Bottom Testimonial Banner */}
            <div className="pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center gap-3">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--bf-primary), #007d52)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                BA
              </div>
              <div className="small">
                <div className="fw-bold">Bamigbola Holdings &amp; Studios Ltd</div>
                <div className="text-white-50">Enterprise Treasury Client · Lagos, Nigeria</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANE: LOGIN / SIGNUP CARD ── */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white">
            <div className="auth-card w-100" style={{ maxWidth: 480 }}>
              {/* Mobile Brand Header */}
              <div className="d-flex align-items-center gap-2 mb-4 d-lg-none">
                <div className="bf-logo-icon">B</div>
                <div>
                  <div className="bf-logo-text fs-5 text-dark">BudgetFlow</div>
                  <span className="bf-logo-badge">PRO</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-4">
                <h3 className="fw-bold text-dark mb-1">
                  {authMode === 'login' ? 'Sign in to Workspace' : 'Create Enterprise Account'}
                </h3>
                <p className="text-muted small">
                  {authMode === 'login'
                    ? 'Access your multi-currency ledgers, capital allocations, and audit reports.'
                    : 'Establish a new institutional budget workspace for your business.'}
                </p>
              </div>

              {/* Mode Toggle Tabs */}
              <div className="auth-tab-switch mb-4">
                <button
                  type="button"
                  className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthMode('login')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
                  onClick={() => setAuthMode('signup')}
                >
                  Create Account
                </button>
              </div>

              {/* ── LOGIN FORM ── */}
              {authMode === 'login' && (
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label className="bf-label">Work Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted">
                        <RiMailLine />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="e.g. name@company.com"
                        required
                        value={loginForm.email}
                        onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="bf-label mb-0">Password</label>
                      <a href="#forgot" className="small text-decoration-none text-success fw-semibold">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted">
                        <RiLockLine />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Enter your security passkey"
                        required
                        value={loginForm.password}
                        onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                      </button>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={loginForm.remember}
                        onChange={e => setLoginForm({ ...loginForm, remember: e.target.checked })}
                      />
                      <label className="form-check-label small text-muted" htmlFor="rememberMe">
                        Remember this workstation
                      </label>
                    </div>
                    <span className="badge bg-light text-muted border small">2FA Protected</span>
                  </div>

                  <button
                    type="submit"
                    className="bf-btn-primary w-100 justify-content-center py-2 mb-3 fs-6"
                  >
                    Sign In to Workspace ➔
                  </button>

                  {/* One-Click Instant Access Demo Button */}
                  <button
                    type="button"
                    className="btn btn-light border w-100 fw-bold py-2 small d-flex align-items-center justify-content-center gap-2 mb-3"
                    onClick={loginDemo}
                  >
                    <RiFlashlightLine className="text-warning" size={16} />
                    Explore Instant Demo Workspace
                  </button>
                </form>
              )}

              {/* ── SIGNUP FORM ── */}
              {authMode === 'signup' && (
                <form onSubmit={handleSignupSubmit}>
                  <div className="mb-3">
                    <label className="bf-label">Full Legal Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted">
                        <RiUserLine />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Babatunde Adeyemi"
                        required
                        value={signupForm.fullName}
                        onChange={e => setSignupForm({ ...signupForm, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="bf-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Tunde A."
                        required
                        value={signupForm.displayName}
                        onChange={e => setSignupForm({ ...signupForm, displayName: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="bf-label">Business / Entity</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light text-muted">
                          <RiBuildingLine />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Adeyemi Logistics Ltd"
                          required
                          value={signupForm.entityName}
                          onChange={e => setSignupForm({ ...signupForm, entityName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="bf-label">Work Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted">
                        <RiMailLine />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="e.g. tunde@adeyemilogistics.com"
                        required
                        value={signupForm.email}
                        onChange={e => setSignupForm({ ...signupForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Optional opening capital to distribute */}
                  <div className="mb-3 p-3 rounded bg-light border">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="bf-label mb-0 text-dark">
                        Opening Capital to Distribute (Optional)
                      </label>
                      <span className="badge bg-success-subtle text-success small">₦ 0.00 Default</span>
                    </div>
                    <div className="input-group mt-1">
                      <span className="input-group-text fw-bold">₦</span>
                      <input
                        type="number"
                        className="form-control fw-bold"
                        placeholder="0.00 (Enter amount to fund)"
                        value={signupForm.initialCapital}
                        onChange={e => setSignupForm({ ...signupForm, initialCapital: e.target.value })}
                      />
                    </div>
                    <div className="text-muted small mt-1" style={{ fontSize: '11px' }}>
                      Leave blank or 0 to manually deposit and distribute capital inside the workspace.
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="bf-label">Security Passkey</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted">
                        <RiLockLine />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Min. 8 characters"
                        required
                        value={signupForm.password}
                        onChange={e => setSignupForm({ ...signupForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bf-btn-primary w-100 justify-content-center py-2 mb-3 fs-6"
                  >
                    Create Pro Workspace ➔
                  </button>
                </form>
              )}

              {/* Security Footer */}
              <div className="text-center pt-3 border-top text-muted small">
                <RiShieldCheckLine className="text-success me-1" />
                <span>Protected by NDIC Insurance &amp; SOC-2 Type II protocols</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
