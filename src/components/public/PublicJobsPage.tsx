'use client'

import React, { useState, useEffect } from 'react'
import JobCardPublic from '@/components/dashboard/member/JobCardPublic'
import JobDetailPublic from '@/components/public/JobDetailPublic'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { motion } from 'framer-motion'


export interface JobWithCompany {
  posterFileId: null
  id: string
  companyId: string
  title: string
  description: string
  salary: string
  employmentType: string | null
  workTime: string | null
  requirements: string[]
  location: string | null
  deadline: string | Date
  status: string
  skills?: string[]
  type?: string
  createdAt?: Date
  updatedAt?: Date
  posterUrl?: string | null
  posterFile?: {
    src: string
  } | null
  company?: {
    companyName: string
    companyLogo?: string | null
    logo?: {
      src: string
    } | null
  }
}


interface PublicJobsPageProps {
  jobs: JobWithCompany[]
}

export default function PublicJobsPage({ jobs }: PublicJobsPageProps) {
  const [selectedJob, setSelectedJob] = useState<JobWithCompany | null>(
    Array.isArray(jobs) && jobs.length > 0 ? jobs[0] : null
  )
  

  const [tab, setTab] = useState<'list' | 'detail'>('list')
  const [isDesktop, setIsDesktop] = useState(false)

  const [tempFilterStatus, setTempFilterStatus] = useState<'semua' | 'aktif' | 'nonaktif'>('semua')
  const [tempSearchTerm, setTempSearchTerm] = useState('')

  const [filterStatus, setFilterStatus] = useState<'semua' | 'aktif' | 'nonaktif'>('semua')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const now = Date.now()
  const updatedJobs = jobs.map((job) => {
    const deadlineTime =
      typeof job.deadline === 'string'
        ? new Date(job.deadline).getTime()
        : job.deadline?.getTime()

    if (job.status.toLowerCase() === 'aktif' && deadlineTime && deadlineTime < now) {
      return { ...job, status: 'nonaktif' }
    }
    return job
  })

  const filteredJobs = updatedJobs.filter((job) => {
    const matchStatus =
      filterStatus === 'semua' ||
      (filterStatus === 'aktif' && job.status.toLowerCase() === 'aktif') ||
      (filterStatus === 'nonaktif' && job.status.toLowerCase() === 'nonaktif')

    const searchLower = searchTerm.toLowerCase()

    const matchSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchLower) ||
      job.company?.companyName.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower)

    return matchStatus && matchSearch
  })

  const applyFilters = () => {
    setFilterStatus(tempFilterStatus)
    setSearchTerm(tempSearchTerm)
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-green-900">Cari Lowongan Pekerjaan</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Temukan peluang kerja sesuai bidang dan minatmu dari mitra terbaik kami.
        </p>
      </div>

      {/* Mobile Tabs */}
      {!isDesktop && (
        <div className="flex mb-6 border rounded-md overflow-hidden">
          <button
            onClick={() => setTab('list')}
            className={`flex-1 py-2 text-sm font-medium ${
              tab === 'list' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Daftar Lowongan
          </button>
          <button
            onClick={() => setTab('detail')}
            disabled={!selectedJob}
            className={`flex-1 py-2 text-sm font-medium ${
              tab === 'detail'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600'
            } ${!selectedJob ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Detail Lowongan
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        {/* Status Buttons */}
        <div className="flex gap-2 flex-wrap">
          {['semua', 'aktif', 'nonaktif'].map((status) => (
            <button
              key={status}
              onClick={() => setTempFilterStatus(status as any)}
              className={`px-4 py-2 rounded-full border text-sm font-medium ${
                tempFilterStatus === status
                  ? 'bg-green-600 text-white'
                  : 'border-gray-300 text-gray-700'
              } hover:bg-green-600 hover:text-white transition`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="flex w-full md:w-auto max-w-xl items-center border rounded-full overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Cari judul, perusahaan, atau lokasi..."
            value={tempSearchTerm}
            onChange={(e) => setTempSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 text-sm focus:outline-none"
          />
          <button
            onClick={applyFilters}
            className="bg-green-600 text-white px-5 py-2 h-full hover:bg-green-700 transition"
          >
            Cari
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        {/* List */}
        {(tab === 'list' || isDesktop) && (
          <ScrollArea
            className={`w-full rounded-md px-4 shadow-sm border pt-4 ${
              isDesktop ? 'h-[600px]' : 'h-auto max-h-[60vh]'
            }`}
          >
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredJobs.map((job) => (
                    <div key={job.id} onClick={() => {
                      setSelectedJob(job)
                      if (!isDesktop) {
                        setTab('detail')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    className="cursor-pointer">
                      <JobCardPublic
                        jobId={job.id}
                        companyName={job.company?.companyName ?? '-'}
                        title={job.title}
                        location={job.location ?? '-'}
                        deadline={
                          job.deadline instanceof Date
                            ? job.deadline
                            : new Date(job.deadline)
                        }
                        salary={job.salary}
                        userId=""
                        onSelectJob={() => setSelectedJob(job)}
                        applyType={job.type?.trim() ? 'external' : 'internal'} 
                      />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-center text-gray-500 py-8">Tidak ada lowongan yang cocok.</p>
              )}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}

        {/* Detail */}
        {(tab === 'detail' || isDesktop) && (
          <ScrollArea
            className={`w-full rounded-md px-4 shadow-sm border ${
              isDesktop ? 'h-[600px]' : 'h-auto max-h-[60vh]'
            }`}
          >
            {selectedJob ? (
              <JobDetailPublic
              job={{
                ...selectedJob,
                deadline:
                  selectedJob.deadline instanceof Date
                    ? selectedJob.deadline
                    : new Date(selectedJob.deadline),
                requirements: selectedJob.requirements ?? [],
                skills: selectedJob.skills ?? [],
                type: selectedJob.type ?? '',
                createdAt: selectedJob.createdAt ?? new Date(),
                updatedAt: selectedJob.updatedAt ?? new Date(),
                posterUrl: selectedJob.posterUrl ?? null,
                posterFile: selectedJob.posterFile ?? null,
                posterFileId: selectedJob.posterFileId ?? null,

              }}
              
              />
            ) : (
              <p className="text-center text-gray-500 py-12">Pilih lowongan untuk melihat detail.</p>
            )}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
