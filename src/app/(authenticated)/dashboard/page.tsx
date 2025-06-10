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
    
    return (
      <DashboardMember
  user={user}
  jobs={(objData?.data ?? []).map((job) => ({
    ...job,
    companyName: job.company?.companyName ?? 'Nama Perusahaan',
    companyLogoUrl: job.company?.logo?.src ?? '',
    status: job.status ?? 'aktif',
    location: job.location ?? '',
    salary: job.salary ?? '',
    type: job.type ?? '',
    deadline:
      job.deadline ??
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

    // ⬇️ Ini yang paling penting
    company: {
      companyName: job.company?.companyName ?? '',
      logo: job.company?.logo?.src ? { src: job.company.logo.src } : undefined,
    },
  }))}
/>

    )
    

  }
}
