import { Shield } from 'lucide-react'

interface StatusVerifikasiProps {
  type: string
}

const StatusVerifikasi = ({ type }: StatusVerifikasiProps) => {
  if (type === 'verified') {
    return (
      <div className='mt-6 w-full rounded-lg bg-green-50 p-4'>
        <div className='flex items-center'>
          <Shield className='mr-2 text-green-500' size={20} />
          <span className='text-sm font-medium text-green-800'>
            Status Verifikasi
          </span>
        </div>
        <p className='mt-1 text-sm text-green-600'>
          Perusahaan Anda telah diverifikasi
        </p>
      </div>
    )
  }
  if (type === 'waiting') {
    return (
      <div className='mt-6 w-full rounded-lg bg-yellow-50 p-4'>
        <div className='flex items-center'>
          <Shield className='mr-2 text-yellow-600' size={20} />
          <span className='text-sm font-medium text-yellow-800'>
            Status Verifikasi
          </span>
        </div>
        <p className='mt-1 text-sm text-yellow-600'>Menunggu Verifikasi</p>
      </div>
    )
  }

  return (
    <div className='mt-6 w-full rounded-lg bg-gray-50 p-4'>
      <div className='flex items-center'>
        <Shield className='mr-2 text-gray-600' size={20} />
        <span className='text-sm font-medium text-gray-800'>
          Status Verifikasi
        </span>
      </div>
      <p className='mt-1 text-sm text-gray-600'>
        Perusahaan Anda Belum diverifikasi
      </p>
    </div>
  )
}

export default StatusVerifikasi
