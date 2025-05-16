import { Button } from '@/components/ui/button'

interface NavMenuProps {
  handleClickAll: () => void
  handleClickActive: () => void
  handleClickNonActive: () => void
  handleClickDone: () => void
  handleClickDraft: () => void
}

const NavMenu = ({
  handleClickAll,
  handleClickActive,
  handleClickNonActive,
  handleClickDone,
  handleClickDraft,
}: NavMenuProps) => {
  return (
    <div className='m-4 flex justify-center gap-2'>
      <Button
        variant='ghost'
        className='focus:underline focus:underline-offset-8'
        onClick={handleClickAll}
      >
        Semua
      </Button>
      <Button
        variant='ghost'
        className='focus:underline focus:underline-offset-8'
        onClick={handleClickActive}
      >
        Aktif
      </Button>
      <Button
        variant='ghost'
        className='focus:underline focus:underline-offset-8'
        onClick={handleClickNonActive}
      >
        Nonaktif
      </Button>
      <Button
        variant='ghost'
        className='focus:underline focus:underline-offset-8'
        onClick={handleClickDone}
      >
        Selesai
      </Button>
      <Button
        variant='ghost'
        className='focus:underline focus:underline-offset-8'
        onClick={handleClickDraft}
      >
        Draft
      </Button>
    </div>
  )
}

export default NavMenu
