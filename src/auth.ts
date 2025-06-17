// src/auth.ts
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import prisma from './lib/prisma'
import { getUserById } from './data/user'
import { Role } from '@prisma/client'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false
      const existingUser = await getUserById(user.id ?? '')
      if (!existingUser?.emailVerified) {
        return false
      }
      return true
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const user = await getUserById(token.sub)
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as Role
      }
      return session
    },
  },
  ...authConfig,
})
