import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const PaginationNewsArticle = () => {
  return (
    <Pagination>
      <PaginationContent className='text-[#025908]'>
        <PaginationItem>
          <Button variant={'outline'}>
            <Link href='#' className='flex gap-2 items-center'>
              <ChevronLeft className='h-4 w-4 font-bold' />
              <span>Previous</span>
            </Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          {/* nanti ini bisa di ganti ke sebelah kiri atau kanan tinggal sesuaikan saja */}
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          {/* pokoknya nanti pake useSearch params ambil lagi di link mana dia jadi outline kalo ga jadi ghost */}
          <Button variant={'ghost'}>
            <Link href='#'>5</Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button variant={'outline'}>
            <Link href='#'>6</Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button variant={'ghost'}>
            <Link href='#'>7</Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          {/* nanti ini bisa di ganti ke sebelah kiri atau kanan tinggal sesuaikan saja */}
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button variant={'outline'}>
            <Link href='#' className='flex gap-2 items-center'>
              <span>Next</span>
              <ChevronRight className='h-4 w-4' />
            </Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationNewsArticle
