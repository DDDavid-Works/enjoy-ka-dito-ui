import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import styles from './Dashboard.module.css'

const MODULE_GROUPS = [
  {
    title: 'Sales',
    modules: [
      { to: '/admin/inquiries', title: 'Inquiries', desc: 'Review quote requests and contact messages.' },
      { to: '/admin/quotations', title: 'Quotations', desc: 'Prepare and track customer quotations.' },
    ],
  },
  {
    title: 'Catalog',
    modules: [
      { to: '/admin/packages', title: 'Tour Packages', desc: 'Create, edit, and publish tour packages.' },
      { to: '/admin/hotels', title: 'Hotels & Resorts', desc: 'Manage partner hotel and resort contacts.' },
    ],
  },
  {
    title: 'Settings',
    modules: [
      {
        to: '/admin/company',
        title: 'Company Details',
        desc: 'Update the email, address, and contact numbers shown on the site.',
      },
    ],
  },
]

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

        {MODULE_GROUPS.map((group) => (
          <section key={group.title} className={styles.group}>
            <h2 className={styles.groupTitle}>{group.title}</h2>
            <div className={styles.modules}>
              {group.modules.map((module) => (
                <Link key={module.to} to={module.to} className={styles.moduleCard}>
                  <span className={styles.moduleTitle}>{module.title}</span>
                  <span className={styles.moduleDesc}>{module.desc}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
