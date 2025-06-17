import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from './data/user'
import { signInSchema } from './lib/zod'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig, Session, User } from 'next-auth'
import type { AdapterUser } from 'next-auth/adapters'
import type { JWT } from 'next-auth/jwt'

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
          emailVerified: user.emailVerified, // ← kalau kamu pakai session/jwt
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as string
      }
      return session
    },

    async jwt({
      token,
      user,
    }: {
      token: JWT
      user?: User | AdapterUser
    }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
  },

  pages: {
    signIn: '/login',
  },

  debug: process.env.NODE_ENV === 'development',
}

export default authConfig
