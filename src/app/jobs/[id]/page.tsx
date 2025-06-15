import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'

type JobDetailPageProps = {
  params: {
    id: string
  }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
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
