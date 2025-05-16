'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserRoundCog } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname() // Mendapatkan path aktif saat ini
  const title = pathname
    .split('/') // Memisahkan berdasarkan '/'
    .filter(Boolean) // Menghapus elemen kosong akibat '/'
    .filter((segment) => segment.toLowerCase() !== 'admin') // Menghapus segmen "admin"
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)) // Huruf pertama kapital
    .join('') // Menggabungkan kembali segmen tanpa '/'
  return (
    <header className='flex h-24 items-center justify-between bg-white p-4 shadow-md'>
      {/* Title Section */}
      <h1 className='text-xl font-bold text-[#025908] ml-10 hover:text-[#44b64b] cursor-default'>
        {title}
      </h1>

      {/* Right Section: Notification and Logo */}
      <div className='flex flex-col items-center gap-2 py-2'>
        {/* Avatar/Logo */}
        <Avatar className='h-8 w-8'>
          <AvatarImage src='/path-to-your-logo.png' alt='Logo' />
          <AvatarFallback>
            <UserRoundCog />
          </AvatarFallback>
        </Avatar>
        <p>Super Admin</p>
      </div>
    </header>
  )
}

export default Header
