import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoCard}>
        <img src="/images/logo.png" alt="Enjoy Ka Dito" className={styles.logo} />
      </div>
      <p className={styles.company}>by: MCP Greenery Travel and Tours</p>
      <p className={styles.tagline}>
        Your Philippine-based travel partner for more meaningful local and international adventures.
      </p>
      <p className={styles.contact}>hello@enjoykadito.com · +63 900 000 0000</p>
      {/* Temporary direct link until the CMS has a proper access point */}
      <Link to="/admin/login" className={styles.adminLink}>
        Admin
      </Link>
    </footer>
  )
}
