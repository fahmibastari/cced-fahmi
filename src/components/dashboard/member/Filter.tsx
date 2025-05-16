import { Button } from '@/components/ui/button'

const Filter = () => {
  return (
    <div className='m-4 flex gap-2'>
      <Button variant='secondary'>Relevan</Button>
      <Button variant='secondary'>Baru Ditambahkan</Button>
      <Button variant='secondary'>Tipe Pekerjaan</Button>
    </div>
  )
}

export default Filter
