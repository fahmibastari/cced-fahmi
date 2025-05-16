'use client'

import { FormError } from '@/components/auth/form-error'
import RegisterAdminForm from '@/components/auth/register/resgister-admin-form'
import { isValidTokenAdmin } from '@/data/userRole'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const [valid, setValid] = useState<boolean>(false)
  const token = useSearchParams().get('token')
  useEffect(() => {
    function checkToken() {
      isValidTokenAdmin(token || '').then((res: boolean) => {
        setValid(res)
      })
    }
    checkToken()
  }, [token])

  if (!token) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <FormError message='Anda tidak diizinkan mengakses halaman ini' />
      </div>
    )
  }

  if (valid) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <FormError message='Terjadi kesalahan! Periksa Token Akses Anda' />
      </div>
    )
  }
  return <RegisterAdminForm />
}
