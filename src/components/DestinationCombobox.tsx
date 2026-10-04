import { useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { packagesApi } from '../lib/api'
import styles from './DestinationCombobox.module.css'

type Props = {
  name: string
  placeholder?: string
  defaultValue?: string
}

// Text input that suggests current tour titles but accepts any free value.
export default function DestinationCombobox({ name, placeholder, defaultValue = '' }: Props) {
  const [value, setValue] = useState(defaultValue)
  const [options, setOptions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    let cancelled = false

    packagesApi
      .list()
      .then((packages) => {
        if (cancelled) return
        const titles = [...new Set(packages.map((p) => p.title.trim()).filter(Boolean))]
        setOptions(titles.sort((a, b) => a.localeCompare(b)))
      })
      .catch(() => {
        // Suggestions are optional; the field still works as a plain text input.
      })

    return () => {
      cancelled = true
    }
  }, [])

  const matches = useMemo(() => {
    const query = value.trim().toLowerCase()
    return query ? options.filter((o) => o.toLowerCase().includes(query)) : options
  }, [options, value])

  const showList = open && matches.length > 0

  function choose(option: string) {
    setValue(option)
    setOpen(false)
    setActiveIndex(-1)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex((i) => Math.min(i + 1, matches.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter' && showList && activeIndex >= 0) {
      event.preventDefault()
      choose(matches[activeIndex])
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className={styles.combobox}>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={showList}
        aria-autocomplete="list"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={(e) => {
          setValue(e.target.value)
          setActiveIndex(-1)
          setOpen(true)
        }}
        onKeyDown={handleKeyDown}
      />

      {showList && (
        <ul className={styles.list} role="listbox">
          {matches.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? `${styles.option} ${styles.optionActive}` : styles.option}
              // mousedown (not click) so it fires before the input's blur closes the list
              onMouseDown={(e) => {
                e.preventDefault()
                choose(option)
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
