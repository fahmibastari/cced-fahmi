'use server'

import * as z from 'zod'
import {
  JobApplicationSchema,
  JobSchema,
  updateCompanySchema,
} from '../lib/zod'
import { currentDetailUserCompany } from '@/lib/authenticate'
import prisma from '@/lib/prisma'
import { saveFile } from '@/lib/file-handler'

export async function addNewJob(formData: FormData) {
  try {
    const user = await currentDetailUserCompany()

    if (!user?.id) {
      return {
        error: 'Pencari kerja tidak terautentikasi atau tidak tergabung dalam penyedia kerja!',
      }
    }

    // 1. Ambil field JSON dari FormData
    const raw = {
      title: formData.get('title') ?? '',
      description: formData.get('description') ?? '',
      salary: formData.get('salary') ?? '',
      requirements: JSON.parse(formData.get('requirements') as string || '[]'),
      skills: JSON.parse(formData.get('skills') as string || '[]'),
      location: formData.get('location') || null,
      status: formData.get('status') || null,
      type: formData.get('type') || null,
      deadline: formData.get('deadline')
        ? new Date(formData.get('deadline') as string)
        : null, // ✅ convert to Date
      employmentType: formData.get('employmentType') || null,
      workTime: formData.get('workTime') || null,
      posterUrl: (formData.get('posterUrl') ?? '').toString(),

    }
    
    
    

    const validatedFields = JobSchema.safeParse(raw)

    if (!validatedFields.success) {
      console.log('VALIDATION ERROR:', validatedFields.error.format())
      return {
        error: 'Bidang tidak valid!',
        details: validatedFields.error.format(),
      }
    }
    

    const file = formData.get('posterFile') as File | null

    if (file && raw.posterUrl) {
      return { error: 'Hanya satu metode poster yang boleh digunakan.' }
    }

    let posterFileId: string | null = null

    // 2. Jika pakai file, simpan ke tabel File
    if (file && file.size > 0) {
      const saved = await saveFile('job-poster', file)
      if (!saved?.id) return { error: 'Gagal menyimpan poster.' }
      posterFileId = saved.id
    }

    // 3. Simpan job
    const newJob = await prisma.job.create({
      data: {
        companyId: user.id,
        title: validatedFields.data.title,
        description: validatedFields.data.description ?? '',
        salary: validatedFields.data.salary ?? '',
        requirements: validatedFields.data.requirements,
        skills: validatedFields.data.skills,
        location: validatedFields.data.location ?? null,
        status: validatedFields.data.status ?? null,
        type: validatedFields.data.type ?? null,
        deadline: validatedFields.data.deadline
          ? new Date(validatedFields.data.deadline)
          : null,
        employmentType: validatedFields.data.employmentType,
        workTime: validatedFields.data.workTime,
        posterUrl: validatedFields.data.posterUrl || null,
        ...(posterFileId ? { posterFileId } : {}),
      },
    })

    return {
      success: 'Lowongan berhasil ditambahkan!',
      data: newJob,
    }
  } catch (err) {
    console.error('[ERROR_CREATE_JOB]', err)
    return {
      error: err instanceof Error ? err.message : JSON.stringify(err),
    }
    
  }
}


export async function deleteJob(id: string) {
  try {
    await prisma.job.delete({ where: { id } })
    return {
      success: 'Lowongan berhasil dihapus!',
    }
  } catch {
    return {
      error: 'Terjadi kesalahan saat menghapus lowongan.',
    }
  }
}

export async function updateJob(formData: FormData, id: string) {
  try {
    const user = await currentDetailUserCompany()
    if (!user?.id) {
      return {
        error: 'Pencari kerja tidak terautentikasi atau tidak tergabung dalam penyedia kerja!',
      }
    }

    // Ambil dan parsing data dari FormData
    const raw = {
      title: formData.get('title') ?? '',
      description: formData.get('description') ?? '',
      salary: formData.get('salary') ?? '',
      requirements: JSON.parse(formData.get('requirements') as string || '[]'),
      skills: JSON.parse(formData.get('skills') as string || '[]'),
      location: formData.get('location') || null,
      status: formData.get('status') || null,
      type: formData.get('type') || null,
      deadline: formData.get('deadline')
        ? new Date(formData.get('deadline') as string)
        : null,
      employmentType: formData.get('employmentType') || null,
      workTime: formData.get('workTime') || null,
      posterUrl: (formData.get('posterUrl') ?? '').toString(),

    }

    const validatedFields = JobSchema.safeParse(raw)
    if (!validatedFields.success) {
      return {
        error: 'Bidang tidak valid!',
        details: validatedFields.error.format(),
      }
    }

    const file = formData.get('posterFile') as File | null
    let newPosterFileId: string | null = null

    // Validasi hanya salah satu metode upload
    if (file && raw.posterUrl) {
      return { error: 'Hanya satu metode poster yang boleh digunakan.' }
    }
    
    if (file && file.size > 0) {
      raw.posterUrl = '' // <--- reset URL jika file digunakan
    }
    

    // Upload file jika ada
    if (file && file.size > 0) {
      const saved = await saveFile('job-poster', file)
      if (!saved?.id) return { error: 'Gagal menyimpan poster.' }
      newPosterFileId = saved.id
    }

    // Update data ke database
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        companyId: user.id,
        title: validatedFields.data.title,
        salary: validatedFields.data.salary ?? '',
        description: validatedFields.data.description ?? '',
        requirements: validatedFields.data.requirements,
        skills: validatedFields.data.skills,
        location: validatedFields.data.location ?? null,
        status: validatedFields.data.status ?? null,
        type: validatedFields.data.type ?? null,
        deadline: validatedFields.data.deadline,
        employmentType: validatedFields.data.employmentType,
        workTime: validatedFields.data.workTime,
        posterUrl: validatedFields.data.posterUrl || null,
        posterFileId: newPosterFileId ?? undefined,
      },
    })

    return {
      success: 'Lowongan berhasil diperbarui!',
      data: updatedJob,
    }

  } catch (err) {
    console.error('[ERROR_UPDATE_JOB]', err)
    return {
      error: err instanceof Error ? err.message : JSON.stringify(err),
    }
    
  }
}


export async function getJob(id: string) {
  const data = await prisma.job.findUnique({
    where: { id },
    include: {
      jobApplication: {
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
      },
      company: true,
      posterFile: true, // 🧩 tambahkan ini!
    },
  })
  

  return { data } // ✅ ini saja cukup!
}

export async function getDetailJobApplicant(id: string) {
  try {
    const data = await prisma.jobApplication.findUnique({
      where: { id: id },
      include: {
        member: {
          include: {
            user: true,
          },
        },
        job: {
          include: {
            company: true,
            posterFile: true,
          },
        },
      },
    })
    return { data }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil lowongan:', error)
  }
}

export async function updateDetailJobApplicant(
  formData: z.infer<typeof JobApplicationSchema>,
  id: string
) {
  try {
    const validatedFields = JobApplicationSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        error: 'Bidang tidak valid!',
        details: validatedFields.error.errors,
      }
    }
    const { data } = validatedFields

    await prisma.jobApplication.update({
      where: { id: id },
      data: {
        notes: data.notes,
      },
    })
    return { success: 'Lowongan berhasil diperbarui!', data: data.notes }
  } catch {
    return { error: 'Terjadi kesalahan saat memperbarui lowongan.' }
  }
}

export const getDetailUserCompanyFull = async (id: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: { id },
      include: {
        company: {
          include: {
            RequestVerified: true,
            logo: true,
            job: {
              include: {
                jobApplication: {
                  include: {
                    member: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return data
  } catch {
    return null
  }
}

export const createRequestVerified = async (companyId: string) => {
  try {
    await prisma.requestVerified.create({
      data: {
        companyId,
      },
    })
    return {
      success: 'Permintaan verifikasi berhasil!, harap tunggu persetujuan admin',
    }
  } catch {
    return { error: 'Terjadi kesalahan saat membuat permintaan verifikasi.' }
  }
}

export const updateLogoCompany = async (
  idCompany: string,
  idFile: string,
  logo: File
) => {
  try {
    const logoFile = logo ? await saveFile('company-logos', logo) : undefined

    if (!logoFile) {
      return { error: 'Logo tidak valid' }
    }
    await prisma.company.update({
      where: { id: idCompany },
      data: {
        logoId: logoFile.id,
      },
    })

    await prisma.file.delete({
      where: {
        id: idFile,
      },
    })

    return { success: 'Logo berhasil diperbarui!' }
  } catch (err) {
    console.error('Kesalahan saat pembaruan:', err)
    return { error: 'Terjadi kesalahan saat memperbarui logo.' }
  }
}

export async function updateCompanyPersonalInformation(
  formData: z.infer<typeof updateCompanySchema>,
  id: string,
  idCompany: string
) {
  try {
    const validatedFields = updateCompanySchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        error: 'Bidang tidak valid!',
        details: validatedFields.error.errors,
      }
    }

    const {
      username,
      fullname,
      companyName,
      industry,
      ownership,
      phone,
      companyPhone,
      website,
      publicMail,
      bio,
      address,
      city,
    } = validatedFields.data

    await prisma.user.update({
      where: { id: id },
      data: {
        username,
        fullname,
      },
    })

    await prisma.company.update({
      where: { id: idCompany },
      data: {
        companyName,
        industry,
        ownership,
        phone,
        companyPhone,
        website,
        publicMail,
        bio,
        address,
        city,
      },
    })

    return { success: 'Penyedia kerja berhasil diperbarui!' }
  } catch {
    return { error: 'Terjadi kesalahan saat memperbarui penyedia kerja.' }
  }
}
