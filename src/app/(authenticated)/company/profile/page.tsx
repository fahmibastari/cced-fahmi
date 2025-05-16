import { getDetailUserCompanyFull } from '@/actions/company-action'
import { FormError } from '@/components/auth/form-error'
import RoleGate from '@/components/auth/role-gate'
import ProfileCompany from '@/components/company/profileCompany'
import { currentUser } from '@/lib/authenticate'
import { Role } from '@prisma/client'

export default async function Page() {
  const user = await currentUser()
  const detailUserCompany = await getDetailUserCompanyFull(user?.id || '')
  if (!detailUserCompany) {
    return (
      <RoleGate accessRole={Role.COMPANY}>
        <div className='w-full h-screen flex items-center justify-center'>
          <FormError message='Terdapat Kesalahan!' />
        </div>
      </RoleGate>
    )
  }
  return (
    <RoleGate accessRole={Role.COMPANY}>
      <ProfileCompany data={detailUserCompany} />
    </RoleGate>
  )
}
