'use client'

import NewVerificationForm from '@/components/auth/verification/new-verification-form'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationForm />
    </Suspense>
  )
}
