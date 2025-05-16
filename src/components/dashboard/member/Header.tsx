import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import Link from 'next/link'

interface HeaderMemberProps {
  fullname: string
  membertype: string
  img: string
}

const HeaderMember = ({ fullname, membertype, img }: HeaderMemberProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
      {/* Left: Avatar and User Info */}
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <Link href="/member/profile" className="flex-shrink-0">
          <Avatar className="h-16 w-16">
            <AvatarImage src={img} alt={`${fullname}'s Avatar`} className="object-cover" />
            <AvatarFallback>
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{fullname || 'Fullname'}</h2>
          <p className="text-sm text-gray-600">{membertype.toLowerCase() || 'typeMember'}</p>
        </div>
      </div>

      {/* Right: Edit Profile Button */}
      <div>
        <Button variant="outline" size="sm">
          <Link href="/member/edit-profile-member" className="block px-4 py-1">
            Edit Profil Anda
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default HeaderMember
