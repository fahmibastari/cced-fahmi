// src/app/jobs/[id]/page.tsx

import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      company: {
        include: {
          logo: true,
        },
      },
      posterFile: true,
    },
  })

  if (!job) {
    notFound()
  }

  return <JobDetailPublic job={job} />
}

// ✅ Add this so Next.js knows this page is server-rendered
export const dynamic = 'force-dynamic'
