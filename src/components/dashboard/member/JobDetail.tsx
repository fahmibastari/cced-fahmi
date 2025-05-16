/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Share2, User } from 'lucide-react'

interface JobDetailProps {
  detailData: any
  onClickQuickApply: () => void
}

const JobDetail = ({ detailData, onClickQuickApply }: JobDetailProps) => {
  return (
    <Card className="mx-auto w-full max-w-3xl rounded-lg bg-white shadow-xl h-full flex flex-col">
      <CardHeader className="border-b pb-6 px-4 sm:px-6 md:px-8">
  <div className="flex items-center justify-between flex-wrap gap-4">
    {/* Judul dan Logo */}
    <div className="flex items-center gap-4 flex-grow min-w-0 max-w-full">
      <Avatar className="h-16 w-16 flex-shrink-0">
        <AvatarImage
          src={detailData?.company?.logo?.src || '/default-logo.png'}
          alt={`${detailData?.company?.companyName || 'Logo'} Logo`}
          className="object-contain"
        />
        <AvatarFallback>
          <User className="h-10 w-10" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col truncate min-w-0 max-w-[calc(100vw-112px)]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 truncate leading-tight">
          {detailData?.title}
        </h2>
        <p className="text-sm text-gray-500 truncate">
          Dibuat oleh: {detailData?.company?.companyName || 'Penyedia Kerja'}
        </p>
      </div>
    </div>

    {/* Tombol */}
    <div className="flex items-center gap-3 flex-shrink-0">
    <Button
  variant="ghost"
  size="icon"
  aria-label="Share lowongan"
  onClick={() => {
    if (navigator.share) {
      navigator.share({
        title: detailData.title,
        text: 'Cek lowongan kerja ini!',
        url: window.location.href,
      }).catch(console.error)
    } else {
      alert('Fitur share tidak didukung di browser ini.')
    }
  }}
>
  <Share2 className="h-5 w-5" />
</Button>

      <Button
        onClick={onClickQuickApply}
        size="sm"
        className="whitespace-nowrap"
      >
        Lamar Cepat
      </Button>
    </div>
  </div>
</CardHeader>


      <CardContent className="pt-8 overflow-auto flex-grow">
        <div className="space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
          {/* Deskripsi */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Deskripsi Pekerjaan</h3>
            <p className="text-gray-600 whitespace-pre-wrap">
              {detailData?.description || 'Deskripsi belum tersedia'}
            </p>
          </section>

          {/* Gaji */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Gaji Pekerjaan</h3>
            <p className="text-gray-600">{detailData?.salary || '-'}</p>
          </section>

          {/* Status Pegawai */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Status Pegawai</h3>
            <p className="text-gray-600">{detailData?.employmentType || '-'}</p>
          </section>

          {/* Waktu Kerja */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Waktu Kerja</h3>
            <p className="text-gray-600">{detailData?.workTime || '-'}</p>
          </section>

          {/* Lokasi */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Lokasi</h3>
            <p className="text-gray-600">{detailData?.location || '-'}</p>
          </section>

          {/* Persyaratan */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Persyaratan</h3>
            {detailData?.requirements?.length ? (
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                {detailData.requirements.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Tidak ada persyaratan</p>
            )}
          </section>

          {/* Skills */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Skills</h3>
            {detailData?.skills?.length ? (
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                {detailData.skills.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Tidak ada skills</p>
            )}
          </section>

          {/* Link Lamaran Eksternal */}
          {detailData?.type && (
            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Link Lamaran Eksternal</h3>
              <a
                href={detailData.type.startsWith('http') ? detailData.type : `http://${detailData.type}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline hover:text-green-900"
              >
                {detailData.type}
              </a>
            </section>
          )}

          {/* Deadline */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Deadline</h3>
            <p className="text-gray-600">
              {detailData?.deadline
                ? new Date(detailData.deadline).toLocaleDateString('id-ID')
                : '-'}
            </p>
          </section>

          {/* Status */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Status</h3>
            <p className="text-gray-600">{detailData?.status || '-'}</p>
          </section>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobDetail
