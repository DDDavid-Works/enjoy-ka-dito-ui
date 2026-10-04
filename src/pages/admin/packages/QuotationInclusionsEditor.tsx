import type { QuotationDetail, QuotationInclusion, QuotationSubDetail } from '../../../types/package'
import styles from './PackageForm.module.css'

type Props = {
  value: QuotationInclusion[]
  onChange: (next: QuotationInclusion[]) => void
  // Drop the top divider when this is the first thing under the tab bar.
  flush?: boolean
}

function replaceAt<T>(list: T[], index: number, item: T) {
  return list.map((existing, i) => (i === index ? item : existing))
}

function removeAt<T>(list: T[], index: number) {
  return list.filter((_, i) => i !== index)
}

type PriceInputProps = {
  value?: number
  onChange: (price: number | undefined) => void
}

function PriceInput({ value, onChange }: PriceInputProps) {
  return (
    <input
      type="number"
      min={0}
      step="0.01"
      className={styles.priceInput}
      aria-label="Price (optional)"
      placeholder="Price"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
    />
  )
}

export default function QuotationInclusionsEditor({ value, onChange, flush }: Props) {
  function updateInclusion(index: number, patch: Partial<QuotationInclusion>) {
    onChange(replaceAt(value, index, { ...value[index], ...patch }))
  }

  function updateDetail(index: number, detailIndex: number, patch: Partial<QuotationDetail>) {
    const details = value[index].details
    updateInclusion(index, { details: replaceAt(details, detailIndex, { ...details[detailIndex], ...patch }) })
  }

  function updateSubDetail(index: number, detailIndex: number, subIndex: number, patch: Partial<QuotationSubDetail>) {
    const subDetails = value[index].details[detailIndex].details
    updateDetail(index, detailIndex, { details: replaceAt(subDetails, subIndex, { ...subDetails[subIndex], ...patch }) })
  }

  return (
    <div className={flush ? `${styles.section} ${styles.sectionFlush}` : styles.section}>
      <div className={styles.sectionTitle}>Package Inclusions</div>
      <p className={styles.hint}>
        Internal only — used for quotations, not shown on the website. Every level can have an optional price.
      </p>

      {value.map((item, index) => (
        <div key={index} className={`${styles.quoteItem} ${styles.quoteCard}`}>
          <div className={styles.listItem}>
            <input
              value={item.text}
              onChange={(e) => updateInclusion(index, { text: e.target.value })}
              placeholder="e.g. Roundtrip Airfare via Clark"
            />
            <PriceInput value={item.price} onChange={(price) => updateInclusion(index, { price })} />
            <button type="button" className={styles.removeButton} onClick={() => onChange(removeAt(value, index))}>
              Remove
            </button>
          </div>

          <div className={styles.quoteDetails}>
            {item.details.map((detail, detailIndex) => (
              <div key={detailIndex} className={styles.quoteItem}>
                <div className={styles.listItem}>
                  <input
                    value={detail.text}
                    onChange={(e) => updateDetail(index, detailIndex, { text: e.target.value })}
                    placeholder="Detail"
                  />
                  <PriceInput value={detail.price} onChange={(price) => updateDetail(index, detailIndex, { price })} />
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => updateInclusion(index, { details: removeAt(item.details, detailIndex) })}
                  >
                    Remove
                  </button>
                </div>

                <div className={styles.quoteDetails}>
                  {detail.details.map((subDetail, subIndex) => (
                    <div key={subIndex} className={styles.listItem}>
                      <input
                        value={subDetail.text}
                        onChange={(e) => updateSubDetail(index, detailIndex, subIndex, { text: e.target.value })}
                        placeholder="Sub-detail"
                      />
                      <PriceInput
                        value={subDetail.price}
                        onChange={(price) => updateSubDetail(index, detailIndex, subIndex, { price })}
                      />
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => updateDetail(index, detailIndex, { details: removeAt(detail.details, subIndex) })}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={() => updateDetail(index, detailIndex, { details: [...detail.details, { text: '' }] })}
                  >
                    + Add sub-detail
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={() => updateInclusion(index, { details: [...item.details, { text: '', details: [] }] })}
            >
              + Add detail
            </button>
          </div>
        </div>
      ))}

      <button type="button" className={styles.addButton} onClick={() => onChange([...value, { text: '', details: [] }])}>
        + Add inclusion
      </button>
    </div>
  )
}
