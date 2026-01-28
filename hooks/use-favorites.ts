'use client'

import useSWR from 'swr'
import { useCallback } from 'react'
import type { Property } from '@/lib/types'
import { getPropertiesByIds } from '@/lib/data'
import { useAuth } from './use-auth'

interface UseFavoritesReturn {
  favorites: Property[]
  isLoading: boolean
  error: Error | undefined
  addFavorite: (propertyId: string) => Promise<void>
  removeFavorite: (propertyId: string) => Promise<void>
  toggleFavorite: (propertyId: string) => Promise<void>
  isFavorite: (propertyId: string) => boolean
}

export function useFavorites(): UseFavoritesReturn {
  const { user, addToFavorites, removeFromFavorites, isFavorited } = useAuth()

  // Get favorite property IDs from user
  const favoriteIds = user?.favorites ?? []

  // Fetch full property details for favorites
  const { data, error, isLoading, mutate } = useSWR<Property[]>(
    user ? `favorites-${user.id}-${favoriteIds.join(',')}` : null,
    async () => {
      if (!user || favoriteIds.length === 0) return []
      await new Promise((resolve) => setTimeout(resolve, 100))
      return getPropertiesByIds(favoriteIds)
    },
    { revalidateOnFocus: false }
  )

  const addFavorite = useCallback(async (propertyId: string) => {
    await addToFavorites(propertyId)
    mutate()
  }, [addToFavorites, mutate])

  const removeFavorite = useCallback(async (propertyId: string) => {
    await removeFromFavorites(propertyId)
    mutate()
  }, [removeFromFavorites, mutate])

  const toggleFavorite = useCallback(async (propertyId: string) => {
    if (isFavorited(propertyId)) {
      await removeFavorite(propertyId)
    } else {
      await addFavorite(propertyId)
    }
  }, [isFavorited, addFavorite, removeFavorite])

  const isFavorite = useCallback((propertyId: string): boolean => {
    return isFavorited(propertyId)
  }, [isFavorited])

  return {
    favorites: data ?? [],
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  }
}
