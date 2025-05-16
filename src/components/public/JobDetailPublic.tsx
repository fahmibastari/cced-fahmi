'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Job, Company } from '@prisma/client'
import Image from 'next/image'

interface JobDetailPublicProps {
  job: Job & {
    company?: {
      companyName: string
      companyLogo?: string | null
      logo?: {
        src: string
      } | null
    }
    employmentType?: string | null
    workTime?: string | null
  }
}



const JobDetailPublic = ({ job }: JobDetailPublicProps) => {
  return (
    <Card className="mx-auto w-full max-w-3xl rounded-lg bg-white shadow-xl my-10 px-6 py-8">
      <CardHeader className="text-center space-y-4 border-b pb-6">
        <div className="flex flex-col items-center space-y-4">
          {job.company?.logo?.src && (
            <div className="relative w-32 h-16">
              <Image
                src={job.company.logo.src}
                alt={`${job.company.companyName} Logo`}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 640px) 100vw, 128px"
                priority={false}
              />
            </div>
          )}
          <CardTitle className="text-3xl sm:text-4xl font-bold text-green-800 truncate max-w-full">
            {job.title}
          </CardTitle>
          <p className="text-sm text-gray-500 truncate max-w-full">
            Dibuat oleh: {job.company?.companyName ?? 'Penyedia Kerja'}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-8 space-y-8">
        {/* Deskripsi */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Deskripsi</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{job.description ?? '-'}</p>
        </section>

        {/* Gaji */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Gaji</h3>
          <p className="text-gray-600">{job.salary ?? '-'}</p>
        </section>

        {/* Lokasi */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Lokasi</h3>
          <p className="text-gray-600">{job.location ?? '-'}</p>
        </section>

        {/* Status Pegawai */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Status Pegawai</h3>
          <p className="text-gray-600">{job.employmentType ?? '-'}</p>
        </section>

        {/* Waktu Kerja */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Waktu Kerja</h3>
          <p className="text-gray-600">{job.workTime ?? '-'}</p>
        </section>

        {/* Persyaratan */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Persyaratan</h3>
          {job.requirements?.length ? (
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              {job.requirements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Tidak ada persyaratan</p>
          )}
        </section>

        {/* Keahlian */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Keahlian</h3>
          {job.skills?.length ? (
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              {job.skills.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Tidak ada keahlian</p>
          )}
        </section>

        {/* Link Lamaran Eksternal */}
        {job?.type && (
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Link Lamaran Eksternal</h3>
            <a
              href={job.type.startsWith('http') ? job.type : `http://${job.type}`}
              className="text-green-700 underline hover:text-green-900 break-words"
              target="_blank"
              rel="noopener noreferrer"
            >
              {job.type}
            </a>
          </section>
        )}

        {/* Deadline */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Tenggat Waktu</h3>
          <p className="text-gray-600">
            {job.deadline ? new Date(job.deadline).toLocaleDateString('id-ID') : '-'}
          </p>
        </section>

        {/* Tombol aksi */}
        <div className="text-center pt-6 space-y-4">
          <Link href="/login" passHref>
            <Button className="w-full max-w-xs mx-auto">Login untuk Melamar</Button>
          </Link>
          <Link href="/" passHref>
          <div>
          <Button variant="ghost" className="text-sm text-gray-600 hover:text-green-700">
              ← Kembali ke Beranda
            </Button>
          </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobDetailPublic
