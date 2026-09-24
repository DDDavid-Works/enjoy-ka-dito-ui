import { useState, type FormEvent } from 'react'
import styles from './ContactUs.module.css'

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main>
      <section className={styles.hero}>
        <p className={styles.badge}>START PLANNING</p>
        <h1 className={styles.title}>Let&rsquo;s plan your next adventure.</h1>
        <p className={styles.subtext}>Tell us where you want to go. Our team can help you find a suitable package.</p>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formCard}>
          {submitted ? (
            <p className={styles.success}>Thanks! We&rsquo;ve received your inquiry and will get back to you within 1&ndash;2 business days.</p>
          ) : (
            <>
              <p className={styles.formIntro}>Share a few details and we&rsquo;ll get back to you within 1&ndash;2 business days.</p>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <input type="text" placeholder="Full name" required />
                </div>
                <div className={styles.field}>
                  <input type="email" placeholder="Email address" required />
                </div>
                <div className={styles.field}>
                  <input type="text" placeholder="Preferred destination" />
                </div>
                <div className={styles.field}>
                  <textarea placeholder="Message or special requests" rows={5} />
                </div>
                <button type="submit" className={styles.submit}>
                  Submit Inquiry
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
