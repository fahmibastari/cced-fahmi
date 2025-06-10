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
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = isLoggedIn
    ? [{ label: 'Dashboard', href: '/dashboard' }]
    : [
        { label: 'Daftar', href: '/register' },
        { label: 'Login', href: '/login' },
      ]

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-5 md:py-6 min-h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
          <img src="/LOGO-CCED.png" className="h-10 sm:h-12 w-auto" />
          </Link>

          {/* Toggle Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-green-800"
            aria-label="Buka menu"
            aria-expanded={isOpen}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop */}
          <DesktopNav items={menuItems} />
        </div>
      </nav>

      {/* Overlay & Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <MobileNav items={menuItems} onClose={() => setIsOpen(false)} />
      </div>
    </>
  )
}

export default Nav
