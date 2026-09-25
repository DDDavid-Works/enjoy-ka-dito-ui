import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hotelsApi } from '../../../lib/api'
import { formatStarRating, type Hotel } from '../../../types/hotel'
import styles from './HotelsList.module.css'

const PAGE_SIZE = 25

export default function HotelsList() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [jumpValue, setJumpValue] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      setHotels(await hotelsApi.list())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load hotels.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(hotel: Hotel) {
    if (!confirm(`Delete "${hotel.name}"? This can't be undone.`)) return

    try {
      await hotelsApi.remove(hotel.id)
      setHotels((prev) => prev.filter((h) => h.id !== hotel.id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete hotel.')
    }
  }

  const totalPages = Math.max(1, Math.ceil(hotels.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageHotels = hotels.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function goToPage(value: number) {
    setPage(Math.min(totalPages, Math.max(1, value)))
  }

  function handleJumpSubmit(event: FormEvent) {
    event.preventDefault()
    const value = Number(jumpValue)
    if (Number.isFinite(value) && value >= 1) goToPage(value)
    setJumpValue('')
  }

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
          <h1 className={styles.title}>Hotels & Resorts</h1>
          <button type="button" className={styles.newButton} onClick={() => navigate('/admin/hotels/new')}>
            + New Hotel
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {!loading && hotels.length === 0 && !error && (
          <p className={styles.empty}>No hotels yet. Add your first partner property.</p>
        )}

        {hotels.length > 0 && (
          <table className={styles.table}>
            <colgroup>
              <col style={{ width: '26%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '17%' }} />
              <col style={{ width: '17%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Hotel Name</th>
                <th>Region/Province</th>
                <th>Star Rating</th>
                <th>Contact Person</th>
                <th>Contact Numbers</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageHotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>{hotel.name}</td>
                  <td>{hotel.region}</td>
                  <td>
                    <span className={styles.badge}>{formatStarRating(hotel.starRating)}</span>
                  </td>
                  <td>{hotel.contactPerson || '—'}</td>
                  <td>{hotel.contactNumbers || '—'}</td>
                  <td>
                    <div className={styles.actions}>
                      <button type="button" onClick={() => navigate(`/admin/hotels/${hotel.id}/edit`)}>
                        Edit
                      </button>
                      <button type="button" className={styles.delete} onClick={() => handleDelete(hotel)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button type="button" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
              ← Prev
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages} · {hotels.length} hotels
            </span>
            <button type="button" disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
              Next →
            </button>
            <form className={styles.jumpForm} onSubmit={handleJumpSubmit}>
              <label htmlFor="jump-to-page">Go to</label>
              <input
                id="jump-to-page"
                type="number"
                min={1}
                max={totalPages}
                placeholder={String(currentPage)}
                value={jumpValue}
                onChange={(e) => setJumpValue(e.target.value)}
              />
              <button type="submit">Go</button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
