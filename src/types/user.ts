export type User = {
  id: string
  name: string
  email: string
  contactNumber: string | null
  createdAt: string
}

export type UserInput = {
  name: string
  email: string
  contactNumber: string
}

export const MIN_PASSWORD_LENGTH = 8
