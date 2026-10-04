import type { QuotationAccommodation, QuotationInclusion, QuotationOptionalTour } from './package'

export type Quotation = {
  id: string
  title: string
  package?: { id: string; title: string } | null
  inclusions: QuotationInclusion[]
  accommodations: QuotationAccommodation[]
  exclusions: string[]
  optionalTours: QuotationOptionalTour[]
  createdAt: string
  updatedAt: string
}

export type QuotationInput = Omit<Quotation, 'id' | 'package' | 'createdAt' | 'updatedAt'> & {
  // Only used on create: the package this quotation was started from.
  packageId?: string
}
