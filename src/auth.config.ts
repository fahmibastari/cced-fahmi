import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from './data/user'
import { signInSchema } from './lib/zod'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'

export const runtime = 'nodejs'

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
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
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = (token as { role?: string }).role
      }
      return session
    },
  },

  pages: {
    signIn: '/login',
  },

  debug: process.env.NODE_ENV === 'development',
}

export default authConfig
