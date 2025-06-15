import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'

type PageProps = {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      company: { include: { logo: true } },
      posterFile: true,
    },
  })

  if (!job) return notFound()

  return <JobDetailPublic job={job} />
}

export async function generateStaticParams() {
  return []
}
