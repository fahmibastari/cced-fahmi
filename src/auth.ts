import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import prisma from './lib/prisma'
import { getUserById } from './data/user'
import { Role } from '@prisma/client'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
      } else {
        const dbUser = await getUserById(token.sub!)
        if (dbUser) {
          token.role = dbUser.role
          token.email = dbUser.email
        }
      }
      return token
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
        session.user.email = token.email as string
      }
      return session
    },
  },

  ...authConfig,
})
