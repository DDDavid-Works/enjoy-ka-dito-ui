import { Link } from 'react-router-dom'
import { FacebookIcon, InstagramIcon, TiktokIcon } from './SocialIcons'
import styles from './Footer.module.css'

const SOCIAL_LINKS = [
  { Icon: FacebookIcon, label: 'Follow us on Facebook', handle: 'EnjoyKaDito', href: 'https://www.facebook.com/EnjoyKaDito' },
  { Icon: InstagramIcon, label: 'Follow us on Instagram', handle: 'enjoykadito', href: 'https://www.instagram.com/enjoykadito/' },
  {
    Icon: TiktokIcon,
    label: 'Follow us on TikTok',
    handle: 'enjoykaditotravels',
    href: 'https://www.tiktok.com/@enjoykaditotravels',
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerInfo}>
          <div className={styles.logoCard}>
            <img src="/images/logo.png" alt="Enjoy Ka Dito" className={styles.logo} />
          </div>
          <p className={styles.company}>by: MCP Greenery Travel and Tours</p>
          <p className={styles.tagline}>
            Your Philippine-based travel partner for more meaningful local and international adventures.
          </p>
          <p className={styles.contact}>hello@enjoykadito.com · +63 900 000 0000</p>
        </div>

        <div className={styles.social}>
          <p className={styles.socialLabel}>FOLLOW ALONG</p>
          <div className={styles.socialRow}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className={styles.socialLink}
              >
                <social.Icon className={styles.socialIcon} />
                <span className={styles.socialHandle}>@{social.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} Enjoy Ka Dito by: MCP Greenery Travel and Tours. All Rights Reserved.
      </p>
      {/* Temporary direct link until the CMS has a proper access point */}
      <Link to="/admin/login" className={styles.adminLink}>
        Admin
      </Link>
    </footer>
  )
}
