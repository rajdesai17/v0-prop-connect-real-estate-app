'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SlidersHorizontal, X } from 'lucide-react'
import type { PropertyFilters as PropertyFiltersType, PropertyType, PropertyStatus } from '@/lib/types'
import { allAmenities, propertyTypeLabels, propertyStatusLabels } from '@/lib/data'
import { cn } from '@/lib/utils'

interface PropertyFiltersProps {
  filters: PropertyFiltersType
  onFiltersChange: (filters: PropertyFiltersType) => void
  className?: string
}

const propertyTypes: PropertyType[] = ['house', 'apartment', 'condo', 'townhouse', 'land']
const propertyStatuses: PropertyStatus[] = ['for-sale', 'for-rent']

const priceRanges = {
  min: 0,
  max: 5000000,
  step: 50000,
}

export function PropertyFilters({ filters, onFiltersChange, className }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = <K extends keyof PropertyFiltersType>(key: K, value: PropertyFiltersType[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).some((key) => {
    const value = filters[key as keyof PropertyFiltersType]
    if (Array.isArray(value)) return value.length > 0
    return value !== undefined && value !== ''
  })

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return `$${(price / 1000).toFixed(0)}K`
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear filters button */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}

      <Accordion type="multiple" defaultValue={['type', 'price', 'beds', 'status']} className="w-full">
        {/* Property Type */}
        <AccordionItem value="type">
          <AccordionTrigger className="text-sm font-medium">Property Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {propertyTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.type?.includes(type) ?? false}
                    onCheckedChange={(checked) => {
                      const current = filters.type ?? []
                      if (checked) {
                        updateFilter('type', [...current, type])
                      } else {
                        updateFilter('type', current.filter((t) => t !== type))
                      }
                    }}
                  />
                  <Label
                    htmlFor={`type-${type}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {propertyTypeLabels[type]}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Status */}
        <AccordionItem value="status">
          <AccordionTrigger className="text-sm font-medium">Listing Status</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {propertyStatuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={filters.status?.includes(status) ?? false}
                    onCheckedChange={(checked) => {
                      const current = filters.status ?? []
                      if (checked) {
                        updateFilter('status', [...current, status])
                      } else {
                        updateFilter('status', current.filter((s) => s !== status))
                      }
                    }}
                  />
                  <Label
                    htmlFor={`status-${status}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {propertyStatusLabels[status]}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-sm">
                <span>{formatPrice(filters.minPrice ?? priceRanges.min)}</span>
                <span>{formatPrice(filters.maxPrice ?? priceRanges.max)}</span>
              </div>
              <Slider
                min={priceRanges.min}
                max={priceRanges.max}
                step={priceRanges.step}
                value={[
                  filters.minPrice ?? priceRanges.min,
                  filters.maxPrice ?? priceRanges.max,
                ]}
                onValueChange={([min, max]) => {
                  onFiltersChange({
                    ...filters,
                    minPrice: min === priceRanges.min ? undefined : min,
                    maxPrice: max === priceRanges.max ? undefined : max,
                  })
                }}
                className="w-full"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Bedrooms */}
        <AccordionItem value="beds">
          <AccordionTrigger className="text-sm font-medium">Bedrooms</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
              <Select
                value={filters.minBeds?.toString() ?? 'any'}
                onValueChange={(value) => {
                  updateFilter('minBeds', value === 'any' ? undefined : Number.parseInt(value))
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Bathrooms */}
        <AccordionItem value="baths">
          <AccordionTrigger className="text-sm font-medium">Bathrooms</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
              <Select
                value={filters.minBaths?.toString() ?? 'any'}
                onValueChange={(value) => {
                  updateFilter('minBaths', value === 'any' ? undefined : Number.parseInt(value))
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Amenities */}
        <AccordionItem value="amenities">
          <AccordionTrigger className="text-sm font-medium">Amenities</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {allAmenities.slice(0, 12).map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={filters.amenities?.includes(amenity) ?? false}
                    onCheckedChange={(checked) => {
                      const current = filters.amenities ?? []
                      if (checked) {
                        updateFilter('amenities', [...current, amenity])
                      } else {
                        updateFilter('amenities', current.filter((a) => a !== amenity))
                      }
                    }}
                  />
                  <Label
                    htmlFor={`amenity-${amenity}`}
                    className="text-xs font-normal cursor-pointer"
                  >
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <>
      {/* Desktop filters */}
      <div className={cn('hidden lg:block', className)}>
        <div className="sticky top-20 rounded-lg border border-border bg-card p-4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <FilterContent />
        </div>
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  Active
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
