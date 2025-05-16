import DashboardAdmin from '@/components/dashboard/admin/DashboardAdmin'
import DashboardCompany from '@/components/dashboard/company/DashboadCompany'
import DashboardMember from '@/components/dashboard/member/DashboardMember'
import { getJobById, getJobs } from '@/data/data'
import { currentDetailUserCompany } from '@/lib/authenticate'
import { Role } from '@prisma/client'

export default async function Page() {
  const user = await currentDetailUserCompany()
  if (user?.role === Role.ADMIN) {
    return <DashboardAdmin />
  }

  if (user?.role === Role.COMPANY) {
    const jobs = await getJobById(user?.id || '')
    return <DashboardCompany jobs={jobs} />
  }

  if (user?.role === Role.MEMBER) {
    const objData = await getJobs()
    return <DashboardMember jobs={objData?.data} user={user} />
  }
}
