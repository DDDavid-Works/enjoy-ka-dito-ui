import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { packagesApi } from '../../../lib/api'
import { PACKAGE_CATEGORIES, type ItineraryDay, type PackageInput } from '../../../types/package'
import styles from './PackageForm.module.css'

const EMPTY: PackageInput = {
  title: '',
  location: '',
  duration: '',
  category: 'Local Tours',
  price: '',
  pax: '',
  summary: '',
  itinerary: [],
  inclusions: [],
  exclusions: [],
  termsAndConditions: '',
  mainImage: '',
  poster: '',
  gallery: [],
  status: 'draft',
}

export default function PackageForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState<PackageInput>(EMPTY)
  const [loading, setLoading] = useState(isEditing)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isEditing) return

    packagesApi
      .list()
      .then((all) => {
        const pkg = all.find((p) => p.id === id)
        if (!pkg) throw new Error('Package not found.')
        const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = pkg
        setForm({
          ...rest,
          location: rest.location ?? '',
          duration: rest.duration ?? '',
          price: rest.price ?? '',
          pax: rest.pax ?? '',
          summary: rest.summary ?? '',
          termsAndConditions: rest.termsAndConditions ?? '',
          mainImage: rest.mainImage ?? '',
          poster: rest.poster ?? '',
        })
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load package.'))
      .finally(() => setLoading(false))
  }, [id, isEditing])

  function updateField<K extends keyof PackageInput>(key: K, value: PackageInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function updateListItem(key: 'inclusions' | 'exclusions', index: number, value: string) {
    const next = [...form[key]]
    next[index] = value
    updateField(key, next)
  }

  function addListItem(key: 'inclusions' | 'exclusions') {
    updateField(key, [...form[key], ''])
  }

  function removeListItem(key: 'inclusions' | 'exclusions', index: number) {
    updateField(
      key,
      form[key].filter((_, i) => i !== index),
    )
  }

  function updateItinerary(index: number, field: keyof ItineraryDay, value: string) {
    const next = form.itinerary.map((day, i) => (i === index ? { ...day, [field]: value } : day))
    updateField('itinerary', next)
  }

  function addItineraryDay() {
    updateField('itinerary', [...form.itinerary, { label: '', description: '' }])
  }

  function removeItineraryDay(index: number) {
    updateField(
      'itinerary',
      form.itinerary.filter((_, i) => i !== index),
    )
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const payload: PackageInput = {
      ...form,
      inclusions: form.inclusions.map((s) => s.trim()).filter(Boolean),
      exclusions: form.exclusions.map((s) => s.trim()).filter(Boolean),
      itinerary: form.itinerary.filter((day) => day.label.trim() || day.description.trim()),
    }

    try {
      if (isEditing && id) {
        await packagesApi.update(id, payload)
      } else {
        await packagesApi.create(payload)
      }
      navigate('/admin/packages')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save package.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return null

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <img src="/images/logo.png" alt="Enjoy Ka Dito" className={styles.logo} />
      </header>

      <main className={styles.content}>
        <Link to="/admin/packages" className={styles.backLink}>
          ← Back to packages
        </Link>

        <h1 className={styles.title}>{isEditing ? 'Edit Package' : 'New Package'}</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Title</label>
            <input value={form.title} onChange={(e) => updateField('title', e.target.value)} required />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Location</label>
              <input value={form.location} onChange={(e) => updateField('location', e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Duration</label>
              <input
                value={form.duration}
                onChange={(e) => updateField('duration', e.target.value)}
                placeholder="e.g. 4 days"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Category</label>
              <select value={form.category} onChange={(e) => updateField('category', e.target.value as PackageInput['category'])}>
                {PACKAGE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <select value={form.status} onChange={(e) => updateField('status', e.target.value as PackageInput['status'])}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Price</label>
              <input
                value={form.price}
                onChange={(e) => updateField('price', e.target.value)}
                placeholder="e.g. From ₱12,500 (leave blank for 'Request a Quote')"
              />
            </div>
            <div className={styles.field}>
              <label>No. of Pax</label>
              <input
                value={form.pax}
                onChange={(e) => updateField('pax', e.target.value)}
                placeholder="e.g. 2–4 pax or Min 15 pax for groups"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Summary</label>
            <textarea value={form.summary} onChange={(e) => updateField('summary', e.target.value)} />
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Itinerary</div>
            {form.itinerary.map((day, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.itineraryItem}>
                  <input
                    value={day.label}
                    onChange={(e) => updateItinerary(index, 'label', e.target.value)}
                    placeholder="Day 1"
                  />
                  <textarea
                    value={day.description}
                    onChange={(e) => updateItinerary(index, 'description', e.target.value)}
                    placeholder="What happens this day"
                  />
                </div>
                <button type="button" className={styles.removeButton} onClick={() => removeItineraryDay(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={addItineraryDay}>
              + Add day
            </button>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Inclusions</div>
            {form.inclusions.map((item, index) => (
              <div key={index} className={styles.listItem}>
                <input value={item} onChange={(e) => updateListItem('inclusions', index, e.target.value)} />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeListItem('inclusions', index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={() => addListItem('inclusions')}>
              + Add inclusion
            </button>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Exclusions</div>
            {form.exclusions.map((item, index) => (
              <div key={index} className={styles.listItem}>
                <input value={item} onChange={(e) => updateListItem('exclusions', index, e.target.value)} />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeListItem('exclusions', index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={() => addListItem('exclusions')}>
              + Add exclusion
            </button>
          </div>

          <div className={styles.field}>
            <label>Terms &amp; Conditions / Notes</label>
            <textarea
              value={form.termsAndConditions}
              onChange={(e) => updateField('termsAndConditions', e.target.value)}
            />
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Images</div>
            <p className={styles.hint}>
              Paste hosted image URLs for now — direct file upload isn't wired up yet.
            </p>
            <div className={styles.field}>
              <label>Main image (destination photo)</label>
              <input value={form.mainImage} onChange={(e) => updateField('mainImage', e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Poster (promo graphic)</label>
              <input value={form.poster} onChange={(e) => updateField('poster', e.target.value)} />
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Package'}
            </button>
            <button type="button" className={styles.cancel} onClick={() => navigate('/admin/packages')}>
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
