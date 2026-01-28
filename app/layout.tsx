import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'PropConnect - Find Your Perfect Property',
    template: '%s | PropConnect',
  },
  description:
    'Discover your dream home with PropConnect. Browse thousands of properties for sale and rent, connect with top agents, and find the perfect place to call home.',
  keywords: [
    'real estate',
    'property',
    'homes for sale',
    'apartments for rent',
    'buy house',
    'rent apartment',
    'real estate agent',
  ],
  authors: [{ name: 'PropConnect' }],
  creator: 'PropConnect',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'PropConnect',
    title: 'PropConnect - Find Your Perfect Property',
    description:
      'Discover your dream home with PropConnect. Browse thousands of properties for sale and rent.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropConnect - Find Your Perfect Property',
    description:
      'Discover your dream home with PropConnect. Browse thousands of properties for sale and rent.',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e40af' },
    { media: '(prefers-color-scheme: dark)', color: '#1e3a8a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
