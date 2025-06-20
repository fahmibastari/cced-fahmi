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
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
    salt: process.env.AUTH_SALT!,
  })
  const isLoggedIn = !!token
  const { nextUrl } = req

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
  const isApiPublicRoute = pathname.startsWith(apiPublicPrefix)
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)
  const isBlogRoute = pathname.startsWith(blogPrefix)
  const isKegiatanRoute = pathname.startsWith(kegiatanPrefix)
  const isAssessmentRoute = pathname.startsWith(assessmentPrefix)
  const isAboutRoute = pathname.startsWith(aboutPrefix)
  const isJobDetailRoute = pathname.startsWith('/jobs')

  if (pathname === adminRoutes) return NextResponse.next()

  if (
    isApiAuthRoute ||
    isApiPublicRoute ||
    isBlogRoute ||
    isKegiatanRoute ||
    isAssessmentRoute ||
    isAboutRoute
  ) {
    return NextResponse.next()
  }

  if (isPublicRoute || isJobDetailRoute) return NextResponse.next()

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
