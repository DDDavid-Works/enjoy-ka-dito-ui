import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Login.module.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Incorrect email or password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Link to="/" className={styles.logo}>
          <img src="/images/logo.png" alt="Enjoy Ka Dito" />
        </Link>

        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.subtext}>Sign in to manage tour packages and site content.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submit} disabled={submitting}>
            {submitting ? 'Signing in…' : 'Log In'}
          </button>
        </form>

        {error && <p className={styles.notice}>{error}</p>}

        <Link to="/" className={styles.backLink}>
          ← Back to site
        </Link>
      </div>
    </main>
  )
}
