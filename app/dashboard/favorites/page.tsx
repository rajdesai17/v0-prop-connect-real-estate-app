'use client'

import { FavoritesGrid } from '@/components/dashboard/favorites-grid'
import { useFavorites } from '@/hooks/use-favorites'

export default function FavoritesPage() {
  const { favorites, isLoading } = useFavorites()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Saved Properties</h1>
        <p className="text-muted-foreground">
          Properties you&apos;ve saved for later
        </p>
      </div>

      <FavoritesGrid favorites={favorites} isLoading={isLoading} />
    </div>
  )
}
