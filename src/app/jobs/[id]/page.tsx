import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'
import { type Metadata, type ResolvingMetadata } from 'next'


interface PageProps {
  params: { id: string }
  // optionally add: searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function JobDetailPage({ params }: PageProps): Promise<JSX.Element> {
  const { id } = params;

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
