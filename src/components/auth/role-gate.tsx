import { currentUserRole } from '@/lib/authenticate'
import { Role } from '@prisma/client'
import { FormError } from './form-error'

interface RoleGateProps {
  children: React.ReactNode
  accessRole: Role
}

const RoleGate = async ({ children, accessRole }: RoleGateProps) => {
  const role = await currentUserRole()
  if (role !== accessRole) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <FormError message="Anda tidak diizinkan mengakses halaman ini" />
      </div>
    )
  }
  return <>{children}</>
}
export default RoleGate
