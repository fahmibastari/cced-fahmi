export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='w-full flex flex-col items-center justify-center bg-gray-50'>
      {children}
    </section>
  )
}
