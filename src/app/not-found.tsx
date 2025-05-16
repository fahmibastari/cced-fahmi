import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-white text-white text-center'>
      <h1 className='text-6xl font-bold text-[#025908]'>404</h1>
      <p className='text-lg mt-4 text-[#025908]'>
        Ups! Halaman yang Anda cari tidak ada.
      </p>
      <Link
        className='mt-6 text-lg underline hover:no-underline text-[#025908]'
        href='/'
      >
        Kembali ke beranda
      </Link>
    </div>
  )
}
