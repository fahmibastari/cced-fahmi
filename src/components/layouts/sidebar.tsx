'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  FileText,
  LayoutGrid,
  LogOut,
  UserCog,
  Users,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
  const logout = async () => {
    await signOut()
  }

  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <div className='w-64 bg-white shadow-lg'>
      <h1 className='text-center text-xl md:text-2xl lg:text-3xl font-bold text-[#025908] mt-9 mb-8'>
        Halaman Admin
      </h1>
      <hr className='mb-4' />
      <nav className='p-4 mb-20 flex flex-col gap-1'>
        {[
          { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
          { href: '/admin/users', label: 'Users', icon: UserCog },
          { href: '/admin/companies', label: 'Companies', icon: Building2 },
          { href: '/admin/members', label: 'Members', icon: Users },
          { href: '/admin/content', label: 'Contents', icon: FileText },
          { href: '/admin/jobs', label: 'Jobs', icon: BriefcaseBusiness },
        ].map(({ href, label, icon: Icon }) => (
          <Button
            key={href}
            variant='outline'
            className={`mb-2 w-full items-center rounded-lg hover:bg-gray-50 p-3 text-left ${
              isActive(href)
                ? 'bg-green-200 text-green-800'
                : 'bg-green-50 text-green-600'
            }`}
          >
            <Link
              href={href}
              className='flex w-full items-center justify-between text-sm md:text-base lg:text-lg'
            >
              <span>{label}</span>
              <Icon className='w-5 h-5 md:w-6 md:h-6' />
            </Link>
          </Button>
        ))}
      </nav>

      <Button
        variant='outline'
        onClick={logout}
        className='mb-4 w-full flex items-center justify-between rounded-lg bg-red-600 hover:bg-red-800 p-3 text-sm md:text-base lg:text-lg text-white hover:text-white'
      >
        <span>Logout</span>
        <LogOut className='w-5 h-5 md:w-6 md:h-6' />
      </Button>
    </div>
  )
}

export default Sidebar
