// Property Types
export type PropertyType = 'house' | 'apartment' | 'condo' | 'townhouse' | 'land'
export type PropertyStatus = 'for-sale' | 'for-rent' | 'sold' | 'pending'

export interface PropertyAddress {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface PropertyFeatures {
  bedrooms: number
  bathrooms: number
  sqft: number
  yearBuilt: number
  parking: number
  lotSize?: number
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  bio?: string
  listings?: number
  rating?: number
}

export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: PropertyType
  status: PropertyStatus
  address: PropertyAddress
  features: PropertyFeatures
  amenities: string[]
  images: string[]
  agent: Agent
  createdAt: string
  updatedAt: string
  isFeatured?: boolean
}

// User Types
export type UserRole = 'buyer' | 'seller' | 'agent'

export interface User {
  id: string
  name: string
  email: string
  password?: string // Only used for mock auth
  role: UserRole
  avatar?: string
  phone?: string
  favorites: string[]
  listings: string[]
  createdAt: string
}

// Filter Types
export interface PropertyFilters {
  search?: string
  type?: PropertyType[]
  status?: PropertyStatus[]
  minPrice?: number
  maxPrice?: number
  minBeds?: number
  maxBeds?: number
  minBaths?: number
  maxBaths?: number
  minSqft?: number
  maxSqft?: number
  amenities?: string[]
  city?: string
  state?: string
}

export interface SortOption {
  label: string
  value: string
  field: keyof Property | 'price' | 'createdAt'
  direction: 'asc' | 'desc'
}

// Form Types
export interface ListingFormData {
  title: string
  description: string
  price: number
  type: PropertyType
  status: PropertyStatus
  address: PropertyAddress
  features: PropertyFeatures
  amenities: string[]
  images: File[] | string[]
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: UserRole
}

// API Response Types
export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
}

export interface PropertiesResponse {
  properties: Property[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
