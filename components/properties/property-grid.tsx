'use client'

import { PropertyCard } from './property-card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Property } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PropertyGridProps {
  properties: Property[]
  isLoading?: boolean
  className?: string
  columns?: 2 | 3 | 4
}

export function PropertyGrid({
  properties,
  isLoading = false,
  className,
  columns = 3,
}: PropertyGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  if (isLoading) {
    return (
      <div className={cn('grid gap-6', gridCols[columns], className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <svg
            className="h-12 w-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground">No properties found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}
