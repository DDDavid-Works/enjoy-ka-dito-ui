import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTourBySlug } from '../data/tours'
import styles from './PackageDetail.module.css'

export default function PackageDetail() {
  const { slug } = useParams<{ slug: string }>()
  const tour = slug ? getTourBySlug(slug) : undefined
  const [activePhoto, setActivePhoto] = useState(0)

  if (!tour) {
    return <Navigate to="/tour-packages" replace />
  }

  return (
    <main>
      <section className={styles.hero} style={{ backgroundImage: `url(${tour.image})` }}>
        <div className={styles.heroContent}>
          <Link to="/tour-packages" className={styles.backLink}>
            ← Back to Tour Packages
          </Link>
          <p className={styles.meta}>
            {tour.location} · {tour.duration}
          </p>
          <h1 className={styles.title}>{tour.title}</h1>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.main}>
          <p className={styles.summary}>{tour.summary}</p>

          <h2 className={styles.sectionTitle}>Sample itinerary</h2>
          <ol className={styles.itinerary}>
            {tour.itinerary.map((day) => (
              <li key={day.label} className={styles.itineraryItem}>
                <span className={styles.itineraryLabel}>{day.label}</span>
                <span className={styles.itineraryDescription}>{day.description}</span>
              </li>
            ))}
          </ol>

          <h2 className={styles.sectionTitle}>Gallery</h2>
          <div className={styles.gallery}>
            <div className={styles.galleryMain} style={{ backgroundImage: `url(${tour.gallery[activePhoto]})` }} />
            <div className={styles.galleryThumbs}>
              {tour.gallery.map((src, index) => (
                <button
                  key={src + index}
                  type="button"
                  className={index === activePhoto ? `${styles.thumb} ${styles.thumbActive}` : styles.thumb}
                  style={{ backgroundImage: `url(${src})` }}
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Show photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <p className={styles.price}>{tour.price ?? 'Custom pricing'}</p>
            <p className={styles.priceNote}>Per person, based on double occupancy.</p>
            <Link to={`/request-a-quote?destination=${encodeURIComponent(tour.title)}`} className={styles.cta}>
              Request a Quote
            </Link>

            <div className={styles.divider} />

            <h3 className={styles.listTitle}>Inclusions</h3>
            <ul className={styles.list}>
              {tour.inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className={styles.listTitle}>Exclusions</h3>
            <ul className={styles.list}>
              {tour.exclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  )
}
