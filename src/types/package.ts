export type PackageCategory = 'Local Tours' | 'International' | 'Corporate / Group'
export type PackageStatus = 'draft' | 'published'

export type ItineraryDay = {
  label: string
  description: string
}

export type Package = {
  id: string
  title: string
  slug: string
  location?: string
  duration?: string
  category: PackageCategory
  price?: string
  pax?: string
  summary?: string
  itinerary: ItineraryDay[]
  inclusions: string[]
  exclusions: string[]
  termsAndConditions?: string
  mainImage?: string
  poster?: string
  gallery: string[]
  status: PackageStatus
  createdAt: string
  updatedAt: string
}

export type PackageInput = Omit<Package, 'id' | 'createdAt' | 'updatedAt' | 'slug'> & { slug?: string }

export const PACKAGE_CATEGORIES: PackageCategory[] = ['Local Tours', 'International', 'Corporate / Group']
