import { getDetailUserCompanyFull } from '@/actions/company-action'
import RoleGate from '@/components/auth/role-gate'
import EditProfileCompany from '@/components/company/edit-profile-company'
import { currentUser } from '@/lib/authenticate'
import { Role } from '@prisma/client'

export default async function Page() {
  const user = await currentUser()
  const company = await getDetailUserCompanyFull(user?.id || '')
  return (
    <RoleGate accessRole={Role.COMPANY}>
      <EditProfileCompany data={company} />
    </RoleGate>
  )
}
