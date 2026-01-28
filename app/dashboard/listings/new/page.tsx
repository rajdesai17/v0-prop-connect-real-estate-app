'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/hooks/use-auth'
import { allAmenities } from '@/lib/data'
import type { PropertyType, PropertyStatus } from '@/lib/types'
import { ArrowLeft, Loader2, Upload } from 'lucide-react'

export default function NewListingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would save the listing here
    // For now, just redirect back to listings
    router.push('/dashboard/listings')
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    )
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/listings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create New Listing</h1>
          <p className="text-muted-foreground">Add a new property to your portfolio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the main details about your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Modern Luxury Villa with Ocean Views"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your property in detail..."
                rows={4}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="500000"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select name="type" defaultValue="house">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Listing Status</Label>
                <Select name="status" defaultValue="for-sale">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="for-rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription>Where is your property located?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                name="street"
                placeholder="123 Main Street"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" placeholder="San Francisco" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" placeholder="CA" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" name="zip" placeholder="94102" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" defaultValue="USA" required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Features */}
        <Card>
          <CardHeader>
            <CardTitle>Property Features</CardTitle>
            <CardDescription>Specify the features of your property</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  placeholder="3"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  placeholder="2"
                  min="0"
                  step="0.5"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sqft">Square Feet</Label>
                <Input
                  id="sqft"
                  name="sqft"
                  type="number"
                  placeholder="2000"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input
                  id="yearBuilt"
                  name="yearBuilt"
                  type="number"
                  placeholder="2020"
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parking">Parking Spaces</Label>
                <Input
                  id="parking"
                  name="parking"
                  type="number"
                  placeholder="2"
                  min="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
            <CardDescription>Select all amenities that apply</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {allAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label
                    htmlFor={`amenity-${amenity}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Upload photos of your property</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop images here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 10MB each (max 10 images)
              </p>
              <Button variant="outline" size="sm" className="mt-4 bg-transparent" type="button">
                Select Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/dashboard/listings">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Listing'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
