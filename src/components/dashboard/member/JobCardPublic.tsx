'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import Link from 'next/link'

interface JobCardPublicProps {
  jobId: string
  companyLogo?: string | null
  companyName: string
  title: string
  location: string
  deadline: Date
  salary?: string
}

const JobCardPublic = ({
  jobId,
  companyLogo,
  companyName,
  title,
  location,
  deadline,
  salary,
}: JobCardPublicProps) => {
  // Jika companyLogo berupa nama file (misal "logo.png"), tambahkan prefix /company-logos/
  // Jika sudah berupa URL lengkap (misal mulai http atau /), gunakan langsung
  const logoSrc =
  companyLogo && companyLogo.trim() !== ''
    ? companyLogo
    : '/default-logo.png'

  return (
    <Card className="relative mb-4 hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-col space-y-0 pb-2">
        <div className="mb-2 flex justify-between">
          <div className="flex items-center space-x-2">
            {/* <Avatar className="h-8 w-8">
              <AvatarImage
                src={logoSrc}
                alt={`${companyName} Logo`}
                className="object-contain"
              />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar> */}
            <div className="text-sm text-gray-500">{companyName}</div>
          </div>
        </div>

        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <div className="text-sm text-gray-600">{location}</div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Tenggat Waktu:{' '}
              <span className="font-medium text-gray-700">
                {deadline.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </p>
            {salary && (
              <p className="text-sm font-semibold text-green-700">{salary}</p>
            )}
          </div>
          <Button asChild variant="secondary">
            <Link href={`/jobs/${jobId}`}>Lihat Detail</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCardPublic
