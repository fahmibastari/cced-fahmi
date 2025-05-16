import prisma from '@/lib/prisma'

export type DetailUserType = {
  id: string
  name: string
  email: string
  role: string
  imageId: string
  createdAt: Date
  updatedAt: Date
  nim?: string
  phone?: string
  memberType?: string
  logoId?: string
  companyName?: string
  industry?: string
  ownership?: string
  companyPhone?: string
  website?: string
  publicMail?: string
  bio?: string
  address?: string
  city?: string
}

export const getUserTypeById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return null
    }
    if (user.role === 'MEMBER') {
      const userType = await prisma.member.findUnique({
        where: { userId: user.id },
      })
      return {
        ...user,
        ...userType,
      }
    }

    if (user.role === 'COMPANY') {
      const userType = await prisma.company.findUnique({
        where: { userId: user.id },
      })
      return {
        ...user,
        ...userType,
      }
    }
  } catch {
    return null
  }
}

export const getUserDetailCompany = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return null
    }

    const userDetail = await prisma.company.findUnique({
      where: { userId: user.id },
    })
    return {
      ...user,
      ...userDetail,
    }
  } catch {
    return null
  }
}

export const getUserDetailMember = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return null
    }

    const userDetail = await prisma.member.findUnique({
      where: { userId: user.id },
    })
    return {
      ...user,
      ...userDetail,
    }
  } catch {
    return null
  }
}

export const isValidTokenAdmin = async (value: string) => {
  if (value !== process.env.ADMIN_KEY) {
    return false
  }
  return true
}
