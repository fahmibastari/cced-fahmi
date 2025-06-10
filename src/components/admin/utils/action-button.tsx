'use client'

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

interface ButtonActionProps {
  id: string
  isVerified: boolean
  showDelete?: boolean // <-- added prop
  handleClickDelete?: () => void
  handleClickVerifikasi?: () => void
}

const ButtonAction = ({
  id,
  isVerified,
  showDelete = true,
  handleClickDelete,
  handleClickVerifikasi,
}: ButtonActionProps) => {
  const pathname = usePathname()
  const isUserPage = pathname === '/admin/users'

  const onDeleteClick = () => {
    if (handleClickDelete) {
      const confirmed = window.confirm('Apakah kamu yakin ingin menghapus data ini?')
      if (confirmed) {
        handleClickDelete()
      }
    }
  }

  return (
    <div className='flex gap-4 justify-end'>
      {showDelete && (
        <Button onClick={onDeleteClick} variant='destructive' size='sm'>
          Hapus
        </Button>
      )}

      {isUserPage &&
        (isVerified ? (
          <Button size='sm' variant='outline' disabled>
            Verified
          </Button>
        ) : (
          <Button onClick={handleClickVerifikasi} size='sm' variant='outline'>
            Verifikasi
          </Button>
        ))}
    </div>
  )
}


export default ButtonAction
