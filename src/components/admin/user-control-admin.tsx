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
import { useMemo, useState } from 'react'
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
  const [filterRole, setFilterRole] = useState<string>('semua')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10



  const handleClickDelete = async (id: string) => {
    try {
      const response = await deleteUser(id)

      if (response.success) {
        setUsersData((prevUsers) => prevUsers.filter((user) => user.id !== id))
        setSuccessMessage(response.success)
        setErrorMessage('')
        console.log('Success:', response.success)
      } else if (response.error) {
        setErrorMessage(response.error)
        setSuccessMessage('')
        console.log('Error:', response.error)
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
  const filteredUsers = useMemo(() => {
    return usersData
      .filter((user) =>
        (filterRole === 'semua' || user.role.toLowerCase() === filterRole) &&
        (
          user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (!a.fullname) return 1
        if (!b.fullname) return -1
        if (a.fullname.toLowerCase() < b.fullname.toLowerCase()) return sortOrder === 'asc' ? -1 : 1
        if (a.fullname.toLowerCase() > b.fullname.toLowerCase()) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
  }, [usersData, filterRole, searchTerm, sortOrder])
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  


    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold text-[#025908] mb-4">Tabel Pengguna</h1>
  
        {/* Filter dan sort */}
        <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 items-center">
    <select
      value={filterRole}
      onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1) }}
      className="border rounded px-2 py-1"
    >
      <option value="semua">Semua Role</option>
      <option value="admin">Admin</option>
      <option value="company">Company</option>
      <option value="member">Member</option>
    </select>

    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
      className="border rounded px-2 py-1"
    >
      <option value="asc">Urut A-Z</option>
      <option value="desc">Urut Z-A</option>
    </select>

    <input
      type="text"
      placeholder="Cari nama/email..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
      }}
      className="border px-2 py-1 rounded"
    />
  </div>
        </div>
  
        {/* Tabel */}
        <Table className="mt-4">
          <TableCaption>Daftar List Pengguna</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Role</TableHead>
              
              <TableHead>Berkas</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {filteredUsers.length < 1 ? (
    <TableRow>
      <TableCell colSpan={6} className="h-24 text-center">
        <FormError message="Tidak ada pengguna" />
      </TableCell>
    </TableRow>
  ) : (
    currentUsers.map((user) => (
      <TableRow key={user.id}>
        <TableCell className="font-medium">{user.email}</TableCell>
<TableCell>{user.fullname}</TableCell>
<TableCell>{user.role}</TableCell>

<TableCell>
  {user.role === 'COMPANY' && user.company?.berkas ? (
    <a href={user.company.berkas.src} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Download</a>
  ) : '-'}
</TableCell>


        <TableCell className="text-right">
          <ButtonActionUsers
            id={user.id}
            showDelete={authenticatedUser.id !== user.id}
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

export default UsersControl