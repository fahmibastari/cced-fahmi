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
import { useMemo, useState } from 'react'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'
import ExcelJS from 'exceljs'

interface MembersControlProps {
  members: any[]
}

const MembersControl = ({ members }: MembersControlProps) => {
  const [membersData, setMembersData] = useState<any[]>(members)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const itemsPerPage = 10

  const totalPages = Math.ceil(membersData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const filteredData = useMemo(() => {
    return membersData
      .filter((member) => {
        const name = member?.user?.fullname?.toLowerCase() || ''
        const email = member?.user?.email?.toLowerCase() || ''
        return (
          name.includes(searchTerm.toLowerCase()) ||
          email.includes(searchTerm.toLowerCase())
        )
      })
      .sort((a, b) => {
        const nameA = a?.user?.fullname?.toLowerCase() || ''
        const nameB = b?.user?.fullname?.toLowerCase() || ''
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
  }, [membersData, searchTerm, sortOrder])
  
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage)
  
  

  const sanitizeFileName = (name: string) =>
    name.replace(/[/\\?%*:|"<>]/g, '-')

  const handleDownloadExcel = async () => {
    if (!membersData.length) return

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Members')

    sheet.columns = [
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Nama Lengkap', key: 'fullname', width: 25 },
      { header: 'Tipe Member', key: 'memberType', width: 15 },
      { header: 'NIM', key: 'nim', width: 15 },
      { header: 'Telepon', key: 'phone', width: 20 },
      { header: 'Alamat', key: 'address', width: 30 },
      { header: 'Kota', key: 'city', width: 20 },
      { header: 'Tanggal Lahir', key: 'birthDate', width: 20 },
      { header: 'Jenis Kelamin', key: 'gender', width: 15 },
      { header: 'ID', key: 'id', width: 30 },
    ]

    membersData.forEach((member) => {
      sheet.addRow({
        email: member?.user?.email || '',
        fullname: member?.user?.fullname || '',
        memberType: member?.memberType || '',
        nim: member?.nim || '',
        phone: member?.phone || '',
        address: member?.address || '',
        city: member?.city || '',
        birthDate: member?.birthDate
          ? new Date(member.birthDate).toLocaleDateString('id-ID')
          : '',
        gender: member?.gender || '',
        id: member?.id || '',
      })
    })

    sheet.getRow(1).font = { bold: true }
    sheet.getRow(1).alignment = { horizontal: 'center' }

    const wrapColumns = ['address']
    wrapColumns.forEach((key) => {
      sheet.getColumn(key).alignment = { wrapText: true }
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Daftar_Member.xlsx`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  const handleClickDelete = async (id: string) => {
    try {
      const response = await deleteMember(id)

      if (response.success) {
        setMembersData((prev) =>
          prev.filter((member) => member.id !== id)
        )
        setSuccessMessage(response.success)
        setErrorMessage('')
        setCurrentPage(1)
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
  <div>
    <h1 className="text-2xl font-bold text-[#025908] mb-2">Tabel Member</h1>
    <input
      type="text"
      placeholder="Cari berdasarkan nama atau email..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
      }}
      className="border px-2 py-1 rounded w-full md:w-96"
    />
  </div>

  <div className="flex gap-4 items-center">
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
      className="border rounded px-2 py-1"
    >
      <option value="asc">Urut A-Z</option>
      <option value="desc">Urut Z-A</option>
    </select>

    <button
      onClick={handleDownloadExcel}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Download Excel
    </button>
  </div>
</div>


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
          {currentData.length < 1 ? (
            <TableRow>
              <TableCell colSpan={11} className='h-24 text-center'>
                <FormError message='Tidak ada pengguna' />
              </TableCell>
            </TableRow>
          ) : (
            currentData.map((member: any) => (
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
                  {member?.birthDate
                    ? new Date(member.birthDate).toLocaleDateString('id-ID')
                    : '-'}
                </TableCell>
                <TableCell>{member?.gender || '-'}</TableCell>
                <TableCell>{member.id}</TableCell>
                <TableCell className='text-right'>
                  <ButtonAction
                    id={member.id}
                    handleClickDelete={() => handleClickDelete(member.id)}
                    isVerified={false}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 text-sm text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  )
}

export default MembersControl
