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

interface DesktopNavProps {
  isLoggedIn: boolean
}

const DesktopNav = ({ isLoggedIn }: DesktopNavProps) => {
  const logout = async () => {
    await signOut()
  }
  return (
    <div className="hidden md:flex md:mx-16 md:flex-wrap items-center justify-between px-4 py-4">
  {/* Auth Links */}
  <div className="flex items-center gap-6 px-4">
    {!isLoggedIn ? (
      <>
        <Button
          asChild
          variant="outline"
          className="text-green-800 font-semibold hover:bg-green-100 transition duration-300"
        >
          <Link href="/register">Daftar</Link>
        </Button>
        <Button
          asChild
          variant="solid"
          className="bg-green-800 text-white font-semibold hover:bg-green-700 transition duration-300"
        >
          <Link href="/login">Login</Link>
        </Button>
      </>
    ) : (
      <Button
        asChild
        variant="default"
        className="font-semibold hover:bg-green-100 transition duration-300"
      >
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    )}
  </div>
</div>

  )
}

export default DesktopNav
