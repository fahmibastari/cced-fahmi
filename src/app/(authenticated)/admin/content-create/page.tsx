import { getContents } from '@/actions/admin-action'
import ContentPage from '@/components/admin/content-create-admin'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default async function Page() {
 

    return (
      <RoleGate accessRole={Role.ADMIN}>
        <ContentPage/>
      </RoleGate>
    )
}
