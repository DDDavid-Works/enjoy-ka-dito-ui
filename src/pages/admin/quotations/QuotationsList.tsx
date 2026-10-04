import { Link } from 'react-router-dom'
import styles from './QuotationsList.module.css'

export default function QuotationsList() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <img src="/images/logo.png" alt="Enjoy Ka Dito" className={styles.logo} />
      </header>

      <main className={styles.content}>
        <Link to="/admin" className={styles.backLink}>
          ← Back to dashboard
        </Link>

        <h1 className={styles.title}>Quotations</h1>
      </main>
    </div>
  )
}
