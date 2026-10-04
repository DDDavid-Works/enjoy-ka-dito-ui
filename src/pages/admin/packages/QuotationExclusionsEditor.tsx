import styles from './PackageForm.module.css'

type Props = {
  value: string[]
  onChange: (next: string[]) => void
}

export default function QuotationExclusionsEditor({ value, onChange }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>Package Exclusions</div>
      <p className={styles.hint}>Internal only — used for quotations, not shown on the website.</p>

      {value.map((item, index) => (
        <div key={index} className={styles.listItem}>
          <input
            value={item}
            onChange={(e) => onChange(value.map((existing, i) => (i === index ? e.target.value : existing)))}
            placeholder="e.g. Exclusive of VAT"
          />
          <button type="button" className={styles.removeButton} onClick={() => onChange(value.filter((_, i) => i !== index))}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" className={styles.addButton} onClick={() => onChange([...value, ''])}>
        + Add exclusion
      </button>
    </div>
  )
}
