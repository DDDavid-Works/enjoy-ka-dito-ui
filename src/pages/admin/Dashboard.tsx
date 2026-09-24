import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Dashboard.module.css'

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <img src="/images/logo.png" alt="Enjoy Ka Dito" className={styles.logo} />
        <div className={styles.account}>
          <span>{admin?.name}</span>
          <button type="button" onClick={handleLogout} className={styles.logoutButton}>
            Log Out
          </button>
        </div>
      </header>

      <main className={styles.content}>
        <h1 className={styles.title}>Welcome, {admin?.name}.</h1>
        <p className={styles.subtext}>The CMS modules (tour packages, inquiries) will live here.</p>
      </main>
    </div>
  )
}
