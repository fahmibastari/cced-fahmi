import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface MobileNavProps {
  isLoggedIn: boolean
}

const MobileNav = ({ isLoggedIn }: MobileNavProps) => {
  const logout = async () => {
    await signOut()
  }

  return (
    <div className='md:hidden w-full bg-white shadow-md p-4'>
      {/* Auth Links */}
      <div className='flex flex-col items-start gap-2 mt-4'>
        {!isLoggedIn ? (
          <>
            <Link className='text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200' href='/register'>
              Daftar
            </Link>
            <Link className='text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200' href='/login'>
              Login
            </Link>
          </>
        ) : (
          <>
            <Button className='text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200' variant={'ghost'}>
              <Link href={'/dashboard'}>Dashboard</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default MobileNav
