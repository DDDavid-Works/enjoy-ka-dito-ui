import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { packagesApi } from '../lib/api'
import type { Package } from '../types/package'
import styles from './PackageDetail.module.css'

export default function PackageDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [pkg, setPkg] = useState<Package | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activePhoto, setActivePhoto] = useState(0)

  useEffect(() => {
    if (!slug) return

    setLoading(true)
    packagesApi
      .get(slug)
      .then(setPkg)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (notFound) {
    return <Navigate to="/tour-packages" replace />
  }

  if (loading || !pkg) {
    return null
  }

  return (
    <main>
      <section className={styles.hero} style={{ backgroundImage: `url(${pkg.mainImage})` }}>
        <div className={styles.heroContent}>
          <Link to="/tour-packages" className={styles.backLink}>
            ← Back to Tour Packages
          </Link>
          <p className={styles.meta}>
            {pkg.location} · {pkg.duration}
          </p>
          <h1 className={styles.title}>{pkg.title}</h1>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.main}>
          <p className={styles.summary}>{pkg.summary}</p>

          <h2 className={styles.sectionTitle}>Sample itinerary</h2>
          <ol className={styles.itinerary}>
            {pkg.itinerary.map((day) => (
              <li key={day.label} className={styles.itineraryItem}>
                <span className={styles.itineraryLabel}>{day.label}</span>
                <span className={styles.itineraryDescription}>{day.description}</span>
              </li>
            ))}
          </ol>

          <h2 className={styles.sectionTitle}>Gallery</h2>
          <div className={styles.gallery}>
            <div className={styles.galleryMain} style={{ backgroundImage: `url(${pkg.gallery[activePhoto]})` }} />
            <div className={styles.galleryThumbs}>
              {pkg.gallery.map((src, index) => (
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
            <p className={styles.price}>{pkg.price ?? 'Custom pricing'}</p>
            <p className={styles.priceNote}>Per person, based on double occupancy.</p>
            <Link to={`/request-a-quote?destination=${encodeURIComponent(pkg.title)}`} className={styles.cta}>
              Request a Quote
            </Link>

            <div className={styles.divider} />

            <h3 className={styles.listTitle}>Inclusions</h3>
            <ul className={styles.list}>
              {pkg.inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className={styles.listTitle}>Exclusions</h3>
            <ul className={styles.list}>
              {pkg.exclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  )
}
