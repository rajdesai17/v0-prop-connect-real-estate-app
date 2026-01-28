'use client'

import React from "react"

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PropertySearchProps {
  defaultValue?: string
  onSearch?: (query: string) => void
  showFilters?: boolean
  className?: string
  variant?: 'default' | 'hero'
}

export function PropertySearch({
  defaultValue = '',
  onSearch,
  showFilters = false,
  className,
  variant = 'default',
}: PropertySearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState(defaultValue)
  const [propertyType, setPropertyType] = useState('any')
  const [status, setStatus] = useState('for-sale')

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault()
      
      if (onSearch) {
        onSearch(query)
      } else {
        // Navigate to properties page with search params
        const params = new URLSearchParams()
        if (query) params.set('search', query)
        if (propertyType !== 'any') params.set('type', propertyType)
        if (status !== 'any') params.set('status', status)
        
        router.push(`/properties?${params.toString()}`)
      }
    },
    [query, propertyType, status, onSearch, router]
  )

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSearch} className={cn('w-full', className)}>
        <div className="flex flex-col gap-3 rounded-xl bg-card p-4 shadow-lg border border-border sm:flex-row sm:items-center">
          {/* Search input */}
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="City, neighborhood, or address"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 border-0 bg-muted/50 text-base"
            />
          </div>

          {showFilters && (
            <>
              {/* Property type */}
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-full sm:w-40 h-12 border-0 bg-muted/50">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>

              {/* Status */}
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full sm:w-36 h-12 border-0 bg-muted/50">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Buy or Rent</SelectItem>
                  <SelectItem value="for-sale">For Sale</SelectItem>
                  <SelectItem value="for-rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          {/* Search button */}
          <Button type="submit" size="lg" className="h-12 px-8">
            <Search className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSearch} className={cn('w-full', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by city, address, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-20"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
