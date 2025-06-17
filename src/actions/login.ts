'use server'

import { signIn } from '@/auth'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { signInSchema } from '@/lib/zod'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'
import * as z from 'zod'

export const login = async (data: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Bidang tidak valid!' }
  }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Kredensial tidak valid!' }
  }

  if (!existingUser.emailVerified) {
    await generateVerificationToken(existingUser.email)

    if (existingUser.role === 'COMPANY') {
      return { success: 'Menunggu Verifikasi!' }
    }

    return { success: 'Email Konfirmasi Dikirim!' }
  }

  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      return { error: 'Kredensial Tidak Valid' }
    }

    return redirect(DEFAULT_LOGIN_REDIRECT)
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case 'CredentialsSignin':
          return { error: 'Kredensial Tidak Valid' }
        default:
          return { error: 'Terjadi kesalahan saat login' }
      }
    }

    throw e // untuk debug purposes
  }
}
