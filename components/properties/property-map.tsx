'use client'

import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PropertyMapProps {
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  className?: string
}

export function PropertyMap({ address, className }: PropertyMapProps) {
  // This is a placeholder map component
  // In production, you would integrate with Google Maps, Mapbox, etc.
  
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-border bg-muted',
        className
      )}
    >
      {/* Map placeholder background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10">
        {/* Grid pattern to simulate map */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Simulated roads */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 right-0 h-1 bg-muted-foreground/20" />
          <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-muted-foreground/10" />
          <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-muted-foreground/10" />
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted-foreground/20" />
          <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-muted-foreground/10" />
        </div>
      </div>

      {/* Center marker */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <div className="relative">
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-primary/20 animate-ping" />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-1 left-1/2 h-3 w-1 -translate-x-1/2 bg-primary" />
        </div>
      </div>

      {/* Address overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="rounded-lg bg-card/95 backdrop-blur-sm p-3 shadow-lg border border-border">
          <p className="text-sm font-medium text-foreground">{address.street}</p>
          <p className="text-sm text-muted-foreground">
            {address.city}, {address.state} {address.zip}
          </p>
        </div>
      </div>

      {/* Placeholder message */}
      <div className="absolute top-4 right-4">
        <div className="rounded-md bg-card/80 backdrop-blur-sm px-2 py-1 text-xs text-muted-foreground border border-border">
          Map placeholder
        </div>
      </div>
    </div>
  )
}
