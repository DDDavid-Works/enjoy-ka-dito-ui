import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usersApi } from '../../../lib/api'
import { useAuth } from '../../../context/auth'
import type { User } from '../../../types/user'
import styles from '../hotels/HotelsList.module.css'

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { admin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    usersApi
      .list()
      .then((data) => {
        if (!cancelled) setUsers(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load users.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function handleDelete(user: User) {
    if (!confirm(`Delete "${user.name}"? This can't be undone.`)) return

    try {
      await usersApi.remove(user.id)
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete user.')
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <img src="/images/logo.png" alt="Enjoy Ka Dito" className={styles.logo} />
      </header>

      <main className={styles.content}>
        <Link to="/admin" className={styles.backLink}>
          ← Back to Dashboard
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>Users</h1>
          <button type="button" className={styles.newButton} onClick={() => navigate('/admin/users/new')}>
            + New User
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {!loading && users.length === 0 && !error && <p className={styles.empty}>No users yet.</p>}

        {users.length > 0 && (
          <table className={styles.table}>
            <colgroup>
              <col style={{ width: '28%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.name}
                    {user.id === admin?.id && <span className={styles.badge}>You</span>}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.contactNumber || '—'}</td>
                  <td>
                    <div className={styles.actions}>
                      <button type="button" onClick={() => navigate(`/admin/users/${user.id}/edit`)}>
                        Edit
                      </button>
                      {user.id !== admin?.id && (
                        <button type="button" className={styles.delete} onClick={() => handleDelete(user)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  )
}
