import CardAdd from './CardAdd'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Newspaper } from 'lucide-react'

const NewsArticleContent = () => {
  const handleClickCard = (title: string) => {
    console.log(title)
  }
  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {/* Card Berita & Artikel */}
      <Card className='rounded-lg border border-gray-200 bg-white shadow-md'>
        <CardHeader className='p-4'>
          <CardTitle className='text-lg font-semibold text-gray-800'>
            Berita & Artikel
          </CardTitle>
          <CardDescription className='text-sm text-gray-500'>
            Tambahkan berita atau artikel baru
          </CardDescription>
        </CardHeader>
        <CardContent className='p-4'>
          <div className='flex flex-wrap gap-2 space-y-3'>
            <CardAdd
              title='Berita'
              styleIcon='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 mb-4'
              HandleClick={() => handleClickCard('Berita')}
              styleButton='w-full bg-blue-500 hover:bg-blue-700 text-white rounded-md'
              buttonText='Tambah Berita'
              icon={<Newspaper />}
            />
            <CardAdd
              title='Artikel'
              styleIcon='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-green-900 mb-4'
              HandleClick={() => handleClickCard('Artikel')}
              styleButton='w-full bg-green-500 hover:bg-green-700 text-white rounded-md'
              buttonText='Tambah Article'
              icon={<Newspaper />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card Kegiatan */}
      <Card className='rounded-lg border border-gray-200 bg-white shadow-md'>
        <CardHeader className='p-4'>
          <CardTitle className='text-lg font-semibold text-gray-800'>
            Kegiatan
          </CardTitle>
          <CardDescription className='text-sm text-gray-500'>
            Lihat atau tambahkan kegiatan
          </CardDescription>
        </CardHeader>
        <CardContent className='p-4'>
          <div className='flex flex-wrap gap-2 space-y-3'>
            <CardAdd
              title='Event'
              styleIcon='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-green-900 mb-4'
              HandleClick={() => handleClickCard('Event')}
              styleButton='w-full bg-purple-500 hover:bg-purple-700 text-white rounded-md'
              buttonText='Tambah Event'
              icon={<Newspaper />}
            />
            <CardAdd
              title='Kewirausahaan'
              styleIcon='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-green-900 mb-4'
              HandleClick={() => handleClickCard('Kewirausahaan')}
              styleButton='w-full bg-yellow-500 hover:bg-yellow-700 text-white rounded-md'
              buttonText='Tambah Kewirausahaan'
              icon={<Newspaper />}
            />
            <CardAdd
              title='Sertifikat'
              styleIcon='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-green-900 mb-4'
              HandleClick={() => handleClickCard('Sertifikat')}
              styleButton='w-full bg-red-500 hover:bg-red-700 text-white rounded-md'
              buttonText='Tambah Sertifikat'
              icon={<Newspaper />}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NewsArticleContent
