import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'

// ✅ gunakan type di luar function
type Params = {
  id: string
}

export default async function JobDetailPage({
  params,
}: {
  params: Params
}) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      company: {
        include: {
          logo: true,
        },
      },
      posterFile: true,
    },
  })

  if (!job) notFound()

  return <JobDetailPublic job={job} />
}
