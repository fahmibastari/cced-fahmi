import authConfig from './auth.config'
import NextAuth from 'next-auth'
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

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const { pathname } = nextUrl

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isApiPublicRoute = nextUrl.pathname.startsWith(apiPublicPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isBlogRoute = nextUrl.pathname.startsWith(blogPrefix)
  const iskegiatanRoute = nextUrl.pathname.startsWith(kegiatanPrefix)
  const isAssessmentRoute = nextUrl.pathname.startsWith(assessmentPrefix)
  const isAboutRoute = nextUrl.pathname.startsWith(aboutPrefix)
  const isJobDetailRoute = nextUrl.pathname.startsWith('/jobs')

  // Allow spesific admin
  if (pathname === adminRoutes) return

  // Allow blog, kegiatan, assessment, about, public API, and auth API routes
  if (
    isBlogRoute ||
    iskegiatanRoute ||
    isAssessmentRoute ||
    isAboutRoute ||
    isApiPublicRoute ||
    isApiAuthRoute
  ) {
    return
  }

  // Allow public routes
  if (isPublicRoute) return

  // ✅ Allow access to /jobs and /jobs/[id]
  if (isJobDetailRoute) return

  // Redirect logged-in users trying to access auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  // Protect all other routes
  if (!isLoggedIn) {
    return Response.redirect(new URL('/login', nextUrl))
  }

  return
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
