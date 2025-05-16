import { getRequestVerification } from '@/actions/admin-action'
import RequestControl from '@/components/admin/request-control-admin'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default async function Page() {
  const request = await getRequestVerification()
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <RequestControl request={request || []} />
    </RoleGate>
  )
}
