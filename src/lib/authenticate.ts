import { auth } from '@/auth'
import { getUserDetailCompany } from '@/data/userRole'

export const currentUser = async () => {
  const data = await auth()
  return data?.user
}

export const currentUserRole = async () => {
  const data = await auth()
  return data?.user.role
}

export const currentDetailUserCompany = async () => {
  const user = await auth()
  const data = await getUserDetailCompany(user?.user.id || '')
  return data
}
