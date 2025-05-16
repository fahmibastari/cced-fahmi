import Link from 'next/link'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import HomePageClient from './HomePageClient'
import prisma from '@/lib/prisma'

export default async function HomePage() {
  const jobs = await prisma.job.findMany({
    where: {
      status: 'aktif',
      deadline: {
        gte: new Date(),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 9,
  })

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-green-800 mb-10 tracking-tight">
          Lowongan Terbaru
        </h2>
        <HomePageClient jobs={jobs} />
        {/* Jika kamu mau tombol lihat semua */}
        <div className="text-center">
          <Button asChild variant="default">
            <Link href="/login">Lihat Semua Lowongan</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
