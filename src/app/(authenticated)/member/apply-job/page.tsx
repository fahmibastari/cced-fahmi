import RoleGate from '@/components/auth/role-gate'
import ApplyJobForm from '@/components/member/apply-job-form'
import { Role } from '@prisma/client'

export default async function Page() {
  return (
    <RoleGate accessRole={Role.MEMBER}>
      <ApplyJobForm />
    </RoleGate>
  )
}
