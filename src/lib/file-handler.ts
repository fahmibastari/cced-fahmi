import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import fs from 'node:fs/promises'
import path from 'path'

async function ensureFolderExists(folder: string) {
  const storagePath = path.join(process.cwd(), 'public', folder)
  try {
    await fs.access(storagePath) // Periksa apakah folder ada
  } catch {
    await fs.mkdir(storagePath, { recursive: true }) // Buat folder jika belum ada
  }
}

export async function saveFile(folder: string, file: File) {
  // 1. Pastikan folder penyimpanan tersedia
  await ensureFolderExists(folder)

  // 2. Tentukan path penyimpanan berdasarkan folder
  const storagePath = path.join(process.cwd(), 'public', folder)

  // 3. Buat hash unik untuk nama file
  const hash = await bcrypt.hash(
    `${file.name}_${Date.now()}_${Math.random()}`,
    10
  )

  // 4. Ekstrak ekstensi file dari tipe file
  const fileType = file.type?.split('/')[1]
  if (!fileType) {
    throw new Error('Invalid file type') // Jika tipe file tidak valid, lemparkan error
  }

  // 5. Buat nama file yang aman menggunakan hash
  const fileName = hash.replace(/\//g, '_')
  const newFilePath = path.join(storagePath, `${fileName}.${fileType}`)

  // 6. Konversi file menjadi buffer untuk ditulis ke disk
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  // 7. Simpan file ke path penyimpanan
  await fs.writeFile(newFilePath, buffer)

  // 8. Simpan informasi file ke basis data menggunakan Prisma ORM
  return await prisma.file.create({
    data: {
      name: file.name, // Nama asli file
      type: file.type, // Tipe file (MIME type)
      size: file.size, // Ukuran file (dalam byte)
      src: `/${folder}/${fileName}.${fileType}`, // Path relatif dari file (untuk akses URL)
      path: newFilePath, // Path absolut dari file di server
    },
  })
}

export const updateFile = async (id: string, file: File) => {
  // 1. Cari file berdasarkan ID di database
  const fileToUpdate = await prisma.file.findUnique({ where: { id } })
  if (!fileToUpdate) {
    throw new Error('File not found')
  }

  // 2. Tentukan folder penyimpanan
  const folder = path.dirname(fileToUpdate.path)
  await ensureFolderExists(folder) // Pastikan folder ada

  // 3. Tentukan path penyimpanan file baru
  const storagePath = path.join(process.cwd(), 'public', folder)
  console.log('Storage Path:', storagePath)

  // 4. Validasi file
  const validTypes = ['image/png', 'image/webp']
  const maxSize = 100 * 1024 // 100 KB
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only PNG and WebP are allowed.')
  }
  if (file.size > maxSize) {
    throw new Error('File size exceeds 100 KB.')
  }

  // 5. Buat hash unik untuk nama file
  const hash = await bcrypt.hash(
    `${file.name}_${Date.now()}_${Math.random()}`,
    10
  )

  // 6. Validasi dan dapatkan ekstensi file
  const fileType = file.type?.split('/')[1]
  if (!fileType) {
    throw new Error('Invalid file type')
  }

  // 7. Tentukan nama dan path file baru
  const fileName = `${hash}.${fileType}`
  const newFilePath = path.join(storagePath, fileName)

  // 8. Konversi file menjadi buffer untuk ditulis
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  // 9. Hapus file lama jika ada
  if (await fs.stat(fileToUpdate.path).catch(() => false)) {
    console.log('Deleting old file:', fileToUpdate.path)
    await fs.unlink(fileToUpdate.path)
  } else {
    console.warn('Old file not found:', fileToUpdate.path)
  }

  // 10. Simpan file baru
  console.log('Saving new file:', newFilePath)
  await fs.writeFile(newFilePath, buffer)

  // 11. Perbarui data file di database
  return await prisma.file.update({
    where: { id },
    data: {
      name: file.name,
      type: file.type,
      size: file.size,
      src: `/${folder}/${fileName}`, // Path relatif untuk akses URL
      path: newFilePath, // Path absolut di server
    },
  })
}

export const deleteFile = async (id: string) => {
  const fileToDelete = await prisma.file.findUnique({ where: { id } })
  if (!fileToDelete) {
    throw new Error('File not found')
  }

  try {
    await fs.access(fileToDelete.path)
    await fs.unlink(fileToDelete.path)
  } catch {
    console.warn(`File already deleted or not found: ${fileToDelete.path}`)
  }

  await prisma.file.delete({ where: { id } })
}
