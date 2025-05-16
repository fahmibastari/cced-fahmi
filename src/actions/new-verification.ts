'use server'

import { getUserByEmail } from '@/data/user'
import prisma from '@/lib/prisma'
import { getVerificationTokenByToken } from '@/data/verification-token'

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token tidak valid!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    return { error: 'Token telah kedaluwarsa!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Pencari kerja tidak ditemukan!' }
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  })  

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return { success: 'Email berhasil diverifikasi!' }
}
