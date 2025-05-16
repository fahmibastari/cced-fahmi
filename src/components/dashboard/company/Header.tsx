import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import Link from 'next/link'

interface HeaderCompanyProps {
  companyName: string
  industri: string
  logo: string
}

const HeaderCompany = ({ companyName, industri, logo }: HeaderCompanyProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
      {/* Left: Logo and Company Info */}
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <Link href="/company/profile" className="flex-shrink-0">
          <Avatar className="h-16 w-16">
            <AvatarImage src={logo} alt={`${companyName} Logo`} className="object-cover" />
            <AvatarFallback>
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{companyName || 'Penyedia Kerja'}</h2>
          <p className="text-sm text-gray-600">Bidang Industri: {industri || 'Industri'}</p>
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          <Link href="/company/edit-profile-company" className="block px-4 py-1">
            Edit Profil Penyedia Kerja
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600">
          <Link href="/company/add-job" className="block px-4 py-1">
            Tambah Lowongan
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default HeaderCompany
