// src/auth.config.ts
export const runtime = 'nodejs'

import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'

import { signInSchema } from './lib/zod'
import { getUserByEmail } from './data/user'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateField = signInSchema.safeParse(credentials)
    
        if (validateField.success) {
          const { email, password } = validateField.data
          const user = await getUserByEmail(email)
    
          if (!user || typeof user.password !== 'string') {
            console.error('[NextAuth] User not found or invalid password field', user)
            return null
          }          
    
          const passwordMatch = await bcrypt.compare(password, user.password)
    
          if (passwordMatch) {
            return user
          }
        }
    
        return null
      },
    }),
    
  ],
} satisfies NextAuthConfig
