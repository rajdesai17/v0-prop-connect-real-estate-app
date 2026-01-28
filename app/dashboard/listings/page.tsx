'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ListingsTable } from '@/components/dashboard/listings-table'
import { useAuth } from '@/hooks/use-auth'
import { getPropertiesByIds } from '@/lib/data'
import { Plus } from 'lucide-react'

export default function MyListingsPage() {
  const { user } = useAuth()

  if (!user) return null

  const userListings = getPropertiesByIds(user.listings)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
          <p className="text-muted-foreground">
            Manage your property listings
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/listings/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Listing
          </Link>
        </Button>
      </div>

      <ListingsTable listings={userListings} />
    </div>
  )
}
