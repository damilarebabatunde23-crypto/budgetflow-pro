import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export const DEFAULT_USER = {
  fullName: 'Executive Lead',
  displayName: 'Workspace Lead',
  email: '',
  entityName: 'Enterprise Workspace Ltd',
  tin: 'N/A',
  plan: 'Pro Enterprise Plan',
  avatarInitials: 'EL',
  phone: '',
  city: 'Lagos, Nigeria',
}

export const DEMO_USER = {
  id: 'demo-user',
  fullName: 'Bamigbola Abdulmalik Opeyemi',
  displayName: 'Bamigbola A. Opeyemi',
  email: 'demo@budgetflow.pro',
  entityName: 'Bamigbola Holdings & Studios Ltd',
  tin: '23984182-9981',
  plan: 'Pro Enterprise Plan',
  avatarInitials: 'BA',
  phone: '+234 803 892 4110',
  city: 'Lagos, Nigeria',
}

export const INITIAL_WALLETS = [
  {
    id: 'gtb',
    name: 'GTBank Corporate',
    type: 'Naira Current Account',
    currency: 'NGN',
    balance: 0,
    accountNo: '**** 4892',
    syncTime: 'Awaiting opening deposit',
    badge: 'ACTIVE',
    badgeType: 'green',
    iconText: 'GTB',
    bars: [10, 10, 10, 10, 10, 10],
    color: '#00b074',
  },
  {
    id: 'usddom',
    name: 'USD Dom Vault',
    type: 'Access Bank Domiciliary',
    currency: 'USD',
    balance: 0,
    balanceNGN: 0,
    rate: 1500,
    badge: 'FOREIGN',
    badgeType: 'blue',
    iconText: '$FX',
    bars: [10, 10, 10, 10, 10, 10],
    color: '#3498db',
  },
  {
    id: 'access',
    name: 'Access Personal',
    type: 'High-Yield Savings',
    currency: 'NGN',
    balance: 0,
    accountNo: '**** 8821',
    interest: '7.5% APY',
    badge: '7.5% APY',
    badgeType: 'amber',
    iconText: 'ACS',
    bars: [10, 10, 10, 10, 10, 10],
    color: '#f39c12',
  },
  {
    id: 'petty',
    name: 'Cash & Petty Vault',
    type: 'Physical Cash Envelope',
    currency: 'NGN',
    balance: 0,
    envelope: 'Envelope #01',
    reconciled: 'Initial setup',
    badge: 'MANUAL',
    badgeType: 'gray',
    iconText: 'SAFE',
    bars: [10, 10, 10, 10, 10, 10],
    color: '#8b9ab0',
  },
]

export const INITIAL_BUDGETS = [
  {
    id: 'b-1',
    name: 'Food & Dining',
    spent: 0,
    allocated: 150000,
    badge: 'Fresh Cycle',
    badgeColor: 'green',
    barColor: '#00b074',
    note: '0% Exhausted · ₦150,000 Left',
  },
  {
    id: 'b-2',
    name: 'Transport & Fuel',
    spent: 0,
    allocated: 60000,
    badge: 'Fresh Cycle',
    badgeColor: 'green',
    barColor: '#00b074',
    note: '0% Consumed · ₦60,000 Left',
  },
  {
    id: 'b-3',
    name: 'Shopping & Gadgets',
    spent: 0,
    allocated: 100000,
    badge: 'Fresh Cycle',
    badgeColor: 'green',
    barColor: '#00b074',
    note: '0% Exhausted · ₦100,000 Left',
  },
  {
    id: 'b-4',
    name: 'Entertainment',
    spent: 0,
    allocated: 40000,
    badge: 'Fresh Cycle',
    badgeColor: 'cyan',
    barColor: '#06b6d4',
    note: '0% Consumed · ₦40,000 Left',
  },
]

// Safe LocalStorage helpers
function getStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Storage write error', e)
  }
}

export function AppProvider({ children }) {
  // Check if an existing session is saved in localStorage
  const savedUser = getStorage('bf_current_user', null)
  const [isAuthenticated, setIsAuthenticated] = useState(!!savedUser)
  const [user, setUser] = useState(savedUser || DEFAULT_USER)

  // Load saved workspace data for the active user, if any
  const userKey = savedUser?.email ? savedUser.email.toLowerCase() : null
  const savedData = userKey ? getStorage(`bf_data_${userKey}`, null) : null

  // Global Currency Preference
  const [currency, setCurrency] = useState(savedData?.currency || 'NGN') // 'NGN' | 'USD'

  // Mobile Sidebar Drawer
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Balances
  const [netBalance, setNetBalance] = useState(savedData?.netBalance ?? 0)
  const [monthlyInflow, setMonthlyInflow] = useState(savedData?.monthlyInflow ?? 0)
  const [monthlyOutflow, setMonthlyOutflow] = useState(savedData?.monthlyOutflow ?? 0)

  // Wallets
  const [wallets, setWallets] = useState(savedData?.wallets || INITIAL_WALLETS)

  // Transactions
  const [transactions, setTransactions] = useState(savedData?.transactions || [])

  // Active Budgets
  const [budgets, setBudgets] = useState(savedData?.budgets || INITIAL_BUDGETS)

  // Reconciliation logs on Wallets page
  const [reconciliations, setReconciliations] = useState(savedData?.reconciliations || [])

  // Modals visibility
  const [modalState, setModalState] = useState({
    quickIncome: false,
    quickExpense: false,
    newBudget: false,
    linkBank: false,
    scanReceipt: false,
    exportPdf: false,
    distributeCapital: false,
  })

  // Toast alerts
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4500)
  }

  const openModal = modalKey => setModalState(prev => ({ ...prev, [modalKey]: true }))
  const closeModal = modalKey => setModalState(prev => ({ ...prev, [modalKey]: false }))

  // Save workspace changes whenever state updates and user is logged in
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const emailKey = user.email.toLowerCase()
      setStorage(`bf_data_${emailKey}`, {
        currency,
        netBalance,
        monthlyInflow,
        monthlyOutflow,
        wallets,
        transactions,
        budgets,
        reconciliations,
      })
    }
  }, [
    isAuthenticated,
    user?.email,
    currency,
    netBalance,
    monthlyInflow,
    monthlyOutflow,
    wallets,
    transactions,
    budgets,
    reconciliations,
  ])

  // Save user profile edits (e.g. from Settings)
  const handleSetUser = updater => {
    setUser(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (isAuthenticated && next?.email) {
        setStorage('bf_current_user', next)
        const users = getStorage('bf_users', [])
        const updatedUsers = users.map(u => (u.email.toLowerCase() === next.email.toLowerCase() ? { ...u, ...next } : u))
        setStorage('bf_users', updatedUsers)
      }
      return next
    })
  }

  // Capital Distribution Function (User inputs capital and distributes to wallets)
  const distributeCapital = ({ totalAmount, allocations }) => {
    const total = parseFloat(totalAmount) || 0
    if (total <= 0) {
      showToast('Please enter a valid amount greater than 0', 'error')
      return
    }

    setNetBalance(prev => prev + total)
    setMonthlyInflow(prev => prev + total)

    setWallets(prev =>
      prev.map(w => {
        const allocatedNGN = allocations[w.id] || 0
        if (w.currency === 'USD') {
          const usdAmount = Math.round(allocatedNGN / (w.rate || 1500))
          return {
            ...w,
            balance: w.balance + usdAmount,
            syncTime: 'Just now',
            bars: [25, 45, 60, 55, 75, 90],
          }
        } else {
          return {
            ...w,
            balance: w.balance + allocatedNGN,
            syncTime: 'Just now',
            bars: [30, 50, 65, 70, 85, 95],
          }
        }
      })
    )

    const initialTx = {
      id: `tx-${Date.now()}`,
      merchant: 'Capital Injection & Allocation',
      detail: 'Opening capital distribution across operational vaults',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Income',
      catColor: '#00b074',
      wallet: 'Multi-Vault Allocation',
      amount: total,
      type: 'credit',
      icon: '🏛️',
      iconBg: '#e6f9f2',
    }

    setTransactions(prev => [initialTx, ...prev])

    const recLog = {
      id: `rec-${Date.now()}`,
      event: 'Initial Capital Injection Synchronized',
      ref: `Ref: CAP-INJECT-${Date.now().toString().slice(-6)}`,
      channel: 'Consolidated Treasury',
      status: 'RECONCILED',
      statusColor: 'green',
      timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: `+₦${total.toLocaleString()}.00`,
      type: 'credit',
      category: 'Bank Feeds',
    }

    setReconciliations(prev => [recLog, ...prev])
    showToast(`₦${total.toLocaleString()} allocated & distributed successfully!`)
    closeModal('distributeCapital')
  }

  const distributeInitialCapital = amount => {
    const gtbAmt = Math.round(amount * 0.5)
    const usdAmt = Math.round(amount * 0.3)
    const accessAmt = Math.round(amount * 0.15)
    const pettyAmt = amount - (gtbAmt + usdAmt + accessAmt)

    distributeCapital({
      totalAmount: amount,
      allocations: {
        gtb: gtbAmt,
        usddom: usdAmt,
        access: accessAmt,
        petty: pettyAmt,
      },
    })
  }

  // Authentication Handlers
  const login = (emailInput, passwordInput) => {
    const email = (emailInput || '').trim().toLowerCase()
    if (!email) {
      showToast('Please enter your email address.', 'error')
      return false
    }

    // Check if it's the demo account
    if (email === 'demo@budgetflow.pro' || email === 'bamigbola.abdulmalik@budgetflow.pro') {
      return loginDemo()
    }

    const registeredUsers = getStorage('bf_users', [])
    const matchedUser = registeredUsers.find(u => u.email.toLowerCase() === email)

    if (!matchedUser) {
      showToast('No workspace found with this email. Please click "Create Account" first.', 'error')
      return false
    }

    if (matchedUser.password && passwordInput && matchedUser.password !== passwordInput) {
      showToast('Incorrect security passkey. Please try again.', 'error')
      return false
    }

    // Load workspace data for this user
    const userData = getStorage(`bf_data_${email}`, null)
    setUser(matchedUser)
    setStorage('bf_current_user', matchedUser)

    if (userData) {
      setCurrency(userData.currency || 'NGN')
      setNetBalance(userData.netBalance ?? 0)
      setMonthlyInflow(userData.monthlyInflow ?? 0)
      setMonthlyOutflow(userData.monthlyOutflow ?? 0)
      setWallets(userData.wallets || INITIAL_WALLETS)
      setBudgets(userData.budgets || INITIAL_BUDGETS)
      setTransactions(userData.transactions || [])
      setReconciliations(userData.reconciliations || [])
    } else {
      setNetBalance(0)
      setMonthlyInflow(0)
      setMonthlyOutflow(0)
      setWallets(INITIAL_WALLETS)
      setBudgets(INITIAL_BUDGETS)
      setTransactions([])
      setReconciliations([])
    }

    setIsAuthenticated(true)
    showToast(`Welcome back, ${matchedUser.displayName}! Workspace unlocked.`)
    return true
  }

  const loginDemo = () => {
    const demoProfile = DEMO_USER
    setUser(demoProfile)
    setStorage('bf_current_user', demoProfile)

    const demoKey = demoProfile.email.toLowerCase()
    const savedDemoData = getStorage(`bf_data_${demoKey}`, null)

    if (savedDemoData) {
      setCurrency(savedDemoData.currency || 'NGN')
      setNetBalance(savedDemoData.netBalance ?? 0)
      setMonthlyInflow(savedDemoData.monthlyInflow ?? 0)
      setMonthlyOutflow(savedDemoData.monthlyOutflow ?? 0)
      setWallets(savedDemoData.wallets || INITIAL_WALLETS)
      setBudgets(savedDemoData.budgets || INITIAL_BUDGETS)
      setTransactions(savedDemoData.transactions || [])
      setReconciliations(savedDemoData.reconciliations || [])
    } else {
      // Pre-fund demo account so visitors can test features immediately
      const demoCapital = 2500000
      const gtbShare = 1250000
      const usdShare = 500 // $500
      const accessShare = 375000
      const pettyShare = 125000

      setNetBalance(demoCapital)
      setMonthlyInflow(demoCapital)
      setMonthlyOutflow(0)
      setWallets([
        {
          id: 'gtb',
          name: 'GTBank Corporate',
          type: 'Naira Current Account',
          currency: 'NGN',
          balance: gtbShare,
          accountNo: '**** 4892',
          syncTime: 'Just now',
          badge: 'ACTIVE',
          badgeType: 'green',
          iconText: 'GTB',
          bars: [30, 50, 65, 70, 85, 95],
          color: '#00b074',
        },
        {
          id: 'usddom',
          name: 'USD Dom Vault',
          type: 'Access Bank Domiciliary',
          currency: 'USD',
          balance: usdShare,
          balanceNGN: 750000,
          rate: 1500,
          badge: 'FOREIGN',
          badgeType: 'blue',
          iconText: '$FX',
          bars: [25, 45, 60, 55, 75, 90],
          color: '#3498db',
        },
        {
          id: 'access',
          name: 'Access Personal',
          type: 'High-Yield Savings',
          currency: 'NGN',
          balance: accessShare,
          accountNo: '**** 8821',
          interest: '7.5% APY',
          badge: '7.5% APY',
          badgeType: 'amber',
          iconText: 'ACS',
          bars: [30, 50, 65, 70, 85, 95],
          color: '#f39c12',
        },
        {
          id: 'petty',
          name: 'Cash & Petty Vault',
          type: 'Physical Cash Envelope',
          currency: 'NGN',
          balance: pettyShare,
          envelope: 'Envelope #01',
          reconciled: 'Initial setup',
          badge: 'MANUAL',
          badgeType: 'gray',
          iconText: 'SAFE',
          bars: [30, 50, 65, 70, 85, 95],
          color: '#8b9ab0',
        },
      ])
      setBudgets(INITIAL_BUDGETS)
      setTransactions([
        {
          id: 'tx-demo-1',
          merchant: 'Enterprise Capital Injection',
          detail: 'Pre-funded demonstration liquidity across operational vaults',
          date: 'Today',
          time: '09:00 AM',
          category: 'Income',
          catColor: '#00b074',
          wallet: 'Multi-Vault Allocation',
          amount: demoCapital,
          type: 'credit',
          icon: '🏛️',
          iconBg: '#e6f9f2',
        },
      ])
      setReconciliations([
        {
          id: 'rec-demo-1',
          event: 'Opening Treasury Allocation Synchronized',
          ref: 'Ref: DEMO-VAULT-001',
          channel: 'Consolidated Vaults',
          status: 'RECONCILED',
          statusColor: 'green',
          timestamp: 'Today, 09:00 AM',
          amount: `+₦${demoCapital.toLocaleString()}.00`,
          type: 'credit',
          category: 'Bank Feeds',
        },
      ])
    }

    setIsAuthenticated(true)
    showToast('Unlocked Instant Demo Workspace!')
    return true
  }

  const signup = details => {
    const email = (details.email || '').trim().toLowerCase()
    if (!email) {
      showToast('Please provide a valid email address.', 'error')
      return false
    }

    const existingUsers = getStorage('bf_users', [])
    if (existingUsers.some(u => u.email.toLowerCase() === email)) {
      showToast('An account with this email already exists. Please sign in.', 'error')
      return false
    }

    const rawName = (details.fullName || '').trim() || 'New User'
    const nameParts = rawName.split(' ').filter(Boolean)
    const initials =
      nameParts.length >= 2
        ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
        : rawName.slice(0, 2).toUpperCase() || 'BF'

    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: rawName,
      displayName: details.displayName?.trim() || rawName,
      email,
      password: details.password || '',
      entityName: details.entityName?.trim() || 'Independent Enterprise',
      tin: details.tin || 'N/A',
      plan: 'Pro Enterprise Plan',
      avatarInitials: initials,
      phone: details.phone || '',
      city: details.city || 'Lagos, Nigeria',
    }

    // Save into registered users
    setStorage('bf_users', [...existingUsers, newUser])
    setStorage('bf_current_user', newUser)

    // Reset workspace to fresh 0 balances for the new user
    setUser(newUser)
    setNetBalance(0)
    setMonthlyInflow(0)
    setMonthlyOutflow(0)
    setWallets(INITIAL_WALLETS)
    setBudgets(INITIAL_BUDGETS)
    setTransactions([])
    setReconciliations([])
    setIsAuthenticated(true)

    // Distribute opening capital if user provided one during signup
    const initialAmt = parseFloat(details.initialCapital) || 0
    if (initialAmt > 0) {
      distributeInitialCapital(initialAmt)
    } else {
      showToast(`Welcome ${newUser.displayName}! Your workspace is ready.`)
    }

    return true
  }

  const logout = () => {
    localStorage.removeItem('bf_current_user')
    setIsAuthenticated(false)
    setUser(DEFAULT_USER)
    showToast('You have been logged out of the workspace.', 'info')
  }

  // Quick Income Action
  const addIncome = ({ merchant, amount, category, wallet, detail }) => {
    const num = Number(amount)
    if (!num || num <= 0) return

    setNetBalance(prev => prev + num)
    setMonthlyInflow(prev => prev + num)

    setWallets(prev =>
      prev.map(w => {
        if (w.name.toLowerCase().includes(wallet.toLowerCase())) {
          return { ...w, balance: w.balance + num, syncTime: 'Just now' }
        }
        return w
      })
    )

    const newTx = {
      id: `tx-${Date.now()}`,
      merchant: merchant || 'Incoming Revenue',
      detail: detail || 'Direct deposit / Credit',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: category || 'Income',
      catColor: '#00b074',
      wallet: wallet || 'GTBank Corp',
      amount: num,
      type: 'credit',
      icon: '💵',
      iconBg: '#e6f9f2',
    }

    setTransactions(prev => [newTx, ...prev])
    showToast(`₦${num.toLocaleString()} credited successfully to ${wallet}!`)
    closeModal('quickIncome')
  }

  // Quick Expense Action
  const addExpense = ({ merchant, amount, category, wallet, detail }) => {
    const num = Number(amount)
    if (!num || num <= 0) return

    setNetBalance(prev => Math.max(0, prev - num))
    setMonthlyOutflow(prev => prev + num)

    setBudgets(prev =>
      prev.map(b => {
        if (b.name.toLowerCase() === category.toLowerCase()) {
          const newSpent = b.spent + num
          const pct = Math.round((newSpent / (b.allocated || 1)) * 100)
          return {
            ...b,
            spent: newSpent,
            badge: pct >= 90 ? 'Near Limit' : pct >= 80 ? '80% Threshold Reached' : 'Good',
            badgeColor: pct >= 90 ? 'red' : pct >= 80 ? 'amber' : 'green',
            barColor: pct >= 90 ? '#e74c3c' : pct >= 80 ? '#f39c12' : '#00b074',
            note: `${pct}% Exhausted · ₦${Math.max(0, b.allocated - newSpent).toLocaleString()} Left`,
          }
        }
        return b
      })
    )

    setWallets(prev =>
      prev.map(w => {
        if (w.name.toLowerCase().includes(wallet.toLowerCase())) {
          return { ...w, balance: Math.max(0, w.balance - num), syncTime: 'Just now' }
        }
        return w
      })
    )

    const newTx = {
      id: `tx-${Date.now()}`,
      merchant: merchant || 'Discretionary Outflow',
      detail: detail || 'Debit transaction',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: category || 'Expense',
      catColor: '#e74c3c',
      wallet: wallet || 'GTBank Corp',
      amount: num,
      type: 'debit',
      icon: '🧾',
      iconBg: '#fef2f2',
    }

    setTransactions(prev => [newTx, ...prev])
    showToast(`₦${num.toLocaleString()} debited for ${merchant}.`)
    closeModal('quickExpense')
  }

  // Internal Transfer Action
  const executeInternalTransfer = ({ sourceId, destId, sourceAmount, destAmount, memo }) => {
    const src = wallets.find(w => w.id === sourceId)
    const dst = wallets.find(w => w.id === destId)

    if (!src || !dst) {
      showToast('Please select valid accounts', 'error')
      return
    }

    if (src.balance < sourceAmount) {
      showToast(
        `Insufficient balance in ${src.name}! Current balance is ${src.currency === 'USD' ? '$' : '₦'}${src.balance.toLocaleString()}`,
        'error'
      )
      return
    }

    setWallets(prev =>
      prev.map(w => {
        if (w.id === sourceId) {
          return { ...w, balance: w.balance - sourceAmount, syncTime: 'Just now' }
        }
        if (w.id === destId) {
          return { ...w, balance: w.balance + destAmount, syncTime: 'Just now' }
        }
        return w
      })
    )

    const newLog = {
      id: `rec-${Date.now()}`,
      event: `Internal Transfer: ${src.name} ➔ ${dst.name}`,
      ref: memo ? `Memo: ${memo}` : 'Instant Zero-Fee Rebalance',
      channel: dst.name,
      status: 'RECONCILED',
      statusColor: 'green',
      timestamp: 'Just now',
      amount: `+₦${destAmount.toLocaleString()}`,
      type: 'credit',
      category: 'Internal Sweeps',
    }

    setReconciliations(prev => [newLog, ...prev])
    showToast(
      `Transferred ${src.currency === 'USD' ? `$${sourceAmount}` : `₦${sourceAmount.toLocaleString()}`} to ${dst.name} successfully!`
    )
  }

  const addBudget = ({ name, allocated }) => {
    const num = Number(allocated)
    if (!name || !num) return

    setBudgets(prev => [
      ...prev,
      {
        id: `b-${Date.now()}`,
        name,
        spent: 0,
        allocated: num,
        badge: 'New',
        badgeColor: 'cyan',
        barColor: '#00b074',
        note: `0% Exhausted · ₦${num.toLocaleString()} Left`,
      },
    ])
    showToast(`Budget for ${name} set to ₦${num.toLocaleString()}!`)
    closeModal('newBudget')
  }

  const linkBank = ({ bankName, accountType, initialBalance }) => {
    const bal = Number(initialBalance) || 0
    const newWallet = {
      id: `w-${Date.now()}`,
      name: bankName,
      type: accountType || 'Open Banking Savings',
      currency: 'NGN',
      balance: bal,
      accountNo: '**** ' + Math.floor(1000 + Math.random() * 9000),
      syncTime: 'Just now',
      badge: 'ACTIVE',
      badgeType: 'green',
      iconText: bankName.substring(0, 3).toUpperCase(),
      bars: [30, 40, 50, 60, 70, 80],
      color: '#00b074',
    }

    setWallets(prev => [...prev, newWallet])
    if (bal > 0) {
      setNetBalance(prev => prev + bal)
      setMonthlyInflow(prev => prev + bal)
    }
    showToast(`${bankName} account successfully linked!`)
    closeModal('linkBank')
  }

  const syncFeeds = () => {
    showToast('Open Banking feeds synchronized with CBN NAFEM ledger.', 'info')
    setWallets(prev =>
      prev.map(w => ({
        ...w,
        syncTime: 'Just now',
      }))
    )
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        loginDemo,
        signup,
        logout,
        user,
        setUser: handleSetUser,
        currency,
        setCurrency,
        sidebarOpen,
        setSidebarOpen,
        netBalance,
        monthlyInflow,
        monthlyOutflow,
        wallets,
        transactions,
        budgets,
        reconciliations,
        modalState,
        openModal,
        closeModal,
        toasts,
        showToast,
        addIncome,
        addExpense,
        executeInternalTransfer,
        distributeCapital,
        addBudget,
        linkBank,
        syncFeeds,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an AppProvider')
  return ctx
}
