/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '../ui/button'
import Link from 'next/link'

interface ListDetailAplicantsProps {
  data: any
  index: number
}

const ListDetailAplicants = ({ data, index }: ListDetailAplicantsProps) => {
  return (
    <div className='flex items-center justify-between p-1 rounded-sm hover:bg-green-100'>
      <p>{`Pelamar ${index + 1} : ${data.member.user.fullname || 'Nama Tidak ditemukan'}`}</p>
      <Button
        variant='outline'
        size='sm'
        className='bg-green-50 hover:bg-green-300'
      >
        <Link href={`/company/detail-job/detail-applicant?token=${data.id}`}>
          Lihat
        </Link>
      </Button>
    </div>
  )
}

export default ListDetailAplicants
