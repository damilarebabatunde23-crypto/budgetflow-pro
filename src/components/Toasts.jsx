import { useApp } from '../context/AppContext'
import { RiCheckLine, RiInformationLine, RiAlertLine } from 'react-icons/ri'

export default function Toasts() {
  const { toasts } = useApp()

  if (!toasts.length) return null

  return (
    <div className="bf-toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`bf-toast bf-toast-${t.type}`}>
          <div className="bf-toast-icon">
            {t.type === 'success' && <RiCheckLine size={16} />}
            {t.type === 'info' && <RiInformationLine size={16} />}
            {t.type === 'error' && <RiAlertLine size={16} />}
          </div>
          <div className="bf-toast-content">{t.message}</div>
        </div>
      ))}
    </div>
  )
}
