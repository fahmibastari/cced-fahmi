import Link from 'next/link'

interface DesktopNavProps {
  items: {
    label: string
    href: string
  }[]
}

const DesktopNav = ({ items }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex gap-4 items-center">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-semibold text-green-800 px-4 py-2 rounded-md hover:bg-green-50 transition duration-200"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default DesktopNav
