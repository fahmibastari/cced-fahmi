// src/middleware.ts

import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import {
  apiAuthPrefix,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  blogPrefix,
  kegiatanPrefix,
  assessmentPrefix,
  aboutPrefix,
  apiPublicPrefix,
  adminRoutes,
} from './routes'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getToken({ req })
  const isLoggedIn = !!token

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
  const isApiPublicRoute = pathname.startsWith(apiPublicPrefix)
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)
  const isBlogRoute = pathname.startsWith(blogPrefix)
  const iskegiatanRoute = pathname.startsWith(kegiatanPrefix)
  const isAssessmentRoute = pathname.startsWith(assessmentPrefix)
  const isAboutRoute = pathname.startsWith(aboutPrefix)
  const isJobDetailRoute = pathname.startsWith('/jobs')

  if (pathname === adminRoutes) return NextResponse.next()

  if (
    isApiAuthRoute ||
    isApiPublicRoute ||
    isBlogRoute ||
    iskegiatanRoute ||
    isAssessmentRoute ||
    isAboutRoute
  ) {
    return NextResponse.next()
  }

  if (isPublicRoute || isJobDetailRoute) return NextResponse.next()

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
