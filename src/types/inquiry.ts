export type InquiryStatus = 'new' | 'contacted' | 'closed'
export type TravelerType = 'Corporate Group' | 'Family' | 'Senior Group' | 'Solo Foreigner'

export const TRAVELER_TYPES: TravelerType[] = ['Corporate Group', 'Family', 'Senior Group', 'Solo Foreigner']

export type Inquiry = {
  id: string
  name: string
  companyName?: string
  email: string
  phone?: string
  travelerType?: TravelerType
  destination?: string
  travelerCount?: string
  travelDates?: string
  message?: string
  status: InquiryStatus
  createdAt: string
}

export type InquiryInput = {
  name: string
  companyName?: string
  email: string
  phone?: string
  travelerType?: TravelerType
  destination?: string
  travelerCount?: string
  travelDates?: string
  message?: string
  packageId?: string
}
