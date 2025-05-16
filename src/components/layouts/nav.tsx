'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import DesktopNav from './utils/desktop-nav'
import MobileNav from './utils/mobile-nav'

interface NavProps {
  isLoggedIn: boolean
}

const Nav = ({ isLoggedIn }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false) // State for mobile menu
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className='bg-gradient-to-r from-white to-gray-100 shadow-lg backdrop-blur-md fixed w-full top-0 left-0 z-50'>
      {/* Header Container */}
      <div className='flex justify-between items-center px-6 py-4'>
        {/* Logo */}
<div className='text-2xl font-bold'>
  <Link href={'/'} className='text-[#025908] hover:text-[#2a7a2f]'>
    <img src='/LOGO-CCED.png' alt='Logo CCED' className='h-10' /> {/* Menambahkan logo */}
  </Link>
</div>


        {/* Mobile Menu Button */}
        <button
          className='md:hidden block focus:outline-none p-2'
          onClick={toggleMenu}
        >
          <Menu className='text-[#025908]' />
        </button>

        {/* Desktop Navigation */}
        <DesktopNav isLoggedIn={isLoggedIn} />
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} px-6 flex flex-col items-center`}
      >
        <MobileNav isLoggedIn={isLoggedIn} />
      </div>
    </nav>
  )
}

export default Nav
