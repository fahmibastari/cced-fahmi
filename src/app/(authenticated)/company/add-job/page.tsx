import { getDetailUserCompanyFull } from '@/actions/company-action'
import { FormError } from '@/components/auth/form-error'
import RoleGate from '@/components/auth/role-gate'
import AddJob from '@/components/company/add-job-form'
import { currentUser } from '@/lib/authenticate'
import { Role } from '@prisma/client'

export default async function Page() {
  const user = await currentUser()
  const company = await getDetailUserCompanyFull(user?.id || '')
  if (!company?.company?.isVerified) {
    return (
      <RoleGate accessRole={Role.COMPANY}>
        <div className='flex h-screen items-center justify-center w-full'>
          <FormError message='Anda tidak diizinkan mengakses halaman ini, harap tunggu hingga penyedia kerja Anda diverifikasi.' />
        </div>
      </RoleGate>
    )
  }
  return (
    <RoleGate accessRole={Role.COMPANY}>
      <AddJob />
    </RoleGate>
  )
}
