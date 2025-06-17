import NextAuthHandler from 'next-auth'
import authConfig from '@/auth.config'

export const runtime = 'nodejs'

const { GET, POST } = NextAuthHandler(authConfig).handlers

export { GET, POST }
