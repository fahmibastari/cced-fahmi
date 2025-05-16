import { Button } from '@/components/ui/button'
import { Role } from '@prisma/client'
import { BriefcaseIcon, UserIcon } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { CardWrapper } from '../card-wrapper'

interface RoleOption {
  id: Role
  title: string
  icon: ReactNode
  description: string
}

interface RoleSelectionProps {
  onSelectRole: (roleId: Role) => void
  onSubmit: () => void
}

const RoleSelection = ({ onSelectRole, onSubmit }: RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const roles: RoleOption[] = [
    {
      id: Role.MEMBER,
      title: 'Pencari Kerja',
      icon: <UserIcon className="h-12 w-12" />,
      description: 'Akun personal untuk pencari kerja',
    },
    {
      id: Role.COMPANY,
      title: 'Penyedia Kerja',
      icon: <BriefcaseIcon className="h-12 w-12" />,
      description: 'Akun perusahaan/penyedia kerja',
    },
  ]

  const handleRoleSelect = (roleId: Role) => {
    setSelectedRole(roleId)
    onSelectRole(roleId)
  }

  return (
    <CardWrapper
      headerLabel="Daftar Akun"
      description="Pilih jenis akun yang kamu buat."
      switchButtonLabel="Login"
      switchButtonHref="/login"
      paragraphSwitchButton="Sudah punya akun? "
      className="max-w-md mx-auto px-4"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`relative rounded-lg border-2 p-6 transition-colors duration-300 hover:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 focus:ring-offset-2 ${
                selectedRole === role.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
              type="button"
              aria-pressed={selectedRole === role.id}
            >
              <div className="flex flex-col items-center space-y-3 text-center">
                <div
                  className={`rounded-full p-3 transition-colors ${
                    selectedRole === role.id ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  {role.icon}
                </div>
                <div>
                  <h3 className="font-medium">{role.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{role.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-7 flex items-center justify-center">
          <Button
            onClick={onSubmit}
            disabled={!selectedRole}
            className="px-8"
            type="button"
            variant="default"
          >
            Lanjut
          </Button>
        </div>
      </div>
    </CardWrapper>
  )
}

export default RoleSelection
