import { signOut } from '@/auth'

const ButtonLogout = () => {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button type='submit'>Logout</button>
    </form>
  )
}

export default ButtonLogout
