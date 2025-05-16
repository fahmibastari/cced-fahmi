import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface CardSmallProps {
  href: string
  srcImage?: string // Opsional dengan default value
  title: string
  description: string
  createdAt?: Date // Opsional dengan default value
}

const CardSmall = ({
  href,
  srcImage = '/default-thumbnail.jpg',
  title,
  description,
  createdAt,
}: CardSmallProps) => {
  return (
    <div  className='block'>
      <Card className='mb-6 hover:shadow-lg transition-shadow text-gray-700'>
        <CardHeader className='p-4'>
          <div className='relative h-[350px] w-full group rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'>
            <Image
              src={srcImage}
              alt={`Thumbnail berita: ${title}`}
              className='rounded-md object-cover transform group-hover:scale-110 transition-transform duration-300'
              priority
              fill
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
              <p className='text-white font-medium'>{title}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-4 pt-2'>
        <CardTitle className='mb-2 text-xl md:text-lg font-semibold'>
          {title}
        </CardTitle>
        {createdAt && (
          <p className='text-sm text-gray-500 mb-2'>
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
        {/* ✅ Render description as HTML */}
        <div
          className='mb-4 text-gray-600'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardContent>

        <CardFooter className='p-4 pt-0'>
          <Button
            variant='link'
            className='h-auto p-0 font-normal text-green-500'
          >
            Baca selengkapnya
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardSmall
