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
import { getJob ,getDetailJobApplicant} from '@/actions/company-action'
import { JobApplication } from '@prisma/client'
import ListDetailAplicants from './list-detail-aplicants'



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
  const handleDownloadExcel = () => {
    const jobApplications = detailData.jobApplication;
  
    if (!Array.isArray(jobApplications) || jobApplications.length === 0) return;
  
    const rows = jobApplications.map((app) => {
      const member = app.member;
      return {
        fullname: member?.user?.fullname || '',
        email: member?.user?.email || '',
        nim: member?.nim || '',
        phone: member?.phone || '',
        address: member?.address || '',
        city: member?.city || '',
        birthDate: member?.birthDate ? new Date(member.birthDate).toISOString().split('T')[0] : '',
        gender: member?.gender || '',
        about: member?.about || '',
        skills: member?.skills?.join(', ') || '',
        interests: member?.interests?.join(', ') || '',
        resume: member?.resume || '',
        notes: app?.notes || '',
      };
    });
  
    const headers = Object.keys(rows[0]);
    const csvContent = [
      headers.join(','),
      ...rows.map((row: any) =>
        headers.map((key) => {
          const value = row[key];
          return typeof value === 'string' && (value.includes(',') || value.includes('"'))
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        }).join(',')
      )
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'all-applicants.csv');
    link.click();
  };
  
  return (
    <Card className='mx-auto my-12 w-full max-w-3xl rounded-lg bg-white shadow-xl'>
      <CardHeader className='text-center space-y-3 pb-8 border-b'>
        <CardTitle className='text-4xl font-bold text-green-800'>
          {detailData?.title || 'Title'}
        </CardTitle>
        <CardDescription className='text-sm text-gray-500'>
          Dibuat oleh : {detailData?.company?.companyName || 'Penyedia Kerja'}
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-8'>
        <div className='space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-6'>
          <div className='space-y-6'>
            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Deskripsi Pekerjaan
              </h3>
              <p className='text-gray-600 whitespace-pre-wrap'>
                {detailData?.description || 'Deskripsi'}
              </p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Gaji Pekerjaan
              </h3>
              <p className='text-gray-600'>
                {detailData?.salary || 'Deskripsi'}
              </p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Lokasi
              </h3>
              <p className='text-gray-600'>
                {detailData?.location || 'Lokasi'}
              </p>
            </section>
            <section>
  <h3 className='mb-3 text-lg font-semibold text-gray-800'>Status Pegawai</h3>
  <p className='text-gray-600'>{detailData?.employmentType ?? '-'}</p>
</section>

<section>
  <h3 className='mb-3 text-lg font-semibold text-gray-800'>Waktu Kerja</h3>
  <p className='text-gray-600'>{detailData?.workTime ?? '-'}</p>
</section>




            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Persyaratan
              </h3>
              <ul className='list-disc space-y-2 pl-6 text-gray-700'>
                {detailData?.requirements ? (
                  detailData?.requirements.map(
                    (item: string, index: number) => <li key={index}>{item}</li>
                  )
                ) : (
                  <p>Tidak ada persyaratan</p>
                )}
              </ul>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
              Keahlian
              </h3>
              <ul className='list-disc space-y-2 pl-6 text-gray-700'>
                {detailData?.skills ? (
                  detailData?.skills.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <p>Tidak ada Keahlian</p>
                )}
              </ul>
            </section>
            {detailData?.type&&(
            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Link Lamaran Eksternal
              </h3>
              <a
  href={detailData?.type ? (detailData?.type.startsWith('http') ? detailData?.type : `http://${detailData?.type}`) : '#'}
  className='text-gray-600'
>
  {detailData?.type || 'Link Eksternal Lamaran'}
</a>
            </section>
            )}
            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Tenggat Waktu
              </h3>
              <p className='text-gray-600'>
                {detailData?.deadline?.toLocaleDateString('id-ID') ||
                  'Deadline'}
              </p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Status
              </h3>
              <p className='text-gray-600'>
                {detailData?.status || 'Tidak ada status'}
              </p>
            </section>
            <button onClick={handleDownloadExcel}>Download Excel</button>  {/* Tombol untuk mengunduh Excel */}
            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Pelamar
              </h3>
              {detailData?.jobApplication?.length > 0 ? (
                detailData.jobApplication.map(
                  (data: JobApplication, index: number) => (
                    // todo
                    <ListDetailAplicants
                      key={data.id}
                      data={data}
                      index={index}
                    />
                  )
                )
              ) : (
                <p>Tidak ada pelamar</p>
              )}
            </section>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className='text-center pt-6 border-t'>
        <Link
          href='/dashboard'
          className='text-lg font-medium text-green-600 hover:text-green-700 hover:underline'
        >
          Kembali ke dashboard
        </Link>
      </CardFooter>
    </Card>
  )
}

export default DetailJob
