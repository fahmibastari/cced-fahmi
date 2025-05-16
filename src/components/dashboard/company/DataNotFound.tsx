import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const DataNotFound = () => {
  return (
    <Card>
      <CardContent className='flex flex-col items-center justify-center space-y-4'>
        <div className='flex items-center justify-center h-40 w-40 m-5'>
          <Button
            variant={'ghost'}
            className='h-full w-full flex items-center justify-center bg-green-100 hover:bg-green-200 rounded-full shadow-sm'
          >
            <Link href='company/add-job'>
              <Plus size={44} />
            </Link>
          </Button>
        </div>
      </CardContent>
      <CardFooter className='flex justify-center'>
        {/* <Button variant={'outline'}>
          <Link href='company/add-job'>Tambah Lowongan</Link>
        </Button> */}
      </CardFooter>
    </Card>
  )
}

export default DataNotFound
