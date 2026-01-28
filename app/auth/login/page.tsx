import { LoginForm } from '@/components/forms/login-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your PropConnect account',
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-muted/30">
      <LoginForm />
    </div>
  )
}
