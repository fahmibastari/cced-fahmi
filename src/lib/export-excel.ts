// import { Workbook } from 'exceljs';
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/lib/prisma';  // Pastikan prisma diimpor untuk mengambil data dari database

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       // Ambil data pelamar dari database dengan relasi user dan skills
//       const applicants = await prisma.jobApplication.findMany({
//         include: {
//           user: true,  // Pastikan data user (fullname, email, dll) tersedia
//           skills: true,  // Pastikan data skills tersedia
//         },
//       });

//       const workbook = new Workbook();
//       const worksheet = workbook.addWorksheet('Pelamar');

//       // Menentukan kolom header untuk file Excel
//       worksheet.columns = [
//         { header: 'Nama', key: 'name' },
//         { header: 'Email', key: 'email' },
//         { header: 'Skills', key: 'skills' },
//         { header: 'Status', key: 'status' },
//       ];

//       // Memasukkan data pelamar ke dalam worksheet
//       applicants.forEach((applicant) => {
//         worksheet.addRow({
//           name: applicant.user?.fullname,  // Mengakses nama dari user
//           email: applicant.user?.email,  // Mengakses email dari user
//           skills: applicant.skills?.join(', '),  // Misalnya skill berupa array
//           status: applicant.status,
//         });
//       });

//       // Mengirimkan file Excel sebagai response
//       const buffer = await workbook.xlsx.writeBuffer();
//       res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//       res.setHeader('Content-Disposition', 'attachment; filename=daftar_pelamar.xlsx');
//       res.send(buffer);

//     } catch (error) {
//       res.status(500).json({ error: 'Terjadi kesalahan saat membuat file Excel' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
