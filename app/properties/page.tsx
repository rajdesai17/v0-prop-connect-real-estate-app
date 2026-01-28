'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PropertySearch } from '@/components/properties/property-search'
import { PropertyFilters } from '@/components/properties/property-filters'
import { PropertyGrid } from '@/components/properties/property-grid'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useProperties } from '@/hooks/use-properties'
import type { PropertyFilters as Filters, PropertyType, PropertyStatus } from '@/lib/types'
import { ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react'

const sortOptions = [
  { label: 'Newest First', value: 'createdAt-desc' },
  { label: 'Oldest First', value: 'createdAt-asc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Bedrooms', value: 'bedrooms-desc' },
  { label: 'Square Feet', value: 'sqft-desc' },
]

function PropertiesContent() {
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [filters, setFilters] = useState<Filters>({})

  // Parse URL params on mount
  useEffect(() => {
    const search = searchParams.get('search')
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    const newFilters: Filters = {}
    if (search) newFilters.search = search
    if (type) newFilters.type = [type as PropertyType]
    if (status) newFilters.status = [status as PropertyStatus]

    setFilters(newFilters)
  }, [searchParams])

  const { properties, isLoading, total, totalPages } = useProperties({
    filters,
    page,
    pageSize: 9,
    sortBy,
    sortDirection,
  })

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-')
    setSortBy(field)
    setSortDirection(direction as 'asc' | 'desc')
    setPage(1)
  }

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search: search || undefined }))
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Find Properties</h1>
          <p className="mt-2 text-muted-foreground">
            Browse {total.toLocaleString()} properties for sale and rent
          </p>
          
          {/* Search */}
          <div className="mt-6 max-w-2xl">
            <PropertySearch
              defaultValue={filters.search}
              onSearch={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <PropertyFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </aside>

          {/* Property listings */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {properties.length} of {total.toLocaleString()} properties
              </p>
              
              <div className="flex items-center gap-4">
                <Select
                  value={`${sortBy}-${sortDirection}`}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid */}
            <PropertyGrid
              properties={properties}
              isLoading={isLoading}
              columns={3}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? 'default' : 'ghost'}
                        size="sm"
                        className="w-10"
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<PropertiesPageSkeleton />}>
      <PropertiesContent />
    </Suspense>
  )
}

function PropertiesPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-9 w-48 bg-muted rounded animate-pulse" />
          <div className="mt-2 h-5 w-64 bg-muted rounded animate-pulse" />
          <div className="mt-6 max-w-2xl h-10 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <div className="hidden lg:block w-72 h-96 bg-muted rounded animate-pulse" />
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
