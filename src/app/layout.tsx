import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layouts/footer'
import Nav from '@/components/layouts/nav'
import { SessionProvider } from 'next-auth/react'
import { currentUser } from '@/lib/authenticate'
import Sidebar from '@/components/layouts/sidebar'
import Header from '@/components/utils/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CCED',
  description: 'Dibuat oleh CCED',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await currentUser()
  const isLoggedIn = !!user
  if (user?.role === 'ADMIN') {
    return (
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className='flex h-screen bg-gray-100'>
            <Sidebar />
            <div className='flex-1 overflow-auto'>
              {/* Header */}
              <Header />
              {children}
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Nav isLoggedIn={isLoggedIn} />
          <div className='pt-32'>{children}</div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}