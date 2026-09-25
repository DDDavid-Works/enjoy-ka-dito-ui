import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { inquiriesApi } from '../../../lib/api'
import type { Inquiry, InquiryStatus } from '../../../types/inquiry'
import styles from './InquiriesList.module.css'

const STATUS_FILTERS: Array<InquiryStatus | 'all'> = ['all', 'new', 'contacted', 'closed']

export default function InquiriesList() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all')

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      setInquiries(await inquiriesApi.list())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inquiries.')
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(inquiry: Inquiry, status: InquiryStatus) {
    const previous = inquiries
    setInquiries((prev) => prev.map((i) => (i.id === inquiry.id ? { ...i, status } : i)))

    try {
      await inquiriesApi.updateStatus(inquiry.id, status)
    } catch (err) {
      setInquiries(previous)
      alert(err instanceof Error ? err.message : 'Failed to update status.')
    }
  }

  const filteredInquiries = useMemo(
    () => (filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter)),
    [inquiries, filter],
  )

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <img src="/images/logo.png" alt="Enjoy Ka Dito" className={styles.logo} />
      </header>

      <main className={styles.content}>
        <Link to="/admin" className={styles.backLink}>
          ← Back to dashboard
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>Inquiries</h1>
        </div>

        <div className={styles.filters}>
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              type="button"
              className={status === filter ? `${styles.filterPill} ${styles.filterPillActive}` : styles.filterPill}
              onClick={() => setFilter(status)}
            >
              {status === 'all' ? 'All' : status[0].toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {!loading && filteredInquiries.length === 0 && !error && (
          <p className={styles.empty}>No inquiries here yet.</p>
        )}

        <div className={styles.list}>
          {filteredInquiries.map((inquiry) => (
            <div key={inquiry.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div>
                  <p className={styles.name}>
                    {inquiry.name}
                    {inquiry.companyName ? <span className={styles.company}> · {inquiry.companyName}</span> : null}
                  </p>
                  <p className={styles.meta}>
                    {new Date(inquiry.createdAt).toLocaleString()}
                    {inquiry.travelerType ? ` · ${inquiry.travelerType}` : ''}
                    {inquiry.package ? ` · ${inquiry.package.title}` : ''}
                  </p>
                </div>

                <select
                  className={`${styles.statusSelect} ${styles[`status_${inquiry.status}`]}`}
                  value={inquiry.status}
                  onChange={(event) => handleStatusChange(inquiry, event.target.value as InquiryStatus)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className={styles.detailsGrid}>
                <a className={styles.detail} href={`mailto:${inquiry.email}`}>
                  {inquiry.email}
                </a>
                {inquiry.phone && (
                  <a className={styles.detail} href={`tel:${inquiry.phone}`}>
                    {inquiry.phone}
                  </a>
                )}
                {inquiry.destination && <span className={styles.detail}>Destination: {inquiry.destination}</span>}
                {inquiry.travelerCount && <span className={styles.detail}>Pax: {inquiry.travelerCount}</span>}
                {inquiry.travelDates && <span className={styles.detail}>Dates: {inquiry.travelDates}</span>}
              </div>

              {inquiry.message && <p className={styles.message}>{inquiry.message}</p>}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
