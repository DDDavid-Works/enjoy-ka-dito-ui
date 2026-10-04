import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { hotelsApi, packagesApi, quotationsApi } from '../../../lib/api'
import {
  cleanAccommodations,
  cleanExclusions,
  cleanInclusions,
  cleanOptionalTours,
} from '../../../lib/quotationSections'
import type { Hotel } from '../../../types/hotel'
import type { Package } from '../../../types/package'
import type { Quotation, QuotationInput } from '../../../types/quotation'
import QuotationAccommodationsEditor from '../packages/QuotationAccommodationsEditor'
import QuotationExclusionsEditor from '../packages/QuotationExclusionsEditor'
import QuotationInclusionsEditor from '../packages/QuotationInclusionsEditor'
import QuotationOptionalToursEditor from '../packages/QuotationOptionalToursEditor'
import styles from '../packages/PackageForm.module.css'

const EMPTY: QuotationInput = {
  title: '',
  inclusions: [],
  accommodations: [],
  exclusions: [],
  optionalTours: [],
}

export default function QuotationForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState<QuotationInput>(EMPTY)
  const [savedTitle, setSavedTitle] = useState('')
  const [basedOn, setBasedOn] = useState<Quotation['package']>(null)
  const [packages, setPackages] = useState<Package[]>([])
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(isEditing)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    hotelsApi
      .list()
      .then((data) => !cancelled && setHotels(data))
      .catch(() => {})

    if (!isEditing) {
      packagesApi
        .list()
        .then((data) => !cancelled && setPackages(data))
        .catch(() => {})
    }

    return () => {
      cancelled = true
    }
  }, [isEditing])

  useEffect(() => {
    if (!id) return

    quotationsApi
      .get(id)
      .then((quotation) => {
        setSavedTitle(quotation.title)
        setBasedOn(quotation.package ?? null)
        setForm({
          title: quotation.title,
          inclusions: quotation.inclusions,
          accommodations: quotation.accommodations,
          exclusions: quotation.exclusions,
          optionalTours: quotation.optionalTours,
        })
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load quotation.'))
      .finally(() => setLoading(false))
  }, [id])

  function updateField<K extends keyof QuotationInput>(key: K, value: QuotationInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // Copy a package's quotation details into this quotation (replaces what's below).
  function startFromPackage(packageId: string) {
    const pkg = packages.find((p) => p.id === packageId)
    if (!pkg) {
      setForm((prev) => ({ ...prev, packageId: undefined }))
      return
    }

    setForm((prev) => ({
      ...prev,
      packageId: pkg.id,
      title: prev.title.trim() ? prev.title : `${pkg.title} Quotation`,
      inclusions: structuredClone(pkg.quotationInclusions ?? []),
      accommodations: structuredClone(pkg.quotationAccommodations ?? []),
      exclusions: [...(pkg.quotationExclusions ?? [])],
      optionalTours: structuredClone(pkg.quotationOptionalTours ?? []),
    }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!form.title.trim()) {
      setError('Title is required.')
      return
    }
    setSubmitting(true)

    const payload: QuotationInput = {
      ...form,
      title: form.title.trim(),
      inclusions: cleanInclusions(form.inclusions),
      accommodations: cleanAccommodations(form.accommodations),
      exclusions: cleanExclusions(form.exclusions),
      optionalTours: cleanOptionalTours(form.optionalTours),
    }

    try {
      if (isEditing && id) {
        await quotationsApi.update(id, payload)
        // Stay on the page: sync the cleaned values and confirm the save.
        setForm(payload)
        setSavedTitle(payload.title)
        setSuccess('Quotation saved successfully.')
      } else {
        await quotationsApi.create(payload)
        navigate('/admin/quotations')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save quotation.')
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
        <Link to="/admin/quotations" className={styles.backLink}>
          ← Back to quotations
        </Link>

        <h1 className={isEditing ? `${styles.title} ${styles.titleWithName}` : styles.title}>
          {isEditing ? 'Edit Quotation' : 'New Quotation'}
        </h1>
        {isEditing && <p className={styles.packageName}>{savedTitle}</p>}

        <form className={styles.form} onSubmit={handleSubmit} onChange={() => setSuccess(null)}>
          <div className={styles.field}>
            <label>Title</label>
            <input
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="e.g. El Nido Island Escape — Santos Family"
              required
            />
          </div>

          {!isEditing && (
            <div className={styles.field}>
              <label>Start from a package (optional)</label>
              <select value={form.packageId ?? ''} onChange={(e) => startFromPackage(e.target.value)}>
                <option value="">Blank quotation</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title}
                  </option>
                ))}
              </select>
              <p className={styles.hint}>
                Copies that package's quotation details below, replacing anything already entered. Changes here never
                affect the package.
              </p>
            </div>
          )}

          {isEditing && basedOn && (
            <p className={styles.hint}>
              Started from <Link to={`/admin/packages/${basedOn.id}/edit`}>{basedOn.title}</Link>
            </p>
          )}

          <QuotationInclusionsEditor value={form.inclusions} onChange={(next) => updateField('inclusions', next)} />
          <QuotationAccommodationsEditor
            value={form.accommodations}
            hotels={hotels}
            onChange={(next) => updateField('accommodations', next)}
          />
          <QuotationExclusionsEditor value={form.exclusions} onChange={(next) => updateField('exclusions', next)} />
          <QuotationOptionalToursEditor
            value={form.optionalTours}
            onChange={(next) => updateField('optionalTours', next)}
          />

          {error && <p className={styles.error}>{error}</p>}
          {success && (
            <p className={styles.success} role="status">
              {success}
            </p>
          )}

          <div className={styles.actions}>
            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Quotation'}
            </button>
            <button type="button" className={styles.cancel} onClick={() => navigate('/admin/quotations')}>
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
