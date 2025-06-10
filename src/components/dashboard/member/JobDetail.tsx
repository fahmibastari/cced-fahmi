  'use client'

  import { Button } from '@/components/ui/button'
  import { Card, CardContent, CardHeader } from '@/components/ui/card'
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
  import { Share2, User, Loader2, CheckCircle, AlertTriangle } from 'lucide-react'
  import { useState } from 'react'
  import { applyJob } from '@/actions/member-action'
  import ReactMarkdown from 'react-markdown'
  import remarkGfm from 'remark-gfm'

  interface JobDetailProps {
    detailData: any
    userId: string
    onClickQuickApply?: () => void  // optional, biar gak error kalau gak dipakai
  }

  const JobDetail = ({ detailData, userId }: JobDetailProps) => {
    const [isApplying, setIsApplying] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const isExternalApply = !!detailData?.type && detailData.type.trim() !== ''
    const isNonActive = detailData?.status?.toLowerCase() === 'nonaktif'

    const handleQuickApply = async () => {
      if (isExternalApply) return // safety: jangan proses apply jika eksternal

      setError(null)
      setSuccess(null)
      setIsApplying(true)
      try {
        const res = await applyJob(detailData.id, userId, { resumeMember: '' })
        if (res.success) {
          setSuccess('Lamaran berhasil dikirim')
          setTimeout(() => setSuccess(null), 5000)
        } else {
          setError(res.error || 'Gagal mengirim lamaran')
          setTimeout(() => setError(null), 5000)
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengirim lamaran')
        setTimeout(() => setError(null), 5000)
      } finally {
        setIsApplying(false)
      }
    }

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
    aria-label="Bagikan ke WhatsApp"
    onClick={() => {
      const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
      const text = `Cek lowongan kerja di *${detailData?.company?.companyName ?? 'Perusahaan'}*: "${detailData?.title}"\n\n${currentUrl}`
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(whatsappUrl, '_blank')
    }}
  >
    <Share2 className="h-5 w-5 text-green-700" />
  </Button>


        {!isNonActive && (
          <Button
            onClick={handleQuickApply}
            size="sm"
            disabled={isApplying || isExternalApply}
            className="whitespace-nowrap flex items-center gap-2"
            aria-busy={isApplying}
            aria-disabled={isApplying || isExternalApply}
            title={isExternalApply ? 'Lamaran eksternal aktif, gunakan link eksternal' : undefined}
          >
            {isApplying ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" /> Mengirim...
              </>
            ) : isExternalApply ? (
              'Eksternal'
            ) : (
              'Lamar Cepat'
            )}
          </Button>
        )}
      </div>
    </div>
  </CardHeader>
  {detailData.posterUrl ? (
  <img
    src={detailData.posterUrl}
    alt="Poster Lowongan"
    className="w-full max-h-[400px] object-contain rounded-md shadow-sm"
  />
) : detailData.posterFile?.src ? (
  <img
    src={detailData.posterFile.src}
    alt="Poster Lowongan"
    className="w-full max-h-[400px] object-contain rounded-md shadow-sm"
  />
) : (
  <p className="text-sm italic text-gray-400 text-center mt-2">
    Poster Tidak Dicantumkan
  </p>
)}

        <CardContent className="pt-8 overflow-auto flex-grow">
          <div className="space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
            {/* Error & Success Message */}
            {(error || success) && (
    <div
      className={`flex items-start gap-2 rounded-md p-3 text-sm font-medium shadow-sm border ${
        error
          ? 'bg-red-50 text-red-700 border-red-200'
          : 'bg-green-50 text-green-700 border-green-200'
      }`}
    >
      <div className="pt-0.5">
        {error ? (
          <AlertTriangle className="h-5 w-5 text-red-600" />
        ) : (
          <CheckCircle className="h-5 w-5 text-green-600" />
        )}
      </div>
      <span>{error || success}</span>
    </div>
  )}


            {/* Render berbeda jika nonaktif */}
            {isNonActive ? (
              <>
               <section>
  <h3 className="mb-3 text-lg font-semibold text-gray-800">Deskripsi Pekerjaan</h3>
  <div className="prose prose-sm max-w-none text-gray-700">
    <ReactMarkdown>
      {detailData?.description?.trim() || 'Deskripsi belum tersedia'}
    </ReactMarkdown>
  </div>
</section>


                <section>
                  <h3 className="mb-3 text-lg font-semibold text-gray-800">Deadline</h3>
                  <p className="text-gray-600">
                    {detailData?.deadline
                      ? new Date(detailData.deadline).toLocaleDateString('id-ID')
                      : '-'}
                  </p>
                </section>

                <section>
                  <h3 className="mb-3 text-lg font-semibold text-gray-800">Status Lowongan</h3>
                  <p className="text-red-600 font-semibold">Nonaktif</p>
                </section>
              </>
            ) : (
              <>
                {/* Semua detail pekerjaan seperti biasa */}
                <section>
  <h3 className="mb-3 text-lg font-semibold text-gray-800">Deskripsi Pekerjaan</h3>
  <div className="prose prose-sm max-w-none text-gray-700">
    <ReactMarkdown>
      {detailData?.description?.trim() || 'Deskripsi belum tersedia'}
    </ReactMarkdown>
  </div>
</section>


                <section>
                  <h3 className="mb-3 text-lg font-semibold text-gray-800">Gaji Pekerjaan</h3>
                  <p className="text-gray-600">{detailData?.salary || '-'}</p>
                </section>

                <section>
                  <h3 className="mb-3 text-lg font-semibold text-gray-800">Status Pegawai</h3>
                  <p className="text-gray-600">{detailData?.employmentType || '-'}</p>
                </section>

                <section>
                  <h3 className="mb-3 text-lg font-semibold text-gray-800">Waktu Kerja</h3>
                  <p className="text-gray-600">{detailData?.workTime || '-'}</p>
                </section>

                <section>
                  <h3 className="mb-3 text-lg font-semibold text-gray-800">Lokasi</h3>
                  <p className="text-gray-600">{detailData?.location || '-'}</p>
                </section>

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

                {detailData?.type && (
                  <section>
                    <h3 className="mb-3 text-lg font-semibold text-gray-800">Link Lamaran Eksternal</h3>
                    <a
                      href={
                        detailData.type.startsWith('http')
                          ? detailData.type
                          : `http://${detailData.type}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 underline hover:text-green-900"
                    >
                      {detailData.type}
                    </a>
                  </section>
                )}

                <section>
                  <h3 className="mb-3 text-lg font-semibold text-gray-800">Deadline</h3>
                  <p className="text-gray-600">
                    {detailData?.deadline
                      ? new Date(detailData.deadline).toLocaleDateString('id-ID')
                      : '-'}
                  </p>
                </section>

                <section>
                  <h3 className="mb-3 text-lg font-semibold text-gray-800">Status</h3>
                  <p className="text-gray-600">{detailData?.status || '-'}</p>
                </section>

                {/* Tombol Lamar Cepat */}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  export default JobDetail
