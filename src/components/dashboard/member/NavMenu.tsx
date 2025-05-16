import { Button } from '@/components/ui/button'


interface NavMenuProps {
  handleClickForYou: () => void
  handleClickFind: () => void
  handleClickActivity: () => void
}

const NavMenu = ({
  handleClickForYou,
  handleClickFind,
  handleClickActivity,
}: NavMenuProps) => {
  return (
    <div className='m-4 flex justify-center gap-2'>
      <Button
        variant='ghost'
        className='focus:underline focus:underline-offset-8'
        onClick={handleClickForYou}
      >
        Untuk Kamu
      </Button>
      <Button
        variant='ghost'
        className='focus:underline focus:underline-offset-8'
        onClick={handleClickFind}
      >
        Cari
      </Button>
      <Button
        variant='ghost'
        className='focus:underline focus:underline-offset-8'
        onClick={handleClickActivity}
      >
        Aktifitas
      </Button>
    </div>
  )
}

export default NavMenu
