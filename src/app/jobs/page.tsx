import prisma from '@/lib/prisma'
import PublicJobsPage from '@/components/public/PublicJobsPage'
import type { JobWithCompany } from '@/components/public/PublicJobsPage'


export default async function JobsListPage() {
  const jobs = await prisma.job.findMany({
    where: {
      deadline: {
        not: null,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      company: {
        include: {
          logo: true,
        },
      },
      posterFile: true,
    },
  })

  return <PublicJobsPage jobs={jobs as JobWithCompany[]} />

}
