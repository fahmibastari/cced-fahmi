import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'


// jangan define PageProps sendiri — biarkan inference native NextJS
export default async function Page({ params }: any) {
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


// wajib define ini di dynamic route
export async function generateStaticParams() {
  return []
}
