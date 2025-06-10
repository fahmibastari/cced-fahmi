import prisma from '@/lib/prisma'

export const getNews = async () => {
  const news = await prisma.news.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })
  return news
}

export const getArticles = async () => {
  const news = await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })
  return news
}

export const getJobById = async (companyId: string) => {
  const jobs = await prisma.job.findMany({
    where: {
      companyId: companyId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      jobApplication: {
        select: {
          id: true,
          notes: true,
        },
      },
    },
  })
  return jobs
}

export async function getJobs() {
  try {
    const data = await prisma.job.findMany({
      where: {
        status: 'aktif',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        jobApplication: true,
        company: {
          include: {
            logo: true,  // Include the logo file
          },
        },
        posterFile: true,
      },
    });

    // Map over the jobs to include the company logo URL
    const jobsWithLogo = data.map(job => ({
      ...job,
      companyLogoUrl: job.company.logo ? job.company.logo.src : null, // Add logo URL if available
    }));

    return { data: jobsWithLogo };
  } catch (error) {
    console.error('An error occurred while fetching the job:', error);
  }
}


export async function getMemberById(id: string) {
  try {
    const member = await prisma.member.findUnique({ where: { id } })
    return member
  } catch {
    return null
  }
}
