'use client'

import React from "react"

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Property } from '@/lib/types'
import { propertyStatusLabels, propertyTypeLabels } from '@/lib/data'
import { useAuth } from '@/hooks/use-auth'
import { useFavorites } from '@/hooks/use-favorites'
import { cn } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
  className?: string
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const { isAuthenticated } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()

  const isFav = isFavorite(property.id)

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      // Could redirect to login or show a toast
      return
    }
    await toggleFavorite(property.id)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const statusColor = {
    'for-sale': 'bg-primary text-primary-foreground',
    'for-rent': 'bg-accent text-accent-foreground',
    sold: 'bg-muted text-muted-foreground',
    pending: 'bg-warning text-warning-foreground',
  }

  return (
    <Card className={cn('group overflow-hidden transition-all hover:shadow-lg', className)}>
      <Link href={`/properties/${property.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[0] || '/placeholder.svg'}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status badge */}
          <Badge
            className={cn(
              'absolute top-3 left-3',
              statusColor[property.status]
            )}
          >
            {propertyStatusLabels[property.status]}
          </Badge>

          {/* Favorite button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm',
              isFav && 'text-red-500'
            )}
            onClick={handleFavoriteClick}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={cn('h-4 w-4', isFav && 'fill-current')} />
          </Button>

          {/* Price overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-2xl font-bold text-white drop-shadow-lg">
              {formatPrice(property.price)}
              {property.status === 'for-rent' && (
                <span className="text-sm font-normal">/mo</span>
              )}
            </p>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Title and type */}
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {propertyTypeLabels[property.type]}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">
                {property.address.city}, {property.address.state}
              </span>
            </div>

            {/* Features */}
            {property.type !== 'land' && (
              <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.features.bedrooms}</span>
                  <span className="sr-only">bedrooms</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.features.bathrooms}</span>
                  <span className="sr-only">bathrooms</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{property.features.sqft.toLocaleString()}</span>
                  <span className="sr-only">square feet</span>
                </div>
              </div>
            )}

            {/* Land specific info */}
            {property.type === 'land' && property.features.lotSize && (
              <div className="flex items-center gap-1 pt-2 text-sm text-muted-foreground">
                <Square className="h-4 w-4" />
                <span>{property.features.lotSize} acres</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
