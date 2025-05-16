import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'

const Seacrh = () => {
  return (
    <div className='flex items-center justify-between p-4 ml-32'>
      {/* <div className='my-4 md:ml-[340px] flex justify-center gap-2 w-full'>
        <Input placeholder='Cari Lowongan Kamu' className='max-w-sm w-full' />
        <Button variant='outline'>
          <Search />
        </Button>
      </div> */}
      {/* <Button variant='outline' className='md:mr-40 bg-green-500 text-white'>
        <Link href='company/add-job'>Tambah Lowongan</Link>
      </Button> */}
    </div>
  )
}

export default Seacrh
