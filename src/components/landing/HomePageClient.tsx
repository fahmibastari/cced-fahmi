'use client'

import { useState } from 'react'
import { type Article, type News } from '@prisma/client'
import CardBig from '../blog/utils/CardBig'
import CardSmall from '../blog/utils/CardSmall'
import ArticleModal from '../blog/utils/ArticleModal'
import JobCardPublic from '../dashboard/member/JobCardPublic'

interface Props {
  jobs: any[] // Disarankan bikin interface Job
}

const HomePageClient = ({ jobs }: Props) => {
  const [modalData, setModalData] = useState<
    (News | Article) & { type: 'news' | 'article' } | null
  >(null)

  const handleCloseModal = () => setModalData(null)

  const sanitizeImageUrl = (url?: string) =>
    typeof url === 'string' && url.startsWith('blob:') ? '' : url || ''
  

  return (
    <>
      {/* Lowongan Pekerjaan Section */}
      <section id="lowongan" className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCardPublic
                  key={job.id}
                  jobId={job.id}
                  companyLogo={sanitizeImageUrl(job.companyLogo)}
                  companyName={job.companyName}
                  title={job.title}
                  location={job.location}
                  deadline={new Date(job.deadline)}
                  salary={job.salary}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Belum ada lowongan aktif.</p>
          )}
        </div>
      </section>
    </>
  )
}

export default HomePageClient
