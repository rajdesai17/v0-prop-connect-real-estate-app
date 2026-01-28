'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PropertySearch } from '@/components/properties/property-search'
import { PropertyGrid } from '@/components/properties/property-grid'
import { useFeaturedProperties } from '@/hooks/use-properties'
import {
  Home,
  Building2,
  Building,
  Trees,
  ArrowRight,
  Search,
  Shield,
  Users,
  TrendingUp,
  Star,
  CheckCircle,
} from 'lucide-react'

const propertyTypes = [
  { name: 'Houses', icon: Home, href: '/properties?type=house', count: '2,345' },
  { name: 'Apartments', icon: Building2, href: '/properties?type=apartment', count: '1,892' },
  { name: 'Condos', icon: Building, href: '/properties?type=condo', count: '967' },
  { name: 'Land', icon: Trees, href: '/properties?type=land', count: '432' },
]

const howItWorks = [
  {
    icon: Search,
    title: 'Search Properties',
    description: 'Browse thousands of listings with our powerful search and filter tools.',
  },
  {
    icon: Users,
    title: 'Connect with Agents',
    description: 'Get in touch with experienced real estate agents in your area.',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Complete your purchase with confidence through our verified process.',
  },
]

const stats = [
  { value: '15K+', label: 'Properties Listed' },
  { value: '8K+', label: 'Happy Clients' },
  { value: '500+', label: 'Expert Agents' },
  { value: '50+', label: 'Cities Covered' },
]

const testimonials = [
  {
    quote: 'PropConnect made finding our dream home so easy. The search tools are incredible and our agent was fantastic!',
    author: 'Sarah & Mike Thompson',
    role: 'Homeowners',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    quote: 'As a first-time buyer, I was nervous about the process. PropConnect guided me every step of the way.',
    author: 'David Chen',
    role: 'First-time Buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    quote: 'I sold my property in just 2 weeks! The platform attracted serious buyers and made everything seamless.',
    author: 'Jennifer Martinez',
    role: 'Property Seller',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
]

export default function HomePage() {
  const { properties: featuredProperties, isLoading } = useFeaturedProperties()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Find Your Perfect Place to Call{' '}
              <span className="text-primary">Home</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Discover thousands of properties for sale and rent. Connect with top agents and find your dream home with PropConnect.
            </p>
          </div>

          {/* Search bar */}
          <div className="mx-auto mt-10 max-w-3xl">
            <PropertySearch variant="hero" showFilters />
          </div>

          {/* Quick stats */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Browse by Property Type
            </h2>
            <p className="mt-2 text-muted-foreground">
              Find exactly what you&apos;re looking for
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {propertyTypes.map((type) => (
              <Link key={type.name} href={type.href}>
                <Card className="group transition-all hover:shadow-lg hover:border-primary/50">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
                      <type.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">{type.count} listings</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Featured Properties
              </h2>
              <p className="mt-2 text-muted-foreground">
                Hand-picked properties you&apos;ll love
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/properties">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10">
            <PropertyGrid
              properties={featuredProperties}
              isLoading={isLoading}
              columns={4}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              How PropConnect Works
            </h2>
            <p className="mt-2 text-muted-foreground">
              Your journey to finding the perfect property in 3 simple steps
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="relative text-center">
                {index < howItWorks.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-border sm:block" />
                )}
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              What Our Clients Say
            </h2>
            <p className="mt-2 text-muted-foreground">
              Join thousands of satisfied homeowners
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="relative">
                <CardContent className="p-6">
                  <div className="flex gap-1 text-accent mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatar || '/placeholder.svg'}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl text-balance">
              Ready to Find Your Dream Home?
            </h2>
            <p className="mt-4 max-w-2xl text-primary-foreground/80">
              Join thousands of happy homeowners who found their perfect property with PropConnect. Start your search today!
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/properties">
                  Browse Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                asChild
              >
                <Link href="/auth/register">
                  List Your Property
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm">Verified Listings</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Secure Transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm">Market Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm">Expert Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
