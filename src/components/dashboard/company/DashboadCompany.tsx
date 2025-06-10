'use client'

import { useState } from 'react'
import { Job } from '@prisma/client'
import { deleteJob } from '@/actions/company-action'
import Search from './Search'
import NavMenu from './NavMenu'
import JobCard from './JobCard'
import DataNotFound from './DataNotFound'

interface DashboardCompanyProps {
  jobs: Job[]
}

const DashboardCompany = ({ jobs }: DashboardCompanyProps) => {
  const [jobsData, setJobsData] = useState<Job[]>(jobs)
  const [filter, setFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleClickDelete = async (id: string) => {
    const updatedJobs = jobsData.filter((job) => job.id !== id)
    setJobsData(updatedJobs)
    await deleteJob(id)
  }

  const applyFilter = () => {
    const now = Date.now()

    const updatedJobs = jobsData.map((job) => {
      const deadlineTime =
        typeof job.deadline === 'string'
          ? new Date(job.deadline).getTime()
          : job.deadline?.getTime()

      if (job.status === 'aktif' && deadlineTime && deadlineTime < now) {
        return { ...job, status: 'nonaktif' }
      }
      return job
    })

    return updatedJobs.filter((job) => {
      const matchStatus =
        filter === 'all' || job.status === filter

        const matchSearch =
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.status ?? '').toLowerCase().includes(searchTerm.toLowerCase())
      


      return matchStatus && matchSearch
    })
  }

  const jobsDataFiltered = applyFilter()

  return (
    <div className="min-h-screen bg-white">
      <hr className="h-[2px] w-full bg-gray-200" />
      <div className="py-6 px-4 max-w-7xl mx-auto">
        <div className="mb-4">
          {/* Input Search */}
          <input
            type="text"
            placeholder="Cari berdasarkan judul, lokasi, atau status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-96 border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Filter Menu */}
        <NavMenu
          handleClickAll={() => setFilter('all')}
          handleClickActive={() => setFilter('aktif')}
          handleClickNonActive={() => setFilter('nonaktif')}
          handleClickDone={() => setFilter('selesai')}
          handleClickDraft={() => setFilter('draft')}
        />

        {/* Job List */}
        <div className="mt-6">
          {jobsDataFiltered.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {jobsDataFiltered.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  location={job.location || ''}
                  createdAt={job.createdAt.toLocaleDateString('id-ID')}
                  status={job.status || ''}
                  jobApplication={(job as any).jobApplication || []}
                  handleDelete={() => handleClickDelete(job.id)}
                  applyType={job.type?.trim() ? 'external' : 'internal'} // ← ini penting
                />
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <DataNotFound />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardCompany
