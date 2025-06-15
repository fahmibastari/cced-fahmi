/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import prisma from '@/lib/prisma'
import { saveFile } from '@/lib/file-handler'
import { companySchema, memberSchema, userSchema } from '@/lib/zod'
import bcrypt from 'bcrypt'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import * as z from 'zod'
import { getUserByEmail } from '@/data/user'
import { Role } from '@prisma/client'

function convertMemberTypeToString(type: string): string {
  switch (type) {
    case 'ALUMNI_UNILA':
      return 'alumni unila'
    case 'MAHASISWA_UNILA':
      return 'mahasiswa unila'
    case 'ALUMNI_NON_UNILA':
      return 'alumni non unila'
    case 'MAHASISWA_NON_UNILA':
      return 'mahasiswa non unila'
    default:
      return ''
  }
}

export const registerMember = async (value: z.infer<typeof memberSchema>) => {
  const validatedFields = memberSchema.safeParse(value)
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
    memberType,
    nim,
    phone,
    studyLevel,
    major,
  } = data

  const emailExists = await getUserByEmail(email)
  if (emailExists) {
    return { error: 'Email sudah terdaftar' }
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  const emailVerified = role === 'MEMBER' ? new Date(Date.now()) : null

  // Membuat user baru
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

  // Convert memberType ke string biasa
  const memberTypeString = convertMemberTypeToString(memberType)

  // Membuat member baru dengan memberType string
  await prisma.member.create({
    data: {
      userId: user.id,
      memberType: memberTypeString,
      nim: nim ?? '',
      phone,
      studyLevel: studyLevel ?? '',
      major: major ?? '',
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

  const [emailExists, logoFile, berkasFile] = await Promise.all([
    getUserByEmail(email),
    logo ? saveFile('company-logos', logo) : undefined,
    berkas ? saveFile('company-berkas', berkas) : undefined,
  ])

  if (emailExists) {
    return { error: 'Email sudah terdaftar' }
  }

  if (!berkasFile) {
    return { error: 'Berkas diperlukan' }
  }

  if (!logoFile) {
    return { error: 'Logo diperlukan' }
  }

  const hashedPassword = await bcrypt.hash(password, 8)

  try {
    const user = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
        password: hashedPassword,
        role: role as Role,
      },
    })

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

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

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

  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const emailVerified = role === 'MEMBER' ? new Date(Date.now()) : null
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
