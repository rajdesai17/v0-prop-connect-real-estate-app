'use client'

import React from "react"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { useAuth } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-20 rounded-lg border border-border bg-card p-4">
              <div className="mb-6">
                <h2 className="font-semibold text-foreground">Dashboard</h2>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user?.name?.split(' ')[0]}
                </p>
              </div>
              <DashboardNav />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
