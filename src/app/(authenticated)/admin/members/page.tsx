import { getMembers } from '@/actions/admin-action'
import MembersControl from '@/components/admin/member-control-admin'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default async function Page() {
  const members = await getMembers()
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <MembersControl members={members || []} />
    </RoleGate>
  )
}
