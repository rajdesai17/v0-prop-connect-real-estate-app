import { RegisterForm } from '@/components/forms/register-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a PropConnect account to find your dream property',
}

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-muted/30">
      <RegisterForm />
    </div>
  )
}
