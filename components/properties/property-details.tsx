'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Bed,
  Bath,
  Square,
  Car,
  Calendar,
  MapPin,
  Heart,
  Share2,
  Phone,
  Mail,
  MessageSquare,
  Check,
} from 'lucide-react'
import type { Property } from '@/lib/types'
import { propertyStatusLabels, propertyTypeLabels } from '@/lib/data'
import { useAuth } from '@/hooks/use-auth'
import { useFavorites } from '@/hooks/use-favorites'
import { cn } from '@/lib/utils'

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const { isAuthenticated } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()

  const isFav = isFavorite(property.id)

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) return
    await toggleFavorite(property.id)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      // Could show a toast here
    }
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge className={statusColor[property.status]}>
              {propertyStatusLabels[property.status]}
            </Badge>
            <Badge variant="outline">{propertyTypeLabels[property.type]}</Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl text-balance">
            {property.title}
          </h1>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {property.address.street}, {property.address.city}, {property.address.state}{' '}
              {property.address.zip}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-3xl font-bold text-primary">
            {formatPrice(property.price)}
            {property.status === 'for-rent' && (
              <span className="text-lg font-normal text-muted-foreground">/mo</span>
            )}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFavoriteClick}
              className={cn(isFav && 'text-red-500 border-red-500')}
            >
              <Heart className={cn('h-4 w-4 mr-2', isFav && 'fill-current')} />
              {isFav ? 'Saved' : 'Save'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Key features */}
      {property.type !== 'land' && (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Bed className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{property.features.bedrooms}</p>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Bath className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{property.features.bathrooms}</p>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Square className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{property.features.sqft.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Sq Ft</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{property.features.parking}</p>
                  <p className="text-sm text-muted-foreground">Parking</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>About This Property</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{property.description}</p>
        </CardContent>
      </Card>

      {/* Property details */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Property Type</span>
              <span className="font-medium">{propertyTypeLabels[property.type]}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium">{propertyStatusLabels[property.status]}</span>
            </div>
            {property.features.yearBuilt > 0 && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Year Built</span>
                <span className="font-medium">{property.features.yearBuilt}</span>
              </div>
            )}
            {property.features.lotSize && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Lot Size</span>
                <span className="font-medium">{property.features.lotSize} acres</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Listed</span>
              <span className="font-medium">
                {new Date(property.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      {property.amenities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Amenities & Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agent card */}
      <Card>
        <CardHeader>
          <CardTitle>Listed By</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={property.agent.avatar || '/placeholder.svg'}
                  alt={property.agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">{property.agent.name}</p>
                <p className="text-sm text-muted-foreground">Real Estate Agent</p>
                {property.agent.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm text-accent">{'*'.repeat(Math.floor(property.agent.rating))}</span>
                    <span className="text-sm text-muted-foreground">({property.agent.rating})</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" asChild>
                <a href={`tel:${property.agent.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`mailto:${property.agent.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
              </Button>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
