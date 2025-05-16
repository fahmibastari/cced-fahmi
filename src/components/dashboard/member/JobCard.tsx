'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import Link from 'next/link'

interface JobCardProps {
  jobId: string
  userId: string
  companyLogo?: string
  companyName: string
  title: string
  location: string
  deadline: Date
  salary?: string
  onSelectJob: () => void
}

const JobCard = ({
  jobId,
  userId,
  companyLogo,
  companyName,
  title,
  location,
  deadline,
  salary,
  onSelectJob,
}: JobCardProps) => {
  return (
    <Card
      className="relative mb-4 cursor-pointer focus:bg-gray-100 hover:shadow-md transition-shadow duration-200"
      onClick={onSelectJob}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelectJob()
        }
      }}
    >
      <CardHeader className="relative flex flex-col space-y-1 pb-2">
        <div className="flex items-center space-x-3 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={companyLogo} />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="text-sm text-gray-600">{companyName}</div>
        </div>

        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        <div className="text-sm text-gray-500">{location}</div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Deadline:{' '}
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
          <Button asChild variant="secondary" size="sm">
            <Link href={`/member/apply-job?token=${jobId}&user=${userId}`}>
              Lamar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCard