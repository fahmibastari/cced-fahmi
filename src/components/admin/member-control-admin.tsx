/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { deleteMember } from '@/actions/admin-action'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ButtonAction from './utils/action-button'
import { useState } from 'react'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'

interface MembersControlProps {
  members: any[]
}

const MembersControl = ({ members }: MembersControlProps) => {
  const [membersData, setMembersData] = useState<any[]>(members)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleClickDelete = async (id: string) => {
    try {
      const response = await deleteMember(id)

      if (response.success) {
        setMembersData((prevmembers) =>
          prevmembers.filter((company) => company.id !== id)
        )
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

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold text-[#025908] mb-4'>Tabel Member</h1>
      {errorMessage && <FormError message={errorMessage} />}
      {successMessage && <FormSuccess message={successMessage} />}
      <Table className='mt-4'>
        <TableCaption>Daftar List Member</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Email</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Tipe Member</TableHead>
            <TableHead>NIM</TableHead>
            <TableHead>Nomor Telepon</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Kota</TableHead>
            <TableHead>Tanggal Lahir</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>ID Member</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {membersData.length < 1 ? (
            <TableRow>
              <TableCell colSpan={11} className='h-24 text-center'>
                <FormError message='Tidak ada pengguna' />
              </TableCell>
            </TableRow>
          ) : (
            membersData.map((member: any) => (
              <TableRow key={member.id}>
                <TableCell className='font-medium'>
                  {member?.user?.email}
                </TableCell>
                <TableCell className='font-medium'>
                  {member?.user?.fullname}
                </TableCell>
                <TableCell>{member?.memberType || '-'}</TableCell>
                <TableCell>{member?.nim || '-'}</TableCell>
                <TableCell>{member?.phone || '-'}</TableCell>
                <TableCell>{member?.address || '-'}</TableCell>
                <TableCell>{member?.city || '-'}</TableCell>
                <TableCell>
                  {member?.birthDate?.toLocaleDateString('id-ID') || '-'}
                </TableCell>
                <TableCell>{member?.gender || '-'}</TableCell>
                <TableCell>{member.id}</TableCell>
                <TableCell className='text-right'>
                  <ButtonAction
                    id={member.id}
                    handleClickDelete={() => handleClickDelete(member.id)} isVerified={false}                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </main>
  )
}

export default MembersControl
