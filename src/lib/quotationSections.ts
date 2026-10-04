import type { QuotationAccommodation, QuotationInclusion, QuotationOptionalTour } from '../types/package'

// Tidy the quotation sections before saving: trim text and drop blank rows.
// Shared by the package form's Quotation tab and the Quotations module.

export function cleanInclusions(items: QuotationInclusion[]): QuotationInclusion[] {
  return items
    .map((item) => ({
      text: item.text.trim(),
      price: item.price,
      details: item.details
        .map((d) => ({
          text: d.text.trim(),
          price: d.price,
          details: d.details
            .map((sub) => ({ text: sub.text.trim(), price: sub.price }))
            .filter((sub) => sub.text || sub.price !== undefined),
        }))
        .filter((d) => d.text || d.price !== undefined || d.details.length),
    }))
    .filter((item) => item.text || item.price !== undefined || item.details.length)
}

export function cleanAccommodations(items: QuotationAccommodation[]): QuotationAccommodation[] {
  return items.filter((a) => a.hotelId).map((a) => ({ ...a, remarks: a.remarks?.trim() || undefined }))
}

export function cleanExclusions(items: string[]): string[] {
  return items.map((e) => e.trim()).filter(Boolean)
}

export function cleanOptionalTours(items: QuotationOptionalTour[]): QuotationOptionalTour[] {
  return items
    .map((tour) => ({ text: tour.text.trim(), details: tour.details.map((d) => d.trim()).filter(Boolean) }))
    .filter((tour) => tour.text || tour.details.length)
}
