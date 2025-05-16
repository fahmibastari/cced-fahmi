import { Card } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import Image from 'next/image'

interface CardBigNewsArticleProps {
  title: string
  thumbnail: string | null
  publishedAt: string | null
}

const CardBigNewsArticle = ({
  thumbnail,
  title,
  publishedAt,
}: CardBigNewsArticleProps) => {
  return (
    <Card className='my-6 w-full cursor-pointer overflow-hidden p-7'>
      <div className='relative'>
        <Image
          src={thumbnail || '/default-thumbnail.jpg'}
          alt={thumbnail || 'default thumbnail'}
          width={1920}
          height={1080}
          priority
          className='h-96 w-full object-cover'
        />
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6'>
          <div className='flex items-center gap-2 text-sm text-white/80'>
            <Calendar className='h-4 w-4' />
            <span>{publishedAt}</span>
          </div>
          <h2 className='mt-2 text-xl font-bold text-white'>{title}</h2>
        </div>
      </div>
    </Card>
  )
}

export default CardBigNewsArticle
