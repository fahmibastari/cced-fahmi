import {
  getCompanies,
  getContents,
  getJobApplications,
  getJobs,
  getMembers,
  getUsers,
} from '@/actions/admin-action'
import DasboardCard from './card-dashborad'

const DashboardAdmin = async () => {
  const users = await getUsers()
  const companies = await getCompanies()
  const members = await getMembers()
  const jobs = await getJobs()
  const jobApplications = await getJobApplications()
  const contents = await getContents()
  return (
    <main className='p-6'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <DasboardCard
          title='Total Pengguna'
          description='Penyedia kerja terdaftar'
          content={users?.length || 0}
          href='/admin/users'
        />

        <DasboardCard
          title='Total Penyedia Kerja'
          description='Penyedia kerja terdaftar'
          content={companies?.length || 0}
          href='/admin/companies'
        />

        <DasboardCard
          title='Total Pencari Kerja'
          description='Pencari kerja terdaftar'
          content={members?.length || 0}
          href='/admin/members'
        />

        <DasboardCard
          title='Total Lowongan'
          description='Lowongan aktif'
          content={jobs?.length || 0}
          href='/admin/jobs'
        />

        <DasboardCard
          title='Total Lamaran'
          description='Lamaran aktif'
          content={jobApplications?.length || 0}
          href='/admin/jobs'
        />

        <DasboardCard
          title='Total Konten'
          description='Konten aktif'
          content={
            (contents?.news?.length || 0) + (contents?.article?.length || 0)
          }
          href='/admin/jobs'
        />
      </div>
    </main>
  )
}

export default DashboardAdmin
