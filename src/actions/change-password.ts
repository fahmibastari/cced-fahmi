'use server'
import { getPasswordResetTokenByToken } from '@/data/reset-password'
import { getUserByEmail } from '@/data/user'
import prisma from '@/lib/prisma'
import { resetPasswordSchema } from '@/lib/zod'
import * as z from 'zod'
import bcryptjs from 'bcryptjs'

export const changePassword = async (
  data: z.infer<typeof resetPasswordSchema>,
  token: string | null
) => {
  const validateField = resetPasswordSchema.safeParse(data)

  if (!validateField.success) {
    return { error: 'Email Tidak Valid!' }
  }

  const { password } = validateField.data

  if (!token) {
    return { error: 'Token Tidak Valid!' }
  }

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Terjadi Kesalahan!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    return { error: 'Token Telah Kedaluwarsa!' }
  }

  const user = await getUserByEmail(existingToken.email)

  if (!user) {
    return { error: 'Terjadi Kesalahan!' }
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await bcryptjs.hash(password, 10),
    },
  })

  await prisma.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return { success: 'Kata Sandi Berhasil Diubah!' }
}