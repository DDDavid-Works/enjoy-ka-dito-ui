import { NavLink } from 'react-router-dom'
import styles from './Home.module.css'

const TRAVEL_STYLES = [
  {
    title: 'Local Tours',
    image: '/images/local-tours.jpg',
  },
  {
    title: 'International Tours',
    image: '/images/international-tours.jpg',
  },
  {
    title: 'Team Building & Corporate Trips',
    image: null,
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

      <section className={styles.findYourWay}>
        <p className={styles.sectionBadge}>FIND YOUR WAY</p>
        <h2 className={styles.sectionTitle}>Travel that feels like you.</h2>

        <div className={styles.cardGrid}>
          {TRAVEL_STYLES.map((item) => (
            <div
              key={item.title}
              className={styles.card}
              style={
                item.image
                  ? { backgroundImage: `url(${item.image})` }
                  : { backgroundImage: 'linear-gradient(135deg, #1e3a72 0%, #2c56a0 100%)' }
              }
            >
              <p className={styles.cardTitle}>{item.title}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
