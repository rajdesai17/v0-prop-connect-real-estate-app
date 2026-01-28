'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Pencil, Trash2, ExternalLink } from 'lucide-react'
import type { Property } from '@/lib/types'
import { propertyStatusLabels, propertyTypeLabels } from '@/lib/data'
import { cn } from '@/lib/utils'

interface ListingsTableProps {
  listings: Property[]
  onDelete?: (id: string) => void
}

export function ListingsTable({ listings, onDelete }: ListingsTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const statusColor = {
    'for-sale': 'bg-primary/10 text-primary',
    'for-rent': 'bg-accent/10 text-accent-foreground',
    sold: 'bg-muted text-muted-foreground',
    pending: 'bg-yellow-100 text-yellow-800',
  }

  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-lg">
        <div className="rounded-full bg-muted p-6 mb-4">
          <svg
            className="h-12 w-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground">No listings yet</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Start by creating your first property listing.
        </p>
        <Button asChild>
          <Link href="/dashboard/listings/new">Create Listing</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Property</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Listed</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.map((listing) => (
            <TableRow key={listing.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-16 overflow-hidden rounded-md shrink-0">
                    <Image
                      src={listing.images[0] || '/placeholder.svg'}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {listing.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {listing.address.city}, {listing.address.state}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {formatPrice(listing.price)}
              </TableCell>
              <TableCell>
                <span className="text-muted-foreground">
                  {propertyTypeLabels[listing.type]}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(statusColor[listing.status])}
                >
                  {propertyStatusLabels[listing.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(listing.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/properties/${listing.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/listings/${listing.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDelete?.(listing.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
