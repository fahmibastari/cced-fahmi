/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import Image from 'next/image'
import StatusVerifikasi from './status-verifikasi'
import { Button } from '../ui/button'
import { useState } from 'react'
import { createRequestVerified } from '@/actions/company-action'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'
import { signOut } from 'next-auth/react'


interface ProfileCompanyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const ProfileCompany = ({ data }: ProfileCompanyProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [checkIsWaiting, setCheckIsWaiting] = useState<boolean>(
    data.company.RequestVerified.length > 0
  )

  // Hapus useEffect yang ada

  const handleAjukan = async () => {
    const res = await createRequestVerified(data.company.id);
    setErrorMessage(res?.error ?? '');
    setSuccessMessage(res?.success ?? '');
  
    if (res?.success) {
      setCheckIsWaiting(true);
    }
  };
  
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card className='mb-6'>
        <CardHeader>
          <div className='flex items-center gap-6 mb-4'>
            <div className='relative w-36 h-36'>
              <Image
                src={data.company.logo.src}
                alt='Profile'
                className='rounded-full object-cover'
                fill
              />
            </div>
            <div className='max-w-[600px]'>
              <CardTitle className='text-xl font-bold text-green-800 mb-3'>
                {data.company.companyName || 'Fullname'}
              </CardTitle>
              <CardDescription className='text-sm text-gray-500'>
                {data.company.bio || 'about me'}
              </CardDescription>
            </div>
          </div>
          {data.company.isVerified ? (
            <StatusVerifikasi type={'verified'} />
          ) : checkIsWaiting ? (
            <div className='my-4 w-full flex flex-col gap-4'>
              <StatusVerifikasi type={'waiting'} />
              {errorMessage && <FormError message={errorMessage} />}
              {successMessage && <FormSuccess message={successMessage} />}
            </div>
          ) : (
            <>
              <StatusVerifikasi type={''} />
              <Button
                onClick={handleAjukan}
                className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition-colors mt-2'
              >
                Ajukan Verifikasi
              </Button>
            </>
          )}
        </CardHeader>
      </Card>
      <div className='mb-6 flex justify-end'>
  <Button
    onClick={() => signOut({ callbackUrl: '/' })}
    variant='destructive'
    className='text-sm font-semibold'
  >
    Logout
  </Button>
</div>
<Card className='mb-6'>
  <CardHeader>
    <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
      Informasi Pribadi
    </CardTitle>
  </CardHeader>
  <CardContent className='mb-3 text-sm font-semibold text-gray-800'>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Nama Lengkap:</span>
      <span className='text-gray-600'>{data.fullname || '-'}</span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Email:</span>
      <span className='text-gray-600'>{data.email || '-'}</span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Peran:</span>
      <span className='text-gray-600'>
        {data.role.toLowerCase() || '-'}
      </span>
    </div>
  </CardContent>
</Card>

<Card className='mb-6'>
  <CardHeader>
    <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
      Informasi Penyedia Kerja
    </CardTitle>
  </CardHeader>
  <CardContent className='mb-3 text-sm font-semibold text-gray-800'>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Nama Penyedia Kerja:</span>
      <span className='text-gray-600'>
        {data.company.companyName || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Industri:</span>
      <span className='text-gray-600'>
        {data.company.industry || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Status Kepemilikan:</span>
      <span className='text-gray-600'>
        {data.company.ownership || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Nomor Telepon:</span>
      <span className='text-gray-600'>{data.company.phone || '-'}</span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Nomor Telepon Penyedia Kerja:</span>
      <span className='text-gray-600'>
        {data.company.companyPhone || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Website Penyedia Kerja:</span>
      <span className='text-gray-600'>
        <a href={`https://${data.company.website}`}>
          {data.company.website || '-'}
        </a>
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Alamat Penyedia Kerja:</span>
      <span className='text-gray-600'>{data.company.address || '-'}</span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Kota:</span>
      <span className='text-gray-600'>{data.company.city || '-'}</span>
    </div>
  </CardContent>
</Card>

<Card className='mb-6'>
  <CardHeader>
    <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
      Dokumen Verifikasi
    </CardTitle>
  </CardHeader>
  <CardContent className='mb-3 text-sm font-semibold text-gray-800'>
    Tidak Ada Dokumen
  </CardContent>
</Card>

<CardFooter className='text-center pt-6 border-t'>
  <Link
    href={`/dashboard`}
    className='text-lg font-medium text-green-600 hover:text-green-700 hover:underline'
  >
    Kembali ke Dashboard
  </Link>
</CardFooter>
    </div>
  )
}

export default ProfileCompany
