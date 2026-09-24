import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>Enjoy Ka Dito</span>
      <p className={styles.tagline}>
        Your Philippine-based travel partner for more meaningful local and international adventures.
      </p>
      <p className={styles.contact}>hello@enjoykadito.com · +63 900 000 0000</p>
    </footer>
  )
}
