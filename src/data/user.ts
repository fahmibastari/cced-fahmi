import prisma from '@/lib/prisma'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        fullname: true,
        password: true,
        emailVerified: true, // ✅ tambahkan ini
        role: true,           // ✅ tambahkan ini
      },
    })
    return user
  } catch {
    return null
  }
}


export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}
