import type { QuotationDetail, QuotationInclusion } from '../../../types/package'
import styles from './PackageForm.module.css'

type Props = {
  value: QuotationInclusion[]
  onChange: (next: QuotationInclusion[]) => void
}

function replaceAt<T>(list: T[], index: number, item: T) {
  return list.map((existing, i) => (i === index ? item : existing))
}

function removeAt<T>(list: T[], index: number) {
  return list.filter((_, i) => i !== index)
}

export default function QuotationInclusionsEditor({ value, onChange }: Props) {
  function updateInclusion(index: number, patch: Partial<QuotationInclusion>) {
    onChange(replaceAt(value, index, { ...value[index], ...patch }))
  }

  function updateDetail(index: number, detailIndex: number, patch: Partial<QuotationDetail>) {
    const details = value[index].details
    updateInclusion(index, { details: replaceAt(details, detailIndex, { ...details[detailIndex], ...patch }) })
  }

  return (
    <div className={`${styles.section} ${styles.sectionFlush}`}>
      <div className={styles.sectionTitle}>Package Inclusions</div>
      <p className={styles.hint}>Internal only — used for quotations, not shown on the website.</p>

      {value.map((item, index) => (
        <div key={index} className={styles.quoteItem}>
          <div className={styles.listItem}>
            <input
              value={item.text}
              onChange={(e) => updateInclusion(index, { text: e.target.value })}
              placeholder="e.g. Roundtrip Airfare via Clark"
            />
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
                        value={subDetail}
                        onChange={(e) =>
                          updateDetail(index, detailIndex, { details: replaceAt(detail.details, subIndex, e.target.value) })
                        }
                        placeholder="Sub-detail"
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
                    onClick={() => updateDetail(index, detailIndex, { details: [...detail.details, ''] })}
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
