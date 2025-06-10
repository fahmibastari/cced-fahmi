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
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'

interface ProfileMemberProps {
  data: any
}

const mapMemberType = (type: string | undefined) => {
  switch (type?.toUpperCase()) {
    case 'ALUMNI_UNILA':
      return 'Alumni UNILA'
    case 'MAHASISWA_UNILA':
      return 'Mahasiswa UNILA'
    case 'ALUMNI_NON_UNILA':
      return 'Alumni Non UNILA'
    case 'MAHASISWA_NON_UNILA':
      return 'Mahasiswa Non UNILA'
    default:
      return type || '-'
  }
}

const mapGender = (gender: string | undefined) => {
  switch (gender?.toLowerCase()) {
    case 'male':
    case 'laki-laki':
      return 'Laki-laki'
    case 'female':
    case 'perempuan':
      return 'Perempuan'
    default:
      return gender || '-'
  }
}

const getAge = (birthDate: string | Date): number => {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

const ProfileMember = ({ data }: ProfileMemberProps) => {
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card className='mb-6'>
        <CardHeader>
          <div className='flex items-center gap-6'>
            <div className='relative w-36 h-36'>
              <Image
                src={data?.image?.src || '/default-thumbnail.jpg'}
                alt='Profile'
                className='rounded-full object-cover'
                fill
              />
            </div>
            <div className='max-w-[600px]'>
              <CardTitle className='text-xl font-bold text-green-800 mb-3'>
                {data.fullname || 'Nama Lengkap'}
              </CardTitle>
              <CardDescription className='text-sm text-gray-500'>
                {data.member?.about || 'Tentang Saya'}
              </CardDescription>
            </div>
          </div>
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
            Informasi Personal
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
              {data.role?.toLowerCase() || '-'}
            </span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Status:</span>
            <span className='text-gray-600'>
              {mapMemberType(data.member?.memberType)}
            </span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>NPM Unila:</span>
            <span className='text-gray-600'>{data.member?.nim || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
  <span className='text-gray-900'>Jenjang Studi:</span>
  <span className='text-gray-600'>{data.member?.studyLevel || '-'}</span>
</div>
<div className='flex items-center gap-3 mb-2'>
  <span className='text-gray-900'>Jurusan:</span>
  <span className='text-gray-600'>{data.member?.major || '-'}</span>
</div>

          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Nomor Telepon:</span>
            <span className='text-gray-600'>{data.member?.phone || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Alamat:</span>
            <span className='text-gray-600'>{data.member?.address || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Kota:</span>
            <span className='text-gray-600'>{data.member?.city || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Tanggal Lahir:</span>
            <span className='text-gray-600'>
              {data.member?.birthDate
                ? `${new Date(data.member.birthDate).toLocaleDateString(
                    'id-ID'
                  )} (${getAge(data.member.birthDate)} tahun)`
                : '-'}
            </span>
          </div>

          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Jenis Kelamin:</span>
            <span className='text-gray-600'>{mapGender(data.member?.gender)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className='mb-6'>
  <CardHeader>
    <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
      Pekerjaan yang Dilamar
    </CardTitle>
  </CardHeader>
  <CardContent>
    {data.member?.jobApplication?.length > 0 ? (
      <ul className='list-disc space-y-2 pl-6 text-gray-700'>
        {data.member.jobApplication.map((jobApp: any, index: number) => (
          <li key={index}>
            <strong>{jobApp.job.title}</strong> di{' '}
            <span className='font-semibold text-gray-700'>
              {jobApp.job.company?.companyName || 'Nama Perusahaan'}
            </span>{' '}
            —{' '}
            <span className={`font-semibold ${jobApp.job.status === 'aktif' ? 'text-green-600' : 'text-red-600'}`}>
              {jobApp.job.status}
            </span>
          </li>
        ))}
      </ul>
    ) : (
      <p>Tidak ada pekerjaan yang dilamar</p>
    )}
  </CardContent>
</Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data?.member?.resume ? (
            <p>{data?.member?.resume}</p>
          ) : (
            <p>Belum melengkapi resume</p>
          )}
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Keahlian
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.member?.skills?.length > 0 ? (
            <ul className='list-disc space-y-2 pl-6 text-gray-700'>
              {data.member?.skills?.map((skill: string) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada keahlian</p>
          )}
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Ketertarikan
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.member?.interests?.length > 0 ? (
            <ul className='list-disc space-y-2 pl-6 text-gray-700'>
              {data.member?.interests?.map((interest: string) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada ketertarikan</p>
          )}
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

export default ProfileMember
