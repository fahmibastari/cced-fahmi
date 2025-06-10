import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'

// Definisikan `params` dengan tipe yang sesuai
export default async function JobDetailPage({ params }: { params: { id: string } }): Promise<JSX.Element> {
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

  if (!job) {
    notFound(); // Menangani jika data tidak ditemukan
  }

  return (
    <JobDetailPublic job={job} />
  );
}
