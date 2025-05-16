/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import { RequestVerified } from '@prisma/client'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'
import { deleteRequestVerified } from '@/actions/admin-action'
import { Button } from '../ui/button'

interface RequestControlProps {
  request: RequestVerified[]
}

const RequestControl = ({ request }: RequestControlProps) => {
  const [usersData, setUsersData] = useState<RequestVerified[]>(request)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const handleClickDelete = async (id: string, companyId: string) => {
    try {
      const response = await deleteRequestVerified(id, companyId)

      if (response.success) {
        setUsersData((prev) => prev.filter((req) => req.id !== id))
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
      <h1 className='text-2xl font-bold text-[#025908] mb-4'>
        Tabel Permintaan Verifikasi
      </h1>
      {errorMessage && <FormError message={errorMessage} />}
      {successMessage && <FormSuccess message={successMessage} />}
      <Table className='mt-4'>
        <TableCaption>Daftar List Permintaan</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nama Penyedia Kerja</TableHead>
            <TableHead>Dibuat</TableHead>
            <TableHead>Diubah</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.length < 1 ? (
            <TableRow>
              <TableCell colSpan={5} className='h-24 text-center'>
                <FormError message='Tidak ada request' />
              </TableCell>
            </TableRow>
          ) : (
            usersData.map((req: RequestVerified | any) => (
              <TableRow key={req.id}>
                <TableCell className='font-medium'>{req.id}</TableCell>
                <TableCell>{req.company.companyName}</TableCell>
                <TableCell>{req.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>{req.updatedAt.toLocaleDateString()}</TableCell>
                <TableCell className='text-right'>
                  <div className='flex gap-4 justify-end'>
                    <Button
                      onClick={() => handleClickDelete(req.id, req.companyId)}
                      variant={'default'}
                      className='bg-blue-500 hover:bg-blue-700'
                      size={'sm'}
                    >
                      Verifikasi
                    </Button>
                    <Button
                      size={'sm'}
                      variant={'default'}
                      className='bg-green-500 hover:bg-green-700'
                    >
                      Detail {req.id.slice(0, 5)}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </main>
  )
}

export default RequestControl
