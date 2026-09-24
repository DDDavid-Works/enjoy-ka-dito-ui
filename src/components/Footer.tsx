import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src="/images/logo.png" alt="Enjoy Ka Dito" className={styles.logo} />
      <p className={styles.tagline}>
        Your Philippine-based travel partner for more meaningful local and international adventures.
      </p>
      <p className={styles.contact}>hello@enjoykadito.com · +63 900 000 0000</p>
    </footer>
  )
}
