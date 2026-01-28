'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PropertyGrid } from '@/components/properties/property-grid'
import type { Property } from '@/lib/types'
import { Heart } from 'lucide-react'

interface FavoritesGridProps {
  favorites: Property[]
  isLoading?: boolean
}

export function FavoritesGrid({ favorites, isLoading }: FavoritesGridProps) {
  if (!isLoading && favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-lg">
        <div className="rounded-full bg-red-500/10 p-6 mb-4">
          <Heart className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No favorites yet</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-sm">
          Start exploring properties and save your favorites to easily find them later.
        </p>
        <Button asChild>
          <Link href="/properties">Browse Properties</Link>
        </Button>
      </div>
    )
  }

  return <PropertyGrid properties={favorites} isLoading={isLoading} columns={3} />
}
