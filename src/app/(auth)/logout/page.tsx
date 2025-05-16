import { signOut } from '@/auth'

export default function Page() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button
          className='bg-red-500 text-white py-2 px-4 rounded'
          type='submit'
        >
          Logout
        </button>
      </form>
    </div>
  )
}
