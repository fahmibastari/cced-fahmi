import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email?: string
    emailVerified?: Date | null
    role?: string
  }

  interface Session {
    user: {
      id: string
      email?: string
      role?: string
    } & DefaultSession['user']
  }
}
