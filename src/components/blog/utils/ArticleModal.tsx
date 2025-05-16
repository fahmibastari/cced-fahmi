import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'

interface ArticleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  thumbnail: string
  createdAt?: Date
}

const ArticleModal = ({
  isOpen,
  onClose,
  title,
  content,
  thumbnail,
  createdAt,
}: ArticleModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='mt-4 space-y-4'>
          <div className='relative w-full h-80'>
            <Image
              src={thumbnail}
              alt={`Thumbnail for ${title}`}
              fill
              className='rounded-md object-cover'
            />
          </div>
          {createdAt && (
            <p className='text-sm text-muted-foreground'>
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
            className='prose max-w-none'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ArticleModal
