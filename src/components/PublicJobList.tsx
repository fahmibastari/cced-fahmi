'use client'

import JobCardPublic from './dashboard/member/JobCardPublic'


interface PublicJobListProps {
  jobs: {
    id: string
    companyLogo?: string
    companyName: string
    title: string
    location: string
    deadline: Date
    salary?: string
  }[]
}

const PublicJobList = ({ jobs }: PublicJobListProps) => {
  if (!jobs || jobs.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Belum ada lowongan tersedia.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <JobCardPublic
        key={job.id}
        jobId={job.id}
        companyLogo={job.companyLogo}
        companyName={job.companyName}
        title={job.title}
        location={job.location}
        deadline={new Date(job.deadline)}
        salary={job.salary}
      />      
      ))}
    </div>
  )
}

export default PublicJobList
