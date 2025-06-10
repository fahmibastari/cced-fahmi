import Link from 'next/link'
import { X } from 'lucide-react'

interface MobileNavProps {
  items: {
    label: string
    href: string
  }[]
  onClose?: () => void
}

const MobileNav = ({ items, onClose }: MobileNavProps) => {
  return (
    <div className="flex flex-col h-full px-6 pt-6 pb-10 bg-white">
      {/* Close Button */}
      <div className="flex justify-end mb-4">
        <button onClick={onClose} aria-label="Tutup menu">
          <X className="h-5 w-5 text-green-800" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="text-green-800 font-medium text-sm py-2 border-b border-gray-100 hover:bg-green-50 rounded-md transition"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileNav
