'use client'

import React from "react"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PropertyGalleryProps {
  images: string[]
  title: string
  className?: string
}

export function PropertyGallery({ images, title, className }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'Escape') setIsLightboxOpen(false)
  }

  if (images.length === 0) {
    return (
      <div className={cn('aspect-[16/9] rounded-lg bg-muted flex items-center justify-center', className)}>
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <>
      <div className={cn('space-y-2', className)}>
        {/* Main image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={images[selectedIndex] || '/placeholder.svg'}
            alt={`${title} - Image ${selectedIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Expand button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={() => setIsLightboxOpen(true)}
            aria-label="View fullscreen"
          >
            <Expand className="h-5 w-5" />
          </Button>

          {/* Image counter */}
          <div className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-1 text-sm text-white">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all',
                  index === selectedIndex
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-transparent opacity-70 hover:opacity-100'
                )}
              >
                <Image
                  src={image || '/placeholder.svg'}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none"
          onKeyDown={handleKeyDown}
        >
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Main image */}
            <div className="relative w-full h-full">
              <Image
                src={images[selectedIndex] || '/placeholder.svg'}
                alt={`${title} - Image ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="95vw"
              />
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={goToPrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={goToNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-white">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
