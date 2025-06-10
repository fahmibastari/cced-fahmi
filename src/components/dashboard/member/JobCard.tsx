'use client'

import { useState } from 'react'
import Link from 'next/link'
import { applyJob } from '@/actions/member-action'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Loader2, AlertTriangle, CheckCircle } from 'lucide-react'

interface JobCardProps {
  jobId: string
  userId: string
  companyLogo?: string
  companyName: string
  title: string
  location: string
  deadline: Date
  salary?: string
  applyType?: 'internal' | 'external'
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
  applyType = 'internal', 
  onSelectJob,
}: JobCardProps) => {
  const [isApplying, setIsApplying] = useState(false)
  const [applyError, setApplyError] = useState<string | null>(null)
  const [applySuccess, setApplySuccess] = useState<string | null>(null)
  const isExpired = deadline.getTime() < Date.now()


  const handleApply = async () => {
    setApplyError(null)
    setApplySuccess(null)
    setIsApplying(true)
    try {
      const res = await applyJob(jobId, userId, { resumeMember: '' }) // ubah jika pakai resumeId
      if (res.success) {
        setApplySuccess('Lamaran berhasil dikirim!')
        setTimeout(() => setApplySuccess(null), 3000)
      } else {
        setApplyError(res.error || 'Gagal mengirim lamaran')
        setTimeout(() => setApplyError(null), 3000)
      }
    } catch (err) {
      setApplyError('Terjadi kesalahan saat mengirim lamaran')
      setTimeout(() => setApplyError(null), 3000)
    } finally {
      setIsApplying(false)
    }
  }

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

      <CardHeader className="relative flex flex-col space-y-1 pb-2">
        <div className="flex items-center space-x-3 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={companyLogo || '/default-logo.png'}
              alt={`${companyName} logo`}
              onError={(e) => {
                e.currentTarget.src = '/default-logo.png'
              }}
            />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>

        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        <div className="text-sm text-gray-600 mb-2">{companyName}</div>
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

          {!isExpired && applyType !== 'external' && (
  <Button
    onClick={handleApply}
    size="sm"
    variant="secondary"
    disabled={isApplying}
    className="whitespace-nowrap flex items-center gap-2"
  >
    {isApplying ? (
      <>
        <Loader2 className="animate-spin h-4 w-4" /> Mengirim...
      </>
    ) : (
      'Lamar Cepat'
    )}
  </Button>
)}

        </div>

        {/* Pesan Status */}
        {(applyError || applySuccess) && (
  <div
    className={`flex items-start gap-2 mt-3 rounded-md p-3 text-sm font-medium shadow-sm border ${
      applyError
        ? 'bg-red-50 text-red-700 border-red-200'
        : 'bg-green-50 text-green-700 border-green-200'
    }`}
  >
    <div className="pt-0.5">
      {applyError ? (
        <AlertTriangle className="h-5 w-5 text-red-600" />
      ) : (
        <CheckCircle className="h-5 w-5 text-green-600" />
      )}
    </div>
    <span>{applyError || applySuccess}</span>
  </div>
)}

      </CardContent>
    </Card>
  )
}

export default JobCard
