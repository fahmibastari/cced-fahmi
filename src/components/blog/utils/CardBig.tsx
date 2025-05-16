import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface CardBigProps {
  href: string
  srcImage?: string
  title: string
  description: string
  createdAt?: Date
}

const CardBig = ({
  href,
  srcImage = '/default-thumbnail.jpg',
  title,
  description,
  createdAt,
}: CardBigProps) => {
  return (
    <div  className='block'>
      <Card className='mb-6 hover:shadow-lg transition-shadow text-gray-700'>
        <CardContent className='p-6'>
          <div className='relative h-[450px] w-full group rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'>
            <Image
              src={srcImage}
              alt={`Thumbnail berita: ${title}`}
              className='rounded-md object-cover transform group-hover:scale-110 transition-transform duration-300'
              priority
              fill
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
              <p className='text-white font-medium pb-4'>{title}</p>
            </div>
          </div>
          <CardTitle className='mb-2 text-2xl font-bold md:text-3xl mt-5'>
            {title}
          </CardTitle>
          {createdAt && (
            <p className='text-sm text-muted-foreground'>
              Dibuat pada{' '}
              {new Date(createdAt).toLocaleString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </p>
          )}
        <div
          className='mb-4 text-gray-600'
          dangerouslySetInnerHTML={{ __html: description }}
        />
          <Button
            variant='link'
            className='h-auto p-0 font-normal text-green-500'   
          >
            Baca selengkapnya...
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardBig
