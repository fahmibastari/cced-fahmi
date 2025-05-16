'use client'

import { deleteUser, verifyCompanyByUserId } from '@/actions/admin-action'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ButtonActionUsers from './utils/action-button'
import { useState } from 'react'
import { User, Company, File } from '@prisma/client'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'

// ✅ Add these interfaces right after your imports
interface ExtendedUser extends User {
  company?: Company & {
    berkas?: File
  }
}

interface UsersControlProps {
  users: any,
  authenticatedUser: any,
}

// Your component
const UsersControl = ({ users,authenticatedUser }: UsersControlProps) => {
  console.log(authenticatedUser);
  const [usersData, setUsersData] = useState<ExtendedUser[]>(users)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleClickDelete = async (id: string) => {
    try {
      const response = await deleteUser(id)

      if (response.success) {
        setUsersData((prevUsers) => prevUsers.filter((user) => user.id !== id))
        setSuccessMessage(response.success)
        setErrorMessage('')
      } else if (response.error) {
        setErrorMessage(response.error)
        setSuccessMessage('')
      }
    } catch {
      setErrorMessage('Terjadi kesalahan saat menghapus pengguna')
      setSuccessMessage('')
    }
  }

  const handleClickVerifikasi = async (id: string) => {
    try {
      const response = await verifyCompanyByUserId(id)
      if (response.success) {
        setSuccessMessage(response.success)
        setErrorMessage('')
      } else if (response.error) {
        setErrorMessage(response.error)
        setSuccessMessage('')
      }
    } catch {
      setErrorMessage('Terjadi kesalahan saat memproses permintaan')
      setSuccessMessage('')
    }
  }

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold text-[#025908] mb-4'>Tabel Pengguna</h1>
      {errorMessage && <FormError message={errorMessage} />}
      {successMessage && <FormSuccess message={successMessage} />}
      <Table className='mt-4'>
        <TableCaption>Daftar List Pengguna</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Email</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Berkas</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.length < 1 ? (
            <TableRow>
              <TableCell colSpan={5} className='h-24 text-center'>
                <FormError message='Tidak ada pengguna' />
              </TableCell>
            </TableRow>
          ) : (
            usersData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className='font-medium'>{user.email}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.role === 'COMPANY' && user.company?.berkas ? (
                    <a
                      href={user.company.berkas.src}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 underline'
                    >
                      Download
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className='text-right'>
                  <ButtonActionUsers
                    id={user.id}
                    showDelete={authenticatedUser.id!==user.id} 
                    isVerified={!!user.emailVerified}
                    handleClickDelete={() => handleClickDelete(user.id)}
                    handleClickVerifikasi={() => handleClickVerifikasi(user.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </main>
  )
}

export default UsersControl