'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { ListingsTable } from '@/components/dashboard/listings-table'
import { PropertyGrid } from '@/components/properties/property-grid'
import { useAuth } from '@/hooks/use-auth'
import { useFavorites } from '@/hooks/use-favorites'
import { getPropertiesByIds } from '@/lib/data'
import { ArrowRight, Plus } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const { favorites } = useFavorites()

  if (!user) return null

  // Get user's listings
  const userListings = getPropertiesByIds(user.listings)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your properties and favorites
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/listings/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Listing
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <DashboardStats user={user} />

      {/* Recent Listings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Listings</CardTitle>
            <CardDescription>Your active property listings</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/listings">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ListingsTable listings={userListings.slice(0, 5)} />
        </CardContent>
      </Card>

      {/* Recent Favorites */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Saved Properties</CardTitle>
            <CardDescription>Properties you&apos;ve favorited</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/favorites">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {favorites.length > 0 ? (
            <PropertyGrid properties={favorites.slice(0, 3)} columns={3} />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No favorites yet</p>
              <Button variant="outline" size="sm" className="mt-4 bg-transparent" asChild>
                <Link href="/properties">Browse Properties</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
