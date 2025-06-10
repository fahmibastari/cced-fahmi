'use server'

import prisma from '@/lib/prisma'
import { saveFile } from '@/lib/file-handler'

export const getUsers = async () => {
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return user
    
  } catch {
    return null
  }
}
// Fungsi untuk login sebagai perusahaan
export const impersonateAsCompany = async (adminId: string, companyId: string) => {
  try {
    // Pastikan admin valid
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
    })

    if (!admin || admin.role !== 'ADMIN') {
      return { error: 'Unauthorized' }
    }

    // Ambil data perusahaan
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    })

    if (!company) {
      return { error: 'Company not found' }
    }

    // Simulasi login sebagai perusahaan dengan data perusahaan
    // Bisa juga mengarahkan ke halaman perusahaan atau mengubah sesi
    return { success: 'Successfully impersonated as company' }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred' }
  }
}


export const getUsersWithBerkas = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        company: {
          include: {
            berkas: {
              select: {
                src: true
              }
            }
          }
        }
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return users
  } catch (err) {
    console.error(err)
    return null
  }
}

export const verifyCompanyByUserId = async (userId: string) => {
  try {
    // Fetch the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return { error: 'Pengguna tidak ditemukan.' }
    }

    // Update emailVerified timestamp
    await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: new Date() },
    })

    // If the user is a COMPANY, verify the associated company too
    if (user.role === 'COMPANY') {
      const company = await prisma.company.findFirst({
        where: { userId },
      })

      if (!company) {
        return { error: 'Penyedia Kerja tidak ditemukan untuk pengguna ini.' }
      }

      await prisma.company.update({
        where: { id: company.id },
        data: { isVerified: true },
      })

      // Optional: delete any requestVerified record
      await prisma.requestVerified.deleteMany({
        where: { companyId: company.id },
      })

      return {
        success: `Penyedia Kerja "${company.companyName}" Terverifikasi dan email pengguna ditandai sebagai terverifikasi.`,
      }
    }

    return { success: 'Email pengguna ditandai sebagai terverifikasi.' }
  } catch (error) {
    console.error('Kesalahan dalam verifikasi:', error)
    return {
      error: 'Terjadi kesalahan saat memverifikasi. Silakan coba lagi.',
    }
  }
}



export const getCompanies = async () => {
  try {
    const company = await prisma.company.findMany({
      include: { user: true },
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return company
  } catch {
    return null
  }
}

export const getMembers = async () => {
  try {
    const member = await prisma.member.findMany({
      include: { user: true },
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return member
  } catch {
    return null
  }
}

export const getJobs = async () => {
  try {
    const job = await prisma.job.findMany({
      include: {
        company: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return job
  } catch {
    return null
  }
}

export const getJobApplications = async () => {
  try {
    const jobApplication = await prisma.jobApplication.findMany({
      orderBy: {
        appliedAt: 'desc',
      },
    })
    return jobApplication
  } catch {
    return null
  }
}

export const getContents = async () => {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })
    const article = await prisma.article.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return { news, article }
  } catch {
    return null
  }
}

export const getContent = async (id: string) => {
  try {
    const news = await prisma.news.findUnique({ where: { id } })
    if (news) return { type: 'news', content: news }

    const article = await prisma.article.findUnique({ where: { id } })
    if (article) return { type: 'article', content: article }

    return null
  } catch (error) {
    console.error('Kesalahan dalam mengambil konten.', error)
    return null
  }
}

export const getRequestVerification = async () => {
  try {
    const request = await prisma.requestVerified.findMany({
      include: {
        company: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return request
  } catch {
    return null
  }
}

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({ where: { id } })
    return { success: 'Pengguna berhasil dihapus!' }
  } catch {
    return {
      error: 'Terjadi kesalahan saat menghapus pengguna. Silakan coba lagi.',
    }
  }
}

export const deleteCompany = async (id: string) => {
  try {
    await prisma.company.delete({ where: { id } })
    return { success: 'Penyedia kerja berhasil dihapus!' }
  } catch {
    return {
      error: 'Terjadi kesalahan saat menghapus penyedia kerja. Silakan coba lagi.',
    }
  }
}

export const deleteMember = async (id: string) => {
  try {
    await prisma.member.delete({ where: { id } })
    return { success: 'Pencari kerja berhasil dihapus!' }
  } catch {
    return {
      error: 'Terjadi kesalahan saat menghapus pencari kerja. Silakan coba lagi.',
    }
  }
}

export const deleteJob = async (id: string) => {
  try {
    await prisma.job.delete({ where: { id } })
    return { success: 'Lowongan berhasil dihapus!' }
  } catch {
    return {
      error: 'Terjadi kesalahan saat menghapus lowongan. Silakan coba lagi.',
    }
  }
}

export const deleteRequestVerified = async (id: string, companyId: string) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    })
    if (!company) {
      return {
        error: 'Penyedia kerja tidak ditemukan. Silakan coba lagi.',
      }
    }

    const request = await prisma.requestVerified.findUnique({ where: { id } })
    if (!request) {
      return {
        error: 'Permintaan verifikasi tidak ditemukan. Silakan coba lagi.',
      }
    }

    await prisma.company.update({
      where: { id: companyId },
      data: {
        isVerified: true,
      },
    })

    await prisma.requestVerified.delete({ where: { id } })

    return { success: `Permintaan verifikasi ${company.companyName} berhasil!` }
  } catch {
    return {
      error:
        'Terjadi kesalahan saat memproses permintaan verifikasi. Silakan coba lagi.',
    }
  }
}