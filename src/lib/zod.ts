import { sizeInMB } from '@/lib/utils'
import { Role } from '@prisma/client'
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
    username: z
      .string({ required_error: 'Username wajib diisi' })
      .min(3, 'Username minimal 3 karakter'),
    fullname: z
      .string({ required_error: 'Nama lengkap wajib diisi' })
      .min(3, 'Nama lengkap minimal 3 karakter'),
    email: z
      .string({ required_error: 'Email wajib diisi' })
      .email('Format email tidak valid'),
    password: z
      .string({ required_error: 'Password wajib diisi' })
      .min(8, 'Password minimal 8 karakter'),
    confirmPassword: z
      .string({ required_error: 'Konfirmasi password wajib diisi' })
      .min(8, 'Konfirmasi password minimal 8 karakter'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password tidak sama',
    path: ['confirmPassword'],
  })

// Member schema extending userSchema
export const memberSchema = z
  .object({
    role: z.string({ required_error: 'Peran wajib diisi' }),
    username: z
      .string({ required_error: 'Username wajib diisi' })
      .min(3, 'Username minimal 3 karakter'),
    fullname: z
      .string({ required_error: 'Nama lengkap wajib diisi' })
      .min(3, 'Nama lengkap minimal 3 karakter'),
    email: z
      .string({ required_error: 'Email wajib diisi' })
      .email('Format email tidak valid'),
    password: z
      .string({ required_error: 'Password wajib diisi' })
      .min(8, 'Password minimal 8 karakter'),
    confirmPassword: z
      .string({ required_error: 'Konfirmasi password wajib diisi' })
      .min(8, 'Konfirmasi password minimal 8 karakter'),
    memberType: z.enum(
      ['ALUMNI_UNILA', 'MAHASISWA_UNILA', 'ALUMNI_NON_UNILA', 'MAHASISWA_NON_UNILA'],
      { required_error: 'Tipe member wajib diisi' }
    ),
    nim: z.string().optional(),
    phone: z
      .string({ required_error: 'Nomor telepon wajib diisi' })
      .min(10, 'Nomor telepon minimal 10 digit'),
    studyLevel: z
      .string({ required_error: 'Jenjang studi wajib diisi' })
      .min(1, 'Jenjang studi wajib diisi'),
    major: z
      .string({ required_error: 'Jurusan wajib diisi' })
      .min(1, 'Jurusan wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password harus sama dengan password',
    path: ['confirmPassword'],
  });



// Company schema extending userSchema
export const companySchema = z
  .object({
    role: z.nativeEnum(Role).nullable(),
    username: z
      .string({ required_error: 'Username wajib diisi' })
      .min(3, 'Username minimal 3 karakter'),
    fullname: z
      .string({ required_error: 'Nama lengkap wajib diisi' })
      .min(3, 'Nama lengkap minimal 3 karakter'),
    email: z
      .string({ required_error: 'Email wajib diisi' })
      .email('Format email tidak valid'),
    password: z
      .string({ required_error: 'Password wajib diisi' })
      .min(8, 'Password minimal 8 karakter'),
    confirmPassword: z
      .string({ required_error: 'Konfirmasi password wajib diisi' })
      .min(8, 'Konfirmasi password minimal 8 karakter'),

    // opsional berkas
    berkas: z.any().optional(),

    // validasi logo
    logo: z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), {
        message: 'Logo harus berupa file gambar (png, jpg, jpeg, webp)',
      })
      .refine((file) => sizeInMB(file.size) <= MAX_FILE_SIZE, {
        message: `Logo harus lebih kecil dari atau sama dengan ${MAX_FILE_SIZE} MB`,
      })
      .optional(),

    companyName: z
      .string({ required_error: 'Nama perusahaan wajib diisi' })
      .min(3, 'Nama perusahaan minimal 3 karakter'),
    industry: z
      .string({ required_error: 'Bidang industri wajib diisi' })
      .min(3, 'Bidang industri minimal 3 karakter'),
    ownership: z
      .string({ required_error: 'Jenis kepemilikan wajib diisi' })
      .min(3, 'Jenis kepemilikan minimal 3 karakter'),
    phone: z
      .string({ required_error: 'Nomor telepon wajib diisi' })
      .min(10, 'Nomor telepon minimal 10 digit'),
    companyPhone: z
      .string({ required_error: 'Nomor telepon perusahaan wajib diisi' })
      .min(10, 'Nomor telepon perusahaan minimal 10 digit'),
    website: z
      .string({ required_error: 'Website perusahaan wajib diisi' })
      .min(1, 'Website perusahaan wajib diisi'),
    publicMail: z
      .string({ required_error: 'Email publik wajib diisi' })
      .min(1, 'Email publik wajib diisi'),
    bio: z
      .string({ required_error: 'Biodata perusahaan wajib diisi' })
      .min(1, 'Biodata perusahaan wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password harus sama dengan password',
    path: ['confirmPassword'],
  });

// Register schema as a union of member and company schemas
export const registerSchema = z.union([memberSchema, companySchema])

export const JobSchema = z.object({
  title: z.string({
    required_error: 'Judul wajib diisi',
    invalid_type_error: 'Judul harus berupa teks',
  }).min(1, 'Judul wajib diisi'),

  description: z.string().nullable().optional(),

  requirements: z.array(z.string({
    required_error: 'Setiap persyaratan harus berupa teks',
    invalid_type_error: 'Format persyaratan tidak valid',
  })).min(1, 'Setidaknya satu persyaratan diperlukan'),

  location: z.string().nullable().optional(),

  deadline: z.date({
    invalid_type_error: 'Tanggal deadline tidak valid',
  }).nullable().optional(),

  status: z.string().nullable().optional(),

  skills: z.array(z.string({
    required_error: 'Keahlian harus berupa teks',
    invalid_type_error: 'Format keahlian tidak valid',
  })).min(0, 'Setidaknya satu keahlian diperlukan'),

  type: z.string().nullable().optional(),

  salary: z.string().nullable().optional(),
  posterUrl: z.string().url().optional().or(z.literal('')), // untuk valid URL kosong

  employmentType: z.string().optional(),

  workTime: z.string().optional(),
})


// Validasi untuk model JobApplication
export const JobApplicationSchema = z.object({
  notes: z.string({
    invalid_type_error: 'Catatan harus berupa teks',
  }).nullable().optional(),

  resumeMember: z.string({
    invalid_type_error: 'Resume harus berupa tautan atau teks',
  }).nullable().optional(),
})


export const updateUserSchema = z.object({
  username: z.string({
    required_error: 'Username wajib diisi',
    invalid_type_error: 'Username harus berupa teks',
  }).min(3, 'Username minimal 3 karakter'),

  fullname: z.string({
    required_error: 'Nama lengkap wajib diisi',
    invalid_type_error: 'Nama lengkap harus berupa teks',
  }).min(3, 'Nama lengkap minimal 3 karakter'),
})


export const updateCompanySchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter').optional(),
  fullname: z.string().min(3, 'Nama lengkap minimal 3 karakter').optional(),
  companyName: z.string().min(3, 'Nama perusahaan minimal 3 karakter').optional(),
  industry: z.string().min(3, 'Bidang industri minimal 3 karakter').optional(),
  ownership: z.string().min(3, 'Jenis kepemilikan minimal 3 karakter').optional(),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit').optional(),
  companyPhone: z.string().min(10, 'Nomor telepon perusahaan minimal 10 digit').optional(),
  website: z.string().min(1, 'Website wajib diisi').optional(),
  publicMail: z.string().min(1, 'Email publik wajib diisi').optional(),
  bio: z.string().min(1, 'Biodata wajib diisi').optional(),
  address: z.string().min(1, 'Alamat wajib diisi').optional(),
  city: z.string().min(1, 'Kota wajib diisi').optional(),
})


export const updateMemberSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter').optional(),
  fullname: z.string().min(3, 'Nama lengkap minimal 3 karakter').optional(),
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
  studyLevel: z.string().optional(),
  major: z.string().optional(),
})


