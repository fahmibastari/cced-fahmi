import { getDetailUserMemberFull } from '@/actions/member-action'
import { FormError } from '@/components/auth/form-error'
import RoleGate from '@/components/auth/role-gate'
import ProfileMember from '@/components/member/profileMember'
import { currentUser } from '@/lib/authenticate'
import { Role } from '@prisma/client'

export default async function Page() {
  const user = await currentUser()
  const detailUserMember = await getDetailUserMemberFull(user?.id || '')
  if (!detailUserMember) {
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <div className='w-full h-screen flex items-center justify-center'>
          <FormError message='Something Went Wrong!' />
        </div>
      </RoleGate>
    )
  }
  return (
    <RoleGate accessRole={Role.MEMBER}>
      <ProfileMember data={detailUserMember} />
    </RoleGate>
  )
}
