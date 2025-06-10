import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layouts/footer'
import Nav from '@/components/layouts/nav'
import { SessionProvider } from 'next-auth/react'
import { currentUser } from '@/lib/authenticate'
import Sidebar from '@/components/layouts/sidebar'
import Header from '@/components/utils/Header'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
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

  return (
    <html lang='en' className={`${inter.variable} ${robotoMono.variable}`}>
      <body className='antialiased'>
        {user?.role === 'ADMIN' ? (
          <div className='flex h-screen bg-gray-100'>
            <Sidebar />
            <div className='flex-1 overflow-auto'>
              <Header />
              {children}
            </div>
          </div>
        ) : (
          <SessionProvider>
            <Nav isLoggedIn={isLoggedIn} />
            <div className='pt-32'>{children}</div>
            <Footer />
          </SessionProvider>
        )}
      </body>
    </html>
  )
}
