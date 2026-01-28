'use client'

import { useCallback, useMemo } from 'react'
import useSWR from 'swr'
import type { Property, PropertyFilters, PropertiesResponse } from '@/lib/types'
import { properties as mockProperties, getPropertyById, getFeaturedProperties } from '@/lib/data'

interface UsePropertiesOptions {
  filters?: PropertyFilters
  page?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

interface UsePropertiesReturn {
  properties: Property[]
  isLoading: boolean
  error: Error | undefined
  total: number
  page: number
  pageSize: number
  totalPages: number
  refetch: () => void
}

// Apply filters to properties
function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter((property) => {
    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase()
      const matchesSearch =
        property.title.toLowerCase().includes(search) ||
        property.description.toLowerCase().includes(search) ||
        property.address.city.toLowerCase().includes(search) ||
        property.address.state.toLowerCase().includes(search)
      if (!matchesSearch) return false
    }

    // Type filter
    if (filters.type && filters.type.length > 0) {
      if (!filters.type.includes(property.type)) return false
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(property.status)) return false
    }

    // Price range
    if (filters.minPrice !== undefined && property.price < filters.minPrice) return false
    if (filters.maxPrice !== undefined && property.price > filters.maxPrice) return false

    // Bedrooms
    if (filters.minBeds !== undefined && property.features.bedrooms < filters.minBeds) return false
    if (filters.maxBeds !== undefined && property.features.bedrooms > filters.maxBeds) return false

    // Bathrooms
    if (filters.minBaths !== undefined && property.features.bathrooms < filters.minBaths) return false
    if (filters.maxBaths !== undefined && property.features.bathrooms > filters.maxBaths) return false

    // Square footage
    if (filters.minSqft !== undefined && property.features.sqft < filters.minSqft) return false
    if (filters.maxSqft !== undefined && property.features.sqft > filters.maxSqft) return false

    // Amenities
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        property.amenities.includes(amenity)
      )
      if (!hasAllAmenities) return false
    }

    // City
    if (filters.city && property.address.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false
    }

    // State
    if (filters.state && property.address.state.toLowerCase() !== filters.state.toLowerCase()) {
      return false
    }

    return true
  })
}

// Sort properties
function sortProperties(
  properties: Property[],
  sortBy: string = 'createdAt',
  direction: 'asc' | 'desc' = 'desc'
): Property[] {
  return [...properties].sort((a, b) => {
    let aValue: number | string
    let bValue: number | string

    switch (sortBy) {
      case 'price':
        aValue = a.price
        bValue = b.price
        break
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime()
        bValue = new Date(b.createdAt).getTime()
        break
      case 'sqft':
        aValue = a.features.sqft
        bValue = b.features.sqft
        break
      case 'bedrooms':
        aValue = a.features.bedrooms
        bValue = b.features.bedrooms
        break
      default:
        aValue = new Date(a.createdAt).getTime()
        bValue = new Date(b.createdAt).getTime()
    }

    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1
    }
    return aValue < bValue ? 1 : -1
  })
}

// Main hook
export function useProperties(options: UsePropertiesOptions = {}): UsePropertiesReturn {
  const { filters = {}, page = 1, pageSize = 9, sortBy = 'createdAt', sortDirection = 'desc' } = options

  // Create a cache key based on options
  const cacheKey = useMemo(() => {
    return `properties-${JSON.stringify({ filters, page, pageSize, sortBy, sortDirection })}`
  }, [filters, page, pageSize, sortBy, sortDirection])

  // Fetcher function
  const fetcher = useCallback(async (): Promise<PropertiesResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Filter properties
    let result = filterProperties(mockProperties, filters)

    // Sort properties
    result = sortProperties(result, sortBy, sortDirection)

    // Get total before pagination
    const total = result.length

    // Apply pagination
    const startIndex = (page - 1) * pageSize
    const paginatedResult = result.slice(startIndex, startIndex + pageSize)

    return {
      properties: paginatedResult,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    }
  }, [filters, page, pageSize, sortBy, sortDirection])

  const { data, error, isLoading, mutate } = useSWR<PropertiesResponse>(cacheKey, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    properties: data?.properties ?? [],
    isLoading,
    error,
    total: data?.total ?? 0,
    page: data?.page ?? page,
    pageSize: data?.pageSize ?? pageSize,
    totalPages: data?.totalPages ?? 0,
    refetch: mutate,
  }
}

// Hook to get a single property
export function useProperty(id: string) {
  const { data, error, isLoading } = useSWR<Property | undefined>(
    id ? `property-${id}` : null,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      return getPropertyById(id)
    },
    { revalidateOnFocus: false }
  )

  return {
    property: data,
    isLoading,
    error,
  }
}

// Hook to get featured properties
export function useFeaturedProperties() {
  const { data, error, isLoading } = useSWR<Property[]>(
    'featured-properties',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      return getFeaturedProperties()
    },
    { revalidateOnFocus: false }
  )

  return {
    properties: data ?? [],
    isLoading,
    error,
  }
}
