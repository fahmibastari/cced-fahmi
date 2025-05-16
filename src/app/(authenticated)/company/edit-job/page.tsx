import RoleGate from '@/components/auth/role-gate'
import EditJob from '@/components/company/edit-job-form'
import { Role } from '@prisma/client'

export default async function Page() {
  return (
    <RoleGate accessRole={Role.COMPANY}>
      <EditJob />
    </RoleGate>
  )
}
