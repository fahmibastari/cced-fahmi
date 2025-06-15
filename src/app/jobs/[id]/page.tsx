import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
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

// Tambahkan ini supaya dynamic route recognized oleh Next
export async function generateStaticParams() {
  return []
}
