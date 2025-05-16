// 'use client'

// import { Article, News } from '@prisma/client'
// import { useState } from 'react'
// import { Button } from '../ui/button'
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
// import { deleteArticle, deleteNews } from '@/actions/admin-action'
// import { FormError } from '../auth/form-error'
// import { FormSuccess } from '../auth/form-succsess'
// import Link from 'next/link'

// interface ContentsControlProps {
//   news: News[]
//   article: Article[]
// }

// const ContentsControl = ({ news, article }: ContentsControlProps) => {
//   const [currentData, setCurrentData] = useState<string>('News')
//   const [errorMessage, setErrorMessage] = useState('')
//   const [successMessage, setSuccessMessage] = useState('')
//   const [contentsData, setContentsData] = useState<News[] | Article[]>(news)

//   const handleClickDelete = async (id: string) => {
//     try {
//       if (currentData === 'News') {
//         await deleteNews(id).then((res) => {
//           setContentsData((prev) => prev.filter((prev) => prev.id !== id))
//           setSuccessMessage(res.success ?? '')
//           setErrorMessage(res.error ?? '')
//         })
//       } else {
//         await deleteArticle(id).then((res) => {
//           setContentsData((prev) => prev.filter((prev) => prev.id !== id))
//           setSuccessMessage(res.success ?? '')
//           setErrorMessage(res.error ?? '')
//         })
//       }
//     } catch {
//       alert('Terjadi kesalahan saat menghapus konten')
//     }
//   }

//   return (
//     <main className='p-6'>
//       <h1 className='text-2xl font-bold text-[#025908] mb-4'>
//         Tabel {currentData}
//       </h1>
//       <div className='flex gap-5 my-4'>
//         <Button
//           size={'sm'}
//           className='px-4'
//           onClick={() => {
//             setContentsData(news)
//             setCurrentData('News')
//           }}
//           variant='default'
//         >
//           News
//         </Button>
//         <Button
//           size={'sm'}
//           className='px-4'
//           onClick={() => {
//             setContentsData(article)
//             setCurrentData('Article')
//           }}
//           variant='default'
//         >
//           Article
//         </Button>
//         <Link href='/admin/content-create'>
//           <Button size={'sm'} className='px-4' variant='outline'>
//             Buat Konten Baru
//           </Button>
//         </Link>
//       </div>
//       {errorMessage && <FormError message={errorMessage} />}
//       {successMessage && <FormSuccess message={successMessage} />}
//       <Table className='mt-4'>
//         <TableCaption>Daftar List Contents</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className='w-[300px]'>ID</TableHead>
//             <TableHead>Judul</TableHead>
//             <TableHead>Dibuat</TableHead>
//             <TableHead>Diupdate</TableHead>
//             <TableHead className='text-right'>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {contentsData.length < 1 ? (
//             <TableRow>
//               <TableCell colSpan={5} className='h-24 text-center'>
//                 <FormError message='Tidak ada contents' />
//               </TableCell>
//             </TableRow>
//           ) : (
//             contentsData.map((content: News | Article) => (
//               <TableRow key={content.id}>
//                 <TableCell>{content.id}</TableCell>
//                 <TableCell>
//                   {content.title.length < 80
//                     ? content.title
//                     : `${content.title.slice(0, 80)}...`}
//                 </TableCell>
//                 <TableCell>{new Date(content.createdAt).toLocaleDateString()}</TableCell>
//                 <TableCell>{new Date(content.updatedAt).toLocaleDateString()}</TableCell>
//                 <TableCell className='text-right flex gap-2 justify-end'>
//                   <Link href={`/admin/content-create?id=${content.id}`}>
//                     <Button size='sm' variant='secondary'>Edit</Button>
//                   </Link>
//                   <ButtonAction
//                     id={content.id}
//                     handleClickDelete={() => handleClickDelete(content.id)}
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

// export default ContentsControl
