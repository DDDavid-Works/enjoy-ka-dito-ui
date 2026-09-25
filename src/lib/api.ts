import type { Package, PackageInput } from '../types/package'
import type { Inquiry, InquiryInput } from '../types/inquiry'
import type { Hotel, HotelInput } from '../types/hotel'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'
const STORAGE_KEY = 'ekd-admin-auth'

function getToken(): string | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored).accessToken ?? null
  } catch {
    return null
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? `Request failed (${response.status})`)
  }

  if (response.status === 204) return undefined as T

  return response.json()
}

export const packagesApi = {
  list: () => request<Package[]>('/packages'),
  get: (slug: string) => request<Package>(`/packages/${slug}`),
  create: (data: PackageInput) =>
    request<Package>('/packages', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<PackageInput>) =>
    request<Package>(`/packages/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: string) => request<void>(`/packages/${id}`, { method: 'DELETE' }),
}

export const hotelsApi = {
  list: () => request<Hotel[]>('/hotels'),
  get: (id: string) => request<Hotel>(`/hotels/${id}`),
  create: (data: HotelInput) => request<Hotel>('/hotels', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<HotelInput>) =>
    request<Hotel>(`/hotels/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: string) => request<void>(`/hotels/${id}`, { method: 'DELETE' }),
}

export const inquiriesApi = {
  create: (data: InquiryInput) =>
    request<Inquiry>('/inquiries', { method: 'POST', body: JSON.stringify(data) }),
  list: () => request<Inquiry[]>('/inquiries'),
  updateStatus: (id: string, status: Inquiry['status']) =>
    request<Inquiry>(`/inquiries/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
}
