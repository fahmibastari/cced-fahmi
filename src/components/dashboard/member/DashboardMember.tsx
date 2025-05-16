'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import JobCard from './JobCard'
import JobDetail from './JobDetail'
import React, { useState, useEffect } from 'react'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface Job {
  id: string
  companyLogoUrl?: string
  companyName: string
  title: string
  location: string
  deadline: Date
  salary?: string
}

interface DashboardMemberProps {
  jobs: Job[]
  user: User
}

export default function DashboardMember({ jobs, user }: DashboardMemberProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] || null)
  const [tab, setTab] = useState<'list' | 'detail'>('list')
  const [isDesktop, setIsDesktop] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Cek apakah viewport desktop
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job)
    setTab('detail')
  }

  const handleQuickApply = () => {
    if (!selectedJob) return
    router.push(`/member/apply-job?token=${selectedJob.id}&user=${user.id}`)
  }

  return (
    <div className="container mx-auto max-w-7xl p-4">
      {/* Tabs untuk mobile */}
      {!isDesktop && (
        <div className="flex mb-4">
          <button
            onClick={() => setTab('list')}
            className={`flex-1 py-2 text-center border-b-2 ${
              tab === 'list' ? 'border-green-600 text-green-600' : 'border-transparent'
            }`}
          >
            Daftar Lowongan
          </button>
          <button
            onClick={() => setTab('detail')}
            disabled={!selectedJob}
            className={`flex-1 py-2 text-center border-b-2 ${
              tab === 'detail' ? 'border-green-600 text-green-600' : 'border-transparent'
            } ${!selectedJob ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Detail Lowongan
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Job List */}
        {(tab === 'list' || isDesktop) && (
          <ScrollArea
            className={`w-full rounded-md px-4 shadow-sm mb-4 ${
              isDesktop ? 'h-[600px]' : 'h-auto max-h-[60vh]'
            }`}
          >
            <div className="space-y-4">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    jobId={job.id}
                    userId={user.id}
                    companyLogo={job.companyLogoUrl}
                    companyName={job.companyName}
                    title={job.title}
                    location={job.location}
                    deadline={job.deadline}
                    salary={job.salary}
                    onSelectJob={() => handleSelectJob(job)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">Tidak ada lowongan</p>
              )}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}

        {/* Job Detail */}
        {(tab === 'detail' || isDesktop) && (
          <ScrollArea
            className={`w-full rounded-md px-4 shadow-sm mb-4 ${
              isDesktop ? 'md:col-span-2 h-[600px]' : 'h-auto max-h-[60vh]'
            }`}
          >
            {selectedJob ? (
              <JobDetail detailData={selectedJob} onClickQuickApply={handleQuickApply} />
            ) : (
              <p className="text-center text-gray-500">Pilih lowongan untuk detail</p>
            )}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
