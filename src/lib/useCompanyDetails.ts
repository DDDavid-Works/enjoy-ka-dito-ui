import { useEffect, useState } from 'react'
import type { CompanyDetails } from '../types/company'
import { companyApi } from './api'

// Shown until the real details load, or if the API can't be reached.
const FALLBACK: CompanyDetails = {
  email: 'hello@enjoykadito.com',
  address: '',
  contactNumbers: ['+63 900 000 0000'],
}

// One request shared by every component on the page (footer, Contact Us, ...).
let cached: Promise<CompanyDetails> | null = null

// Call after saving in the admin so the public pages pick up the change.
export function invalidateCompanyDetails() {
  cached = null
}

export function useCompanyDetails(): CompanyDetails {
  const [details, setDetails] = useState<CompanyDetails>(FALLBACK)

  useEffect(() => {
    let cancelled = false

    cached ??= companyApi.get().catch((err) => {
      cached = null
      throw err
    })

    cached
      .then((data) => {
        if (!cancelled) setDetails(data)
      })
      .catch(() => {
        // Keep the fallback; the site still shows sensible contact info.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return details
}

// "+63 917 123 4567" -> "+639171234567" for tel: links.
export function toTelHref(number: string) {
  return `tel:${number.replace(/[^\d+]/g, '')}`
}
