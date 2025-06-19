import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import { getUserByEmail } from './data/user'
import { signInSchema } from './lib/zod'

export const runtime = 'nodejs'

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials: any) {
        const validated = signInSchema.safeParse(credentials)
        if (!validated.success) return null

        const { email, password } = validated.data
        const user = await getUserByEmail(email)

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return null

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

  pages: {
    signIn: '/login',
  },

  debug: process.env.NODE_ENV === 'development',
}

export default authConfig
