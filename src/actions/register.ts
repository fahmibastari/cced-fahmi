/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import prisma from '@/lib/prisma'
import { saveFile } from '@/lib/file-handler'
import { companySchema, memberSchema, userSchema } from '@/lib/zod'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import * as z from 'zod'
import { getUserByEmail } from '@/data/user'
import { Role } from '@prisma/client'

export const registerMember = async (value: z.infer<typeof memberSchema>) => {
  const validatedFields = memberSchema.safeParse(value)
  if (!validatedFields.success) {
    return { error: 'Harap lengkapi semua kolom' }
  }

  const { data } = validatedFields

  const { username, fullname, email, password, role, memberType, nim, phone } =
    data

  const emailExists = await getUserByEmail(email)
  if (emailExists) {
    return { error: 'Email sudah terdaftar' }
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  const emailVerified = role === 'MEMBER' ? new Date(Date.now()) : null;

  // Membuat pencari kerja
  const user = await prisma.user.create({
    data: {
      username,
      fullname,
      email,
      password: hashedPassword,
      emailVerified,
      role: role as Role,
    },
  })

  await prisma.member.create({
    data: {
      userId: user.id,
      memberType,
      nim: nim ?? '',
      phone,
    },
  })
  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return {
    success: true,
    message: 'Akun berhasil dibuat.',
    role,
  }
}

export const registerCompany = async (value: z.infer<typeof companySchema>) => {
  // Validasi input
  const validatedFields = companySchema.safeParse(value)
  if (!validatedFields.success) {
    return { error: 'Harap lengkapi semua kolom' }
  }

  const { data } = validatedFields
  const {
    username,
    fullname,
    email,
    password,
    role,
    companyName,
    industry,
    ownership,
    phone,
    companyPhone,
    website,
    publicMail,
    bio,
    logo,
    berkas,
  } = data

  // Parallel tasks (cek email, simpan logo dan berkas)
  const [emailExists, logoFile, berkasFile] = await Promise.all([
    getUserByEmail(email),
    logo ? saveFile('company-logos', logo) : undefined,
    berkas ? saveFile('company-berkas', berkas) : undefined,
  ])

  if (emailExists) {
    return { error: 'Email sudah terdaftar' }
  }

  // Pastikan berkas dan logo ada
  if (!berkasFile) {
    return { error: 'Berkas diperlukan' }
  }

  if (!logoFile) {
    return { error: 'Logo diperlukan' }
  }

  // Hash password dengan rounds lebih rendah (8 lebih cepat)
  const hashedPassword = await bcrypt.hash(password, 8)

  try {
    // Membuat pencari kerja di database
    const user = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
        password: hashedPassword,
        role: role as Role,
      },
    })

    // Membuat penyedia kerja
    await prisma.company.create({
      data: {
        userId: user.id,
        logoId: logoFile.id,
        berkasId: berkasFile.id,
        companyName,
        industry,
        ownership,
        phone,
        companyPhone,
        website,
        publicMail,
        bio,
      },
    })

    // Menghasilkan token verifikasi email
    const verificationToken = await generateVerificationToken(email)

    // Mengirimkan email verifikasi
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    // Kembali dengan respons sukses
    return {
      success: true,
      message: 'Akun berhasil dibuat, silahkan tunggu admin mengverifikasi akun anda.',
      role,
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat registrasi:', error)
    return {
      error: 'Terjadi kesalahan selama proses registrasi.',
    }
  }
}

export const registerAdmin = async (value: z.infer<typeof userSchema>) => {
  const validatedFields = userSchema.safeParse(value)
  if (!validatedFields.success) {
    return { error: 'Harap lengkapi semua kolom' }
  }

  const { data } = validatedFields
  const { username, fullname, email, password, role } = data

  const emailExists = await getUserByEmail(email)
  if (emailExists) {
    return { error: 'Email sudah terdaftar' }
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const emailVerified = role === 'MEMBER' ? new Date(Date.now()) : null;
    // Membuat pencari kerja
    await prisma.user.create({

      data: {
        username,
        fullname,
        email,
        password: hashedPassword,
        emailVerified, 
        role: role as Role,
      },
    })

    return {
      success: 'Akun berhasil dibuat!',
    }
  } catch {
    return {
      error: 'Terjadi kesalahan',
    }
  }
}
