import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'

// 1. Tambahkan tipe `PageProps` untuk `params`
interface PageProps {
  params: { id: string };  // Menjelaskan bahwa `params` memiliki field `id` dengan tipe string
}

// 2. Pastikan fungsi `JobDetailPage` menerima tipe `PageProps`
export default async function JobDetailPage({ params }: PageProps): Promise<JSX.Element> {
  const { id } = params

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      company: {
        include: {
          logo: true,
        },
      },
      posterFile: true, // ✅ PENTING: Tambahkan ini!
    },
  })
  

  if (!job || job.status !== 'aktif') return notFound()

  return (
    <main className="min-h-screen bg-white text-gray-800 px-4">
      <JobDetailPublic job={job} />
    </main>
  )
}
