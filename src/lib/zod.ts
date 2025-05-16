import { sizeInMB } from '@/lib/utils'
import { MemberType, Role } from '@prisma/client'
import { z } from 'zod'

const MAX_FILE_SIZE = 1

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email wajib diisi' })
    .min(1, 'Email wajib diisi')
    .email('Email tidak valid'),
  password: z
    .string({ required_error: 'Kata sandi wajib diisi' })
    .min(1, 'Kata sandi wajib diisi'),
})

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email wajib diisi' })
    .min(1, 'Email wajib diisi')
    .email('Email tidak valid'),
})

export const resetPasswordSchema = z.object({
  password: z
    .string({ required_error: 'Kata sandi wajib diisi' })
    .min(8, 'Kata sandi harus lebih dari 8 karakter'),
})
// Base user schema
export const userSchema = z
  .object({
    role: z.nativeEnum(Role).nullable(),
    username: z.string().min(3),
    fullname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi harus sama',
    path: ['confirmPassword'],
  })

// Member schema extending userSchema
export const memberSchema = z.object({
  role: z.string(),
  username: z.string().min(3),
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  memberType: z.enum(['ALUMNI_UNILA', 'MAHASISWA_UNILA', 'ALUMNI_NON_UNILA', 'MAHASISWA_NON_UNILA']),
  nim: z.string().optional(),
  phone: z.string().min(10),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Kata sandi tidak cocok',
  path: ['confirmPassword'],
});

// Company schema extending userSchema
export const companySchema = z
  .object({
    role: z.nativeEnum(Role).nullable(),
    username: z.string().min(3),
    fullname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    berkas: z.any().optional(),
    logo: z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), {
        message: 'Logo harus berupa file gambar',
      })
      .refine((file) => sizeInMB(file.size) <= MAX_FILE_SIZE, {
        message: `Logo harus lebih kecil dari atau sama dengan ${MAX_FILE_SIZE} MB`,
      })
      .optional(),
    companyName: z.string().min(3),
    industry: z.string().min(3),
    ownership: z.string().min(3),
    phone: z.string().min(10),
    companyPhone: z.string().min(10),
    website: z.string(),
    publicMail: z.string(),
    bio: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi harus sama',
    path: ['confirmPassword'],
  })

// Register schema as a union of member and company schemas
export const registerSchema = z.union([memberSchema, companySchema])

export const JobSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  description: z.string().nullable().optional(),
  requirements: z
    .array(z.string())
    .min(1, 'Setidaknya satu persyaratan diperlukan'),
  location: z.string().nullable().optional(),
  deadline: z.date().nullable().optional(),
  status: z.string().nullable().optional(),
  skills: z.array(z.string()).min(0, 'Setidaknya satu keahlian diperlukan'),
  type: z.string().nullable().optional(),
  salary: z.string().nullable().optional(),
  employmentType: z.string().optional(), // Pastikan ini ada
  workTime: z.string().optional(),  
})

// Validasi untuk model JobApplication
export const JobApplicationSchema = z.object({
  notes: z.string().nullable().optional(),
  resumeMember: z
    .string()
    .min(1, 'Resume wajib diisi')
    .max(5000, 'Resume tidak boleh lebih dari 5000 karakter'),
})

export const updateUserSchema = z.object({
  username: z.string().min(3),
  fullname: z.string().min(3),
})

export const updateCompanySchema = z.object({
  username: z.string().min(3).optional(),
  fullname: z.string().min(3).optional(),
  companyName: z.string().min(3).optional(),
  industry: z.string().min(3).optional(),
  ownership: z.string().min(3).optional(),
  phone: z.string().min(10).optional(),
  companyPhone: z.string().min(10).optional(),
  website: z.string().min(1).optional(),
  publicMail: z.string().min(1).optional(),
  bio: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
})

export const updateMemberSchema = z.object({
  username: z.string().min(3).optional(),
  fullname: z.string().min(3).optional(),
  memberType: z.string().optional(),
  nim: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  birthDate: z.date().nullable().optional(),
  gender: z.string().optional(),
  about: z.string().optional(),
  resume: z.string().optional(),
  cv: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
})
