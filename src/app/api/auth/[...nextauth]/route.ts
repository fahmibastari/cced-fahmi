// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

export const runtime = 'nodejs'

const handler = NextAuth(authConfig)

// src/app/api/auth/[...nextauth]/route.ts
export { handlers as GET, handlers as POST } from '@/auth'

