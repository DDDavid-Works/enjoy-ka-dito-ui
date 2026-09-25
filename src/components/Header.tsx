import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Tour Packages', to: '/tour-packages' },
  { label: 'Travel Services', to: '/travel-services' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact Us', to: '/contact-us' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <img src="/images/logo.png" alt="Enjoy Ka Dito" />
        <span className={styles.logoCompany}>by: MCP Greenery Travel and Tours</span>
      </NavLink>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
          >
            {link.label}
          </NavLink>
        ))}
        <NavLink to="/request-a-quote" className={styles.ctaMobile}>
          Request a Quote
        </NavLink>
      </nav>

      <NavLink to="/request-a-quote" className={styles.cta}>
        Request a Quote
      </NavLink>

      <button
        type="button"
        className={styles.menuToggle}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className={`${styles.menuIcon} ${menuOpen ? styles.menuIconOpen : ''}`} />
      </button>
    </header>
  )
}
