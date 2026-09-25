import { Link, NavLink } from 'react-router-dom'
import styles from './Home.module.css'

const TRUST_BADGES = [
  { icon: '🛡️', label: 'DOT Accredited' },
  { icon: '✈️', label: 'PAL Accredited Partner' },
  { icon: '🕐', label: '24/7 Support' },
]

const GATEWAYS = [
  {
    title: 'Corporate Team Building',
    copy: 'Complete logistics, official invoicing, custom domestic & Asian itineraries, and on-site coordinators for teams of all sizes.',
    button: 'Explore Corporate Packages',
    image: '/images/corporate-team-building.jpg',
    to: '/corporate-team-building',
  },
  {
    title: 'Family & Senior Tours',
    copy: 'Relaxed pacing, private transport, senior-friendly steps, and hassle-free, door-to-door managed itineraries.',
    button: 'View Family Tour Packages',
    image: '/images/family-senior-tours.jpg',
    to: '/family-senior-tours',
  },
  {
    title: 'Inbound Foreigner Packages',
    copy: 'Experience the best of the Philippines with English-speaking guides, vetted hotels, and fully handled inter-island flights & transfers.',
    button: 'Discover the Philippines',
    image: '/images/local-tours.jpg',
    to: '/philippines-inbound',
  },
]

export default function Home() {
  return (
    <main>
      <section
        className={styles.hero}
        style={{ backgroundImage: 'url(/images/hero-islands.jpg)' }}
      >
        <div className={styles.heroContent}>
          <p className={styles.badge}>CURATED JOURNEYS · PHILIPPINES &amp; BEYOND</p>
          <h1 className={styles.heroTitle}>Helping You Make More Memories Through Travel</h1>
          <p className={styles.heroSubtext}>
            From island weekends to international escapes, Enjoy Ka Dito makes every part of your trip feel
            effortless.
          </p>
          <div className={styles.heroActions}>
            <NavLink to="/tour-packages" className={styles.heroLinkAction}>
              Explore Tour Packages
            </NavLink>
            <NavLink to="/request-a-quote" className={styles.heroOutlineAction}>
              Request a Quote
            </NavLink>
          </div>
        </div>
      </section>

      <section className={styles.trustStrip}>
        {TRUST_BADGES.map((badge) => (
          <div key={badge.label} className={styles.trustBadge}>
            <span className={styles.trustIcon}>{badge.icon}</span>
            <span>{badge.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.findYourWay}>
        <p className={styles.sectionBadge}>FIND YOUR WAY</p>
        <h2 className={styles.sectionTitle}>Choose your travel experience.</h2>

        <div className={styles.cardGrid}>
          {GATEWAYS.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className={styles.card}
              style={
                item.image
                  ? { backgroundImage: `url(${item.image})` }
                  : { backgroundImage: 'linear-gradient(135deg, #1e3a72 0%, #2c56a0 100%)' }
              }
            >
              <p className={styles.cardTitle}>{item.title}</p>
              <p className={styles.cardCopy}>{item.copy}</p>
              <span className={styles.cardButton}>{item.button}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
