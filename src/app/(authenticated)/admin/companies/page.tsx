import { getCompanies } from '@/actions/admin-action'
import CompaniesControl from '@/components/admin/companies-control-admin'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default async function Page() {
  const companies = await getCompanies()
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <CompaniesControl companies={companies || []} />
    </RoleGate>
  )
}
