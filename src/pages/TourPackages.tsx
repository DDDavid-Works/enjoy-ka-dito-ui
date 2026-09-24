import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FILTERS, TOURS, type Category } from '../data/tours'
import styles from './TourPackages.module.css'

export default function TourPackages() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Category | 'All'>('All')

  const filteredTours = useMemo(() => {
    return TOURS.filter((tour) => {
      const matchesFilter = filter === 'All' || tour.category === filter
      const matchesQuery =
        query.trim() === '' ||
        tour.title.toLowerCase().includes(query.toLowerCase()) ||
        tour.location.toLowerCase().includes(query.toLowerCase())
      return matchesFilter && matchesQuery
    })
  }, [query, filter])

  return (
    <main>
      <section className={styles.intro}>
        <p className={styles.badge}>TRAVEL, YOUR WAY</p>
        <h1 className={styles.title}>Find your next favourite place.</h1>
        <p className={styles.subtext}>
          Browse our sample escapes. Every trip can be refined around your dates, group, and travel style.
        </p>

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search destination or package"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className={styles.filters}>
            {FILTERS.map((label) => (
              <button
                key={label}
                type="button"
                className={label === filter ? `${styles.filterPill} ${styles.filterPillActive}` : styles.filterPill}
                onClick={() => setFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        {filteredTours.map((tour) => (
          <Link key={tour.slug} to={`/tour-packages/${tour.slug}`} className={styles.card}>
            <div className={styles.cardImage} style={{ backgroundImage: `url(${tour.image})` }} />
            <div className={styles.cardBody}>
              <p className={styles.cardTitle}>{tour.title}</p>
              <p className={styles.cardMeta}>
                {tour.location} · {tour.duration}
              </p>
              <p className={styles.cardPrice}>{tour.price ?? 'Request a Quote'}</p>
            </div>
          </Link>
        ))}

        {filteredTours.length === 0 && <p className={styles.empty}>No tours match your search yet.</p>}
      </section>
    </main>
  )
}
