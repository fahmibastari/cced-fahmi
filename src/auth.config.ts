export const runtime = 'nodejs'

import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt' // GANTI dari bcryptjs
import type { NextAuthConfig } from 'next-auth'

import { signInSchema } from './lib/zod'
import { getUserByEmail } from './data/user'

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials)

        if (!validatedFields.success) {
          console.error('[NextAuth] Invalid credential schema:', credentials)
          return null
        }

        const { email, password } = validatedFields.data
        const user = await getUserByEmail(email)

        if (!user || typeof user.password !== 'string') {
          console.error('[NextAuth] User not found or password missing', user)
          return null
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (passwordMatch) {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
            name: user.fullname,
          }
        }

        return user
      },
    }),
  ],

  // Optional: enable JWT if not using database session
  session: { strategy: 'jwt' },

  // Enable debug logs during development
  debug: process.env.NODE_ENV === 'development',
}

export default authConfig