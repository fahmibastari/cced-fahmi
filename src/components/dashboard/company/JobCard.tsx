import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

interface JobCardProps {
  id: string
  title: string
  status: string
  location: string
  createdAt: string
  jobApplication: JobApplication[]
  handleDelete: () => void
  applyType?: 'internal' | 'external' // ← Tambahkan ini
}

interface JobApplication {
  notes: string
}

const JobCard = ({
  id,
  title,
  status,
  location,
  createdAt,
  jobApplication,
  handleDelete,
  applyType, // ⬅️ INI WAJIB
}: JobCardProps) => {
  return (
    <Card className="relative">
  <CardHeader>
      <CardTitle>
  <div className="flex items-center justify-between">
    <h3 className="font-bold text-lg">{title}</h3>
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm capitalize ${
        applyType === 'external'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-green-100 text-green-800'
      }`}
    >
      {applyType}
    </span>
  </div>
</CardTitle>

<CardDescription className="flex flex-col pt-2 space-y-1">
  <span className="text-sm text-gray-600">{location}</span>
  <span className="text-sm text-gray-400">Dibuat pada: {createdAt}</span>

  {/* Status Badge (aktif, nonaktif, dll) */}
  <span
    className={`w-fit text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
      status === 'aktif'
        ? 'bg-green-100 text-green-700'
        : status === 'nonaktif'
        ? 'bg-red-100 text-red-700'
        : status === 'selesai'
        ? 'bg-blue-100 text-blue-700'
        : 'bg-gray-200 text-gray-700'
    }`}
  >
    {status}
  </span>
</CardDescription>

      </CardHeader>
      <CardContent className='m-4 flex justify-between border border-gray-200 p-4'>
        <div className='flex flex-col px-4 text-center'>
          <h1 className='text-3xl font-bold'>{jobApplication.length}</h1>
          <p className='text-sm font-medium'>Pelamar</p>
        </div>
        <div className='flex flex-col px-4 text-center'>
          <h1 className='text-3xl font-bold'>
            {
              jobApplication.filter((app) => app.notes === 'seleksi berkas')
                .length
            }
          </h1>
          <p className='text-sm font-medium'>Seleksi Berkas</p>
        </div>
        <div className='flex flex-col px-4 text-center'>
          <h1 className='text-3xl font-bold'>
            {
              jobApplication.filter((app) => app.notes === 'dalam komunikasi')
                .length
            }
          </h1>
          <p className='text-sm font-medium'>Dalam Komunikasi</p>
        </div>
        <div className='flex flex-col px-4 text-center'>
          <h1 className='text-3xl font-bold'>
            {
              jobApplication.filter((app) => app.notes === 'belum sesuai')
                .length
            }
          </h1>
          <p className='text-sm font-medium'>Belum Sesuai</p>
        </div>
      </CardContent>
      <hr className='h-0.5 w-full' />
      <CardFooter className='mt-3 flex justify-end gap-4'>
        <Button
          variant='secondary'
          className='w-24 bg-green-500 text-white hover:bg-green-400'
        >
          <Link href={`/company/edit-job?token=${id}`}>Edit</Link>
        </Button>
        <Button
  variant='destructive'
  className='w-24'
  onClick={() => {
    if (window.confirm('Apakah kamu yakin ingin menghapus lowongan ini?')) {
      handleDelete()
    }
  }}
>
  Hapus
</Button>

        <Button
          variant='outline'
          className='w-24 bg-blue-400 text-white hover:bg-blue-300'
        >
          <Link href={`/company/detail-job?token=${id}`}>Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default JobCard
