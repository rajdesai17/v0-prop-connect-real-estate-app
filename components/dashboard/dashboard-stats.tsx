'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Heart, Eye, TrendingUp } from 'lucide-react'
import type { User } from '@/lib/types'

interface DashboardStatsProps {
  user: User
}

export function DashboardStats({ user }: DashboardStatsProps) {
  const stats = [
    {
      title: 'My Listings',
      value: user.listings.length.toString(),
      description: 'Active properties',
      icon: Home,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Saved Properties',
      value: user.favorites.length.toString(),
      description: 'In your favorites',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'Total Views',
      value: '1,234',
      description: 'On your listings',
      icon: Eye,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Inquiries',
      value: '23',
      description: 'This month',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={cn(stat.bgColor, 'rounded-full p-2')}>
              <stat.icon className={cn('h-4 w-4', stat.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
