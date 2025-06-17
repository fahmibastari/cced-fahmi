import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { signInSchema } from './lib/zod'
import { getUserByEmail } from './data/user'
import type { NextAuthConfig } from 'next-auth'
import type { AdapterUser } from 'next-auth/adapters'
import type { JWT } from 'next-auth/jwt'
import type { Session } from 'next-auth'

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

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return null

        return {
          id: user.id,
          email: user.email,
          name: user.fullname ?? '',
          role: user.role ?? '',
          emailVerified: user.emailVerified ?? null,
          image: null,
        } satisfies AdapterUser
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
        token.sub = user.id
      }
      return token
    },
  
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role
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
