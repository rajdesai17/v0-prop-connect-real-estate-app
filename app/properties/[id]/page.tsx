'use client'

import { use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PropertyGallery } from '@/components/properties/property-gallery'
import { PropertyDetails } from '@/components/properties/property-details'
import { PropertyMap } from '@/components/properties/property-map'
import { PropertyGrid } from '@/components/properties/property-grid'
import { useProperty, useProperties } from '@/hooks/use-properties'
import { ArrowLeft, Loader2 } from 'lucide-react'

interface PropertyPageProps {
  params: Promise<{ id: string }>
}

function PropertyContent({ id }: { id: string }) {
  const { property, isLoading, error } = useProperty(id)

  // Get similar properties (same type, excluding current)
  const { properties: similarProperties } = useProperties({
    filters: property ? { type: [property.type] } : {},
    pageSize: 4,
  })

  const filteredSimilar = similarProperties.filter((p) => p.id !== id).slice(0, 3)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Property Not Found</h1>
        <p className="text-muted-foreground">The property you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/properties">Browse Properties</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column - Gallery and details */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery images={property.images} title={property.title} />

            <PropertyDetails property={property} />
          </div>

          {/* Right column - Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <PropertyMap address={property.address} className="h-80" />
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {filteredSimilar.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Similar Properties</h2>
              <Button variant="outline" asChild>
                <Link href={`/properties?type=${property.type}`}>View More</Link>
              </Button>
            </div>
            <PropertyGrid properties={filteredSimilar} columns={3} />
          </section>
        )}
      </div>
    </div>
  )
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { id } = use(params)
  return <PropertyContent id={id} />
}
