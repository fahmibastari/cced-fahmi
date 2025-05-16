import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
// import Link from 'next/link'
import React from 'react'

interface CardNewsArticleProps {
  title: string
  content: string
  thumbnail: string | null
  publishedAt: string | null
  handleClick: () => void
}

const CardNewsArticle = ({
  title,
  content,
  thumbnail,
  publishedAt,
  handleClick,
}: CardNewsArticleProps) => {
  return (
    <div className='mx-auto w-full max-w-7xl space-y-8 p-4'>
      <Card className='cursor-pointer overflow-hidden'>
        <div className='relative aspect-video'>
          <Image
            src={thumbnail || '/default-thumbnail.jpg'}
            alt={thumbnail || 'default thumbnail'}
            width={500}
            height={500}
            className='h-64 w-full rounded-sm object-cover p-4'
          />
        </div>
        <CardHeader className='space-y-2'>
          <div className='s-center flex gap-2 text-sm text-gray-500'>
            <Calendar className='h-4 w-4' />
            <span>{publishedAt}</span>
          </div>
          <CardTitle className='line-clamp-2 text-sm font-bold text-[#025908]'>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='line-clamp-2 text-sm text-gray-600'>{content}</p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleClick}
            variant='link'
            className='px-0 text-[#025908]'
          >
            Baca selengkapnya
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardNewsArticle
