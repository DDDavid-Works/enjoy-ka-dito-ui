import { Link, useNavigate } from 'react-router-dom'
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
        <p className={styles.subtext}>Manage the site's content below.</p>

        <div className={styles.modules}>
          <Link to="/admin/packages" className={styles.moduleCard}>
            <span className={styles.moduleTitle}>Tour Packages</span>
            <span className={styles.moduleDesc}>Create, edit, and publish tour packages.</span>
          </Link>
          <Link to="/admin/inquiries" className={styles.moduleCard}>
            <span className={styles.moduleTitle}>Inquiries</span>
            <span className={styles.moduleDesc}>Review quote requests and contact messages.</span>
          </Link>
          <Link to="/admin/hotels" className={styles.moduleCard}>
            <span className={styles.moduleTitle}>Hotels & Resorts</span>
            <span className={styles.moduleDesc}>Manage partner hotel and resort contacts.</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
