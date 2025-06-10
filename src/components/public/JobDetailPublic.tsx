'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Job, Company } from '@prisma/client'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface JobDetailPublicProps {
  job: Job & {
    posterUrl?: string | null
    posterFile?: {
      src: string
    } | null
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
    <Card className="mx-auto w-full max-w-3xl rounded-lg bg-white shadow-xl my-10 px-6">
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
        <Button
  variant="outline"
  className="w-full max-w-xs mx-auto flex justify-center items-center gap-2"
  onClick={() => {
    // Ambil URL halaman saat ini (akan jadi link share)
    const jobUrl = typeof window !== 'undefined' ? window.location.href : ''

    const shareText = `Cek lowongan kerja di *${job.company?.companyName ?? 'Perusahaan'}*: "${job.title}"\n\n${jobUrl}`
const waLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`


    // Buka di tab baru
    window.open(waLink, '_blank')
  }}
>
  {/* Icon WhatsApp bawaan */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-5 h-5 text-green-600"
  >
    <path d="M20.52 3.48a11.85 11.85 0 0 0-16.76 0 11.83 11.83 0 0 0-2.43 13.1L.23 22.27a1 1 0 0 0 1.25 1.25l5.69-1.1a11.85 11.85 0 0 0 13.1-2.44 11.85 11.85 0 0 0 0-16.76zm-8.8 15.5a9.19 9.19 0 0 1-4.67-1.28l-.34-.2-3.37.65.65-3.37-.2-.34a9.23 9.23 0 1 1 8 4.54zm5.08-6.89c-.28-.14-1.66-.82-1.91-.91s-.45-.14-.64.14-.73.91-.9 1.09-.33.21-.61.07a7.41 7.41 0 0 1-2.2-1.36 8.3 8.3 0 0 1-1.53-1.89c-.16-.27 0-.41.12-.56.13-.13.28-.34.42-.5s.18-.28.28-.46a.5.5 0 0 0 0-.49c-.14-.14-.65-1.56-.89-2.14s-.47-.5-.65-.5h-.55a1.06 1.06 0 0 0-.77.36 3.24 3.24 0 0 0-1 2.39 5.63 5.63 0 0 0 1.19 2.74 12.55 12.55 0 0 0 4.82 4.37c1.79.75 2.49.82 3.39.69a2.8 2.8 0 0 0 1.87-1.31 2.28 2.28 0 0 0 .16-1.31c-.07-.13-.25-.2-.53-.33z" />
  </svg>
  Bagikan ke WhatsApp
</Button>

      </CardHeader>
      {job.posterUrl ? (
  <div className="my-4 rounded-lg overflow-hidden shadow-sm">
    <img
      src={job.posterUrl}
      alt="Poster Lowongan"
      className="w-full max-h-[400px] object-contain"
    />
  </div>
) : job.posterFile?.src ? (
  <div className="my-4 rounded-lg overflow-hidden shadow-sm">
    <img
      src={job.posterFile.src}
      alt="Poster Lowongan"
      className="w-full max-h-[400px] object-contain"
    />
  </div>
) : null}

      <CardContent className="pt-8 space-y-8">
      
<section>
  <h3 className="mb-3 text-lg font-semibold text-gray-800">Deskripsi Pekerjaan</h3>
  <div className="prose prose-sm max-w-none text-gray-700">
    <ReactMarkdown>
    {job.description ?? '-'}
    </ReactMarkdown>
  </div>
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
          {(job.requirements ?? []).length > 0 ? (
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
          {/* <Link href="/login" passHref>
            <Button className="w-full max-w-xs mx-auto">Login untuk Melamar</Button>
          </Link> */}
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
