// src/auth.config.ts
export const runtime = 'nodejs'

import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'

import { signInSchema } from './lib/zod'
import { getUserByEmail } from './data/user'

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validated = signInSchema.safeParse(credentials)

        if (!validated.success) {
          console.error('[NextAuth] Invalid credential schema:', credentials)
          return null
        }

        const { email, password } = validated.data
        const user = await getUserByEmail(email)

        if (!user || !user.password) {
          console.error('[NextAuth] User not found or password missing')
          return null
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return null

        return {
          id: user.id,
          email: user.email,
          name: user.fullname,
          role: user.role,
          emailVerified: user.emailVerified,
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },

  debug: process.env.NODE_ENV === 'development',
}

export default authConfig
