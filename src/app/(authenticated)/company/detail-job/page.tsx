import RoleGate from '@/components/auth/role-gate'
import DetailJob from '@/components/company/detail-job'
import { Role } from '@prisma/client'

export default async function Page() {
  return (
    <RoleGate accessRole={Role.COMPANY}>
      <DetailJob />
    </RoleGate>
  )
}
