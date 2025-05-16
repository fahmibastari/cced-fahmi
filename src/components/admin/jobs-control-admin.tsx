// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'

// import { deleteJob } from '@/actions/admin-action'
// import { Job } from '@prisma/client'
// import { useState } from 'react'
// import { FormError } from '../auth/form-error'
// import { FormSuccess } from '../auth/form-succsess'
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import ButtonAction from './utils/action-button'

// interface JobsControlProps {
//   jobs: Job[]
// }

// const JobsControl = ({ jobs }: JobsControlProps) => {
//   const [jobsData, setJobsData] = useState<Job[]>(jobs)
//   const [errorMessage, setErrorMessage] = useState('')
//   const [successMessage, setSuccessMessage] = useState('')
//   const handleClickDelete = async (id: string) => {
//     try {
//       const res = await deleteJob(id)
//       setJobsData((prev) => prev.filter((prev) => prev.id !== id))
//       setSuccessMessage(res.success ?? '')
//       setErrorMessage(res.error ?? '')
//     } catch {
//       setErrorMessage('Terjadi kesalahan saat menghapus pekerjaan')
//     }
//   }
//   return (
//     <main className='p-6'>
//       <h1 className='text-2xl font-bold text-[#025908] mb-4'>
//         Tabel Pekerjaan
//       </h1>
//       {errorMessage && <FormError message={errorMessage} />}
//       {successMessage && <FormSuccess message={successMessage} />}
//       <Table className='mt-4'>
//         <TableCaption>Daftar List Contents</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className='w-[100px]'>Dibuat Oleh</TableHead>
//             <TableHead>Pekerjaan</TableHead>
//             <TableHead>Deskripsi</TableHead>
//             <TableHead>Gaji</TableHead>
//             <TableHead>Lokasi</TableHead>
//             <TableHead>Deadline</TableHead>
//             <TableHead>Tipe Pekerjaan</TableHead>
//             <TableHead>Dibuat</TableHead>
//             <TableHead>Diupdate</TableHead>
//             <TableHead className='text-right'>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {jobsData.length < 1 ? (
//             <TableRow>
//               <TableCell colSpan={10} className='h-24 text-center'>
//                 <FormError message='Tidak ada pengguna' />
//               </TableCell>
//             </TableRow>
//           ) : (
//             jobsData.map((job: Job | any) => (
//               <TableRow key={job.id}>
//                 <TableCell>{job.company.companyName}</TableCell>
//                 <TableCell>{job.title}</TableCell>
//                 <TableCell>
//                   {job.description.length < 20
//                     ? job.description
//                     : `${job.description.slice(0, 20)}...`}
//                 </TableCell>
//                 <TableCell>{job.salary}</TableCell>
//                 <TableCell>{job.location}</TableCell>
//                 <TableCell>{job.deadline?.toLocaleDateString()}</TableCell>
//                 <TableCell>{job.type}</TableCell>
//                 <TableCell>{job.createdAt.toLocaleDateString()}</TableCell>
//                 <TableCell>{job.updatedAt.toLocaleDateString()}</TableCell>
//                 <TableCell className='text-right'>
//                   <ButtonAction
//                     id={job.id}
//                     handleClickDelete={() => handleClickDelete(job.id)}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </main>
//   )
// }

// export default JobsControl
