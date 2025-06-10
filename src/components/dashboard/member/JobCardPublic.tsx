'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { type FC } from 'react'

interface JobCardPublicProps {
  jobId: string
  userId: string
  companyLogo?: string
  companyName: string
  title: string
  location: string
  deadline: Date
  salary?: string
  onSelectJob: () => void
  applyType?: 'internal' | 'external'
} 

const JobCardPublic = ({
  jobId,
  userId,
  companyLogo,
  companyName,
  title,
  location,
  deadline,
  salary,
  onSelectJob,
  applyType = 'internal',
}: JobCardPublicProps) => {
  
  const isExpired = deadline.getTime() < Date.now()
  return (
    <Card
      className="relative mb-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onSelectJob}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelectJob()
      }}
    >
      {/* Badge Apply Type */}
      <div
        className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm capitalize ${
          applyType === 'external'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}
      >
        {applyType}
      </div>
      <CardHeader className="flex flex-col space-y-0 pb-2">
        <div className="mb-2 flex justify-between">
          <div className="text-sm text-gray-500">{companyName}</div>
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
                {deadline?.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }) ?? '-'}
              </span>
            </p>
            {salary && (
              <p className="text-sm font-semibold text-green-700">{salary}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCardPublic
