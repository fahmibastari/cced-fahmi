// src/app/api/auth/[...nextauth]/route.ts
import NextAuthHandler from 'next-auth'
import authConfig from '@/auth.config'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

// Ambil langsung handlers-nya
const { GET, POST } = NextAuthHandler(authConfig).handlers

export { GET, POST }
