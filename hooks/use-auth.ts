'use client'

import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import type { User, LoginFormData, RegisterFormData, AuthResponse } from '@/lib/types'
import * as authLib from '@/lib/auth'

interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (data: LoginFormData) => Promise<AuthResponse>
  register: (data: RegisterFormData) => Promise<AuthResponse>
  logout: () => void
  updateUser: (updates: Partial<User>) => Promise<AuthResponse>
  addToFavorites: (propertyId: string) => Promise<AuthResponse>
  removeFromFavorites: (propertyId: string) => Promise<AuthResponse>
  isFavorited: (propertyId: string) => boolean
  refreshUser: () => void
}

// Fetcher for SWR
const fetcher = () => {
  return authLib.getCurrentUser()
}

export function useAuth(): UseAuthReturn {
  const { data: user, mutate, isLoading } = useSWR<User | null>('auth', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const login = useCallback(async (data: LoginFormData): Promise<AuthResponse> => {
    const result = await authLib.login(data)
    if (result.success) {
      mutate(result.user)
    }
    return result
  }, [mutate])

  const register = useCallback(async (data: RegisterFormData): Promise<AuthResponse> => {
    const result = await authLib.register(data)
    if (result.success) {
      mutate(result.user)
    }
    return result
  }, [mutate])

  const logout = useCallback(() => {
    authLib.logout()
    mutate(null)
  }, [mutate])

  const updateUser = useCallback(async (updates: Partial<User>): Promise<AuthResponse> => {
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }
    const result = await authLib.updateUser(user.id, updates)
    if (result.success) {
      mutate(result.user)
    }
    return result
  }, [user, mutate])

  const addToFavorites = useCallback(async (propertyId: string): Promise<AuthResponse> => {
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }
    const result = await authLib.addToFavorites(user.id, propertyId)
    if (result.success) {
      mutate(result.user)
    }
    return result
  }, [user, mutate])

  const removeFromFavorites = useCallback(async (propertyId: string): Promise<AuthResponse> => {
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }
    const result = await authLib.removeFromFavorites(user.id, propertyId)
    if (result.success) {
      mutate(result.user)
    }
    return result
  }, [user, mutate])

  const isFavorited = useCallback((propertyId: string): boolean => {
    if (!user) return false
    return user.favorites.includes(propertyId)
  }, [user])

  const refreshUser = useCallback(() => {
    mutate()
  }, [mutate])

  return {
    user: user ?? null,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    refreshUser,
  }
}
