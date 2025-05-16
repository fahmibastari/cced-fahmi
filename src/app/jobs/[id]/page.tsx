import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'
import { Params } from 'next/dist/server/request/params'

interface Props {
  params: {
    id: string
  }
}
type PageProps = {
  params: Params & { id: string }
}

export default async function JobDetailPage({ params }: Props): Promise<JSX.Element> {
  const { id } = params

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      company: {
        include: { logo: true },
      },
    },
  })

  if (!job || job.status !== 'aktif') return notFound()

  return (
    <main className="min-h-screen bg-white text-gray-800 px-4">
      <JobDetailPublic job={job} />
    </main>
  )
}
