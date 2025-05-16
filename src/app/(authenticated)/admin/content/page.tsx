import { getContents } from '@/actions/admin-action'
import ContentsControl from '@/components/admin/contents-control-admin'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default async function Page() {
  const contents = await getContents()
  if (!contents) {
    return (
      <RoleGate accessRole={Role.ADMIN}>
        <ContentsControl news={[]} article={[]} />
      </RoleGate>
    )
  }
  const { news, article } = contents
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <ContentsControl news={news || []} article={article || []} />
    </RoleGate>
  )
}
