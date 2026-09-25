import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { inquiriesApi } from '../lib/api'
import styles from './ContactUs.module.css'

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setSubmitting(true)
    setError(null)

    try {
      await inquiriesApi.create({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        message: String(data.get('message') ?? ''),
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <section className={styles.hero}>
        <p className={styles.badge}>GET IN TOUCH</p>
        <h1 className={styles.title}>Questions? We&rsquo;re here to help.</h1>
        <p className={styles.subtext}>
          Reach out for anything that isn&rsquo;t a booking &mdash; general questions, partnership inquiries, or
          feedback. Already planning a trip?{' '}
          <Link to="/request-a-quote" className={styles.inlineLink}>
            Request a Quote
          </Link>{' '}
          instead.
        </p>
      </section>

      <section className={styles.formSection}>
        <div className={styles.infoCard}>
          <h2 className={styles.infoTitle}>Contact details</h2>
          <p className={styles.infoLine}>hello@enjoykadito.com</p>
          <p className={styles.infoLine}>+63 900 000 0000</p>
          <p className={styles.infoNote}>We typically reply within 1&ndash;2 business days.</p>
        </div>

        <div className={styles.formCard}>
          {submitted ? (
            <p className={styles.success}>Thanks! We&rsquo;ve received your message and will get back to you soon.</p>
          ) : (
            <>
              <p className={styles.formIntro}>Send us a message and we&rsquo;ll get back to you.</p>
              {error && <p className={styles.error}>{error}</p>}
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <input type="text" name="name" placeholder="Full name" required />
                </div>
                <div className={styles.field}>
                  <input type="email" name="email" placeholder="Email address" required />
                </div>
                <div className={styles.field}>
                  <textarea name="message" placeholder="How can we help?" rows={5} required />
                </div>
                <button type="submit" className={styles.submit} disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
