import RoleGate from '@/components/auth/role-gate'
import DetailApplicant from '@/components/company/detail-applicant'
import { Role } from '@prisma/client'

export default async function Page() {
  return (
    <RoleGate accessRole={Role.COMPANY}>
      <DetailApplicant />
    </RoleGate>
  )
}
