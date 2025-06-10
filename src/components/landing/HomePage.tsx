import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '../ui/button'
import HomePageClient from './HomePageClient'

export default async function HomePage() {
  const session = await auth()

  // Query lowongan aktif + relasi perusahaan
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
    include: {
      company: {
        select: {
          companyName: true,
          logo: {
            select: {
              src: true
            }
          }
        }
      }
    }
  })

  // Ubah struktur agar cocok dengan props <HomePageClient />
  const jobData = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    location: job.location ?? '',
    deadline: job.deadline as Date,
    salary: job.salary ?? '',
    type: job.type ?? '',
    companyName: job.company?.companyName ?? '-',
    companyLogo: job.company?.logo?.src ?? '',
  }))
  

  

  const lihatSemuaHref = session?.user?.role === 'MEMBER' ? '/dashboard' : '/jobs'

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Teks */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 tracking-tight mb-5">
              Temukan Karier Impianmu di Sini
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Unit Pelaksana Akademik Karier dan Kewirausahaan Universitas Lampung hadir untuk
              membantumu menemukan peluang kerja terbaik — cepat, mudah, dan relevan.
            </p>
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href={lihatSemuaHref}>Lihat Lowongan</Link>
              </Button>
              {!session && (
                <Button asChild variant="outline" size="lg">
                  <Link href="/register">Gabung Sekarang</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Ilustrasi */}
        <div className="flex-1 max-w-md">
          <img
            src="/hero-career.svg"
            alt="Ilustrasi Karier"
            className="w-full h-auto max-h-[320px] lg:max-h-[400px] object-contain mx-auto"
          />
        </div>

        </div>
      </section>

      {/* Lowongan Terbaru */}
      <HomePageClient jobs={jobData} />


      {/* CTA */}
      <div className="text-center mt-10 mb-20">
        <Button asChild size="lg">
          <Link href={lihatSemuaHref}>Lihat Semua Lowongan</Link>
        </Button>
      </div>
    </div>
  )
}
