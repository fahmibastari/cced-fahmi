'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getJob } from '@/actions/company-action'
import { JobApplication } from '@prisma/client'
import ListDetailAplicants from './list-detail-aplicants'
import ExcelJS from 'exceljs'
import ReactMarkdown from 'react-markdown'


const DetailJob = () => {
  const token = useSearchParams().get('token')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [detailData, setDetailData] = useState<any>()

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (token) {
        const response = await getJob(token)
        if (response?.data) {
          const job = response.data
          setDetailData(job)
          console.log(job.jobApplication)
        }
      }
    }
    fetchAndSetData()
  }, [token])

  const sanitizeFileName = (name: string) =>
    name.replace(/[/\\?%*:|"<>]/g, '-')

  const handleDownloadExcel = async () => {
    if (!detailData?.jobApplication?.length) return
  
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Applicants')
  
    // Define columns with headers and widths
    sheet.columns = [
      { header: 'Fullname', key: 'fullname', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'NIM', key: 'nim', width: 15 },
      { header: 'Phone', key: 'phone', width: 20 },
      { header: 'Address', key: 'address', width: 40 },
      { header: 'City', key: 'city', width: 20 },
      { header: 'Birth Date', key: 'birthDate', width: 15 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Study Level', key: 'studyLevel', width: 15 }, // ✅ NEW
      { header: 'Major', key: 'major', width: 25 },             // ✅ NEW
      { header: 'About', key: 'about', width: 30 },
      { header: 'Skills', key: 'skills', width: 40 },
      { header: 'Interests', key: 'interests', width: 30 },
      { header: 'Resume', key: 'resume', width: 30 },
      { header: 'Notes', key: 'notes', width: 30 },
    ]
  
    // Add rows from job applications
    detailData.jobApplication.forEach((app: any) => {
      const member = app.member
      sheet.addRow({
        fullname: member?.user?.fullname || '',
        email: member?.user?.email || '',
        nim: member?.nim || '',
        phone: member?.phone || '',
        address: member?.address || '',
        city: member?.city || '',
        birthDate: member?.birthDate
          ? new Date(member.birthDate).toLocaleDateString()
          : '',
        gender: member?.gender || '',
        studyLevel: member?.studyLevel || '', // ✅ NEW
        major: member?.major || '',           // ✅ NEW
        about: member?.about || '',
        skills: member?.skills?.join(', ') || '',
        interests: member?.interests?.join(', ') || '',
        resume: member?.resume || '',
        notes: app?.notes || '',
      })
    })
  
    // Style header row
    sheet.getRow(1).font = { bold: true }
    sheet.getRow(1).alignment = { horizontal: 'center' }
  
    // Wrap long columns
    const wrapColumns = [
      'address',
      'about',
      'skills',
      'interests',
      'notes',
      'major',
    ]
    wrapColumns.forEach((key) => {
      sheet.getColumn(key).alignment = { wrapText: true }
    })
  
    // Generate file and trigger download
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const fileName = detailData?.title
      ? `${sanitizeFileName(detailData.title)}.xlsx`
      : 'applicants.xlsx'
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  }
  

  return (
    <Card className="mx-auto my-12 w-full max-w-3xl rounded-lg bg-white shadow-xl">
      <CardHeader className="text-center space-y-3 pb-8 border-b">
        <CardTitle className="text-4xl font-bold text-green-800">
          {detailData?.title || 'Title'}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Dibuat oleh : {detailData?.company?.companyName || 'Penyedia Kerja'}
        </CardDescription>
      </CardHeader>
      {detailData?.posterUrl ? (
  <div className="w-full max-w-3xl mx-auto mt-4 px-6">
    <img
      src={detailData.posterUrl}
      alt="Poster Lowongan"
      className="w-full max-h-[400px] object-contain rounded-md shadow-sm"
    />
  </div>
) : detailData?.posterFile?.src ? (
  <div className="w-full max-w-3xl mx-auto mt-4 px-6">
    <img
      src={detailData.posterFile.src}
      alt="Poster Lowongan"
      className="w-full max-h-[400px] object-contain rounded-md shadow-sm"
    />
  </div>
) : null}

      <CardContent className="pt-8">
        <div className="space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <div className="space-y-6">
          <section>
  <h3 className="mb-3 text-lg font-semibold text-gray-800">Deskripsi Pekerjaan</h3>
  <div className="prose prose-sm max-w-none text-gray-700">
    <ReactMarkdown>
      {detailData?.description || 'Deskripsi belum tersedia'}
    </ReactMarkdown>
  </div>
</section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">
                Gaji Pekerjaan
              </h3>
              <p className="text-gray-600">{detailData?.salary || 'Deskripsi'}</p>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Lokasi</h3>
              <p className="text-gray-600">{detailData?.location || 'Lokasi'}</p>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">
                Status Pegawai
              </h3>
              <p className="text-gray-600">{detailData?.employmentType ?? '-'}</p>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Waktu Kerja</h3>
              <p className="text-gray-600">{detailData?.workTime ?? '-'}</p>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Persyaratan</h3>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                {detailData?.requirements ? (
                  detailData.requirements.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <p>Tidak ada persyaratan</p>
                )}
              </ul>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Keahlian</h3>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                {detailData?.skills ? (
                  detailData.skills.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <p>Tidak ada Keahlian</p>
                )}
              </ul>
            </section>

            {detailData?.type && (
              <section>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Link Lamaran Eksternal
                </h3>
                <a
                  href={
                    detailData?.type
                      ? detailData?.type.startsWith('http')
                        ? detailData?.type
                        : `http://${detailData?.type}`
                      : '#'
                  }
                  className="text-gray-600"
                >
                  {detailData?.type || 'Link Eksternal Lamaran'}
                </a>
              </section>
            )}

            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Tenggat Waktu</h3>
              <p className="text-gray-600">
                {detailData?.deadline?.toLocaleDateString('id-ID') || 'Deadline'}
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Status</h3>
              <p className="text-gray-600">{detailData?.status || 'Tidak ada status'}</p>
            </section>

            <button
              onClick={handleDownloadExcel}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Download Excel
            </button>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Pelamar</h3>
              {detailData?.jobApplication?.length > 0 ? (
                detailData.jobApplication.map(
                  (data: JobApplication, index: number) => (
                    <ListDetailAplicants key={data.id} data={data} index={index} />
                  )
                )
              ) : (
                <p>Tidak ada pelamar</p>
              )}
            </section>
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-center pt-6 border-t">
        <Link
          href="/dashboard"
          className="text-lg font-medium text-green-600 hover:text-green-700 hover:underline"
        >
          Kembali ke dashboard
        </Link>
      </CardFooter>
    </Card>
  )
}

export default DetailJob
