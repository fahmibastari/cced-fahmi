'use client'

import { useState } from 'react'
import { type Article, type News } from '@prisma/client'
import { motion } from 'framer-motion'
import CardBig from '../blog/utils/CardBig'
import CardSmall from '../blog/utils/CardSmall'
import ArticleModal from '../blog/utils/ArticleModal'
import JobCardPublic from '../dashboard/member/JobCardPublic'

interface Job {
  id: string
  companyLogo?: string
  companyName: string
  title: string
  location: string | null
  deadline: Date | string
  salary?: string
  type?: string;
}


interface Props {
  jobs: Job[]
}

const HomePageClient = ({ jobs }: Props) => {
  const [modalData, setModalData] = useState<
    (News | Article) & { type: 'news' | 'article' } | null
  >(null)

  const handleCloseModal = () => setModalData(null)

  const sanitizeImageUrl = (url?: string) =>
    typeof url === 'string' && url.startsWith('blob:') ? '' : url || ''

  return (
    <section id="lowongan" className="py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {jobs.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <JobCardPublic
                  jobId={job.id}
                  companyLogo={sanitizeImageUrl(job.companyLogo)}
                  companyName={job.companyName}
                  title={job.title}
                  location={job.location ?? ''}
                  deadline={new Date(job.deadline)}
                  salary={job.salary}
                  userId=""
                  onSelectJob={() => {}}
                  applyType={job.type?.trim() ? 'external' : 'internal'} 
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Belum ada lowongan aktif.
          </motion.p>
        )}
      </div>
    </section>
  )
}

export default HomePageClient
