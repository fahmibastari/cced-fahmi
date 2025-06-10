'use server'

import { saveFile } from '@/lib/file-handler'
import prisma from '@/lib/prisma'
import { JobApplicationSchema, updateMemberSchema } from '@/lib/zod'
import * as z from 'zod'

export const applyJob = async (
  jobId: string,
  userId: string,
  value: z.infer<typeof JobApplicationSchema>
) => {
  try {
    if (!jobId || !userId) {
      return { error: 'Parameter yang dibutuhkan hilang' }
    }

    const validatedFields = JobApplicationSchema.safeParse(value)
    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues
        .map((issue) => issue.message)
        .join(', ')
      return { error: errorMessages }
    }

    const { data } = validatedFields
    const { notes } = data

    const job = await prisma.job.findUnique({ where: { id: jobId } })
    if (!job) return { error: 'Lowongan tidak ditemukan' }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return { error: 'Pencari kerja tidak ditemukan' }

    const member = await prisma.member.findUnique({ where: { userId: user.id } })

    const existingApplication = await prisma.jobApplication.findFirst({
      where: { jobId, memberId: member?.id },
    })
    if (existingApplication) return { error: 'Anda sudah melamar untuk lowongan ini' }

    await prisma.jobApplication.create({
      data: {
        jobId,
        memberId: member?.id ?? '',
        notes: notes || 'seleksi berkas',
        resumeMember: "null",
      },
    })

    return { success: 'Aplikasi lowongan berhasil diajukan!' }
  } catch {
    return {
      error: 'Terjadi kesalahan saat mengajukan aplikasi lowongan. Silakan coba lagi nanti.',
    }
  }
}

export const getDetailUserMemberFull = async (id: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: { id },
      include: {
        image: true,
        member: {
          include: {
            experience: true,
            education: true,
            assessment: true,
            jobApplication: {
              include: {
                job: {
                  include: { company: true },
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

export async function updateMemberPersonalInformation(
  formData: z.infer<typeof updateMemberSchema>,
  id: string,
  idMember: string
) {
  try {
    const validatedFields = updateMemberSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        error: 'Bidang tidak valid!',
        details: validatedFields.error.errors,
      }
    }

    const {
      username,
      fullname,
      phone,
      address,
      city,
      birthDate,
      gender,
      about,
      memberType,
      nim,
      resume,
      skills,
      interests,
      studyLevel,
      major,
    } = validatedFields.data

    await prisma.user.update({
      where: { id },
      data: { username, fullname },
    })

    await prisma.member.update({
      where: { id: idMember },
      data: {
        phone,
        address,
        city,
        birthDate,
        gender,
        about,
        memberType,
        nim,
        resume,
        skills,
        interests,
        studyLevel: studyLevel || '',
        major: major || '',
      },
    })

    return { success: 'Pencari kerja berhasil diperbarui!' }
  } catch {
    return {
      error: 'Terjadi kesalahan saat memperbarui pencari kerja. Silakan coba lagi.',
    }
  }
}

export const updateCvMember = async (id: string, cv: File) => {
  try {
    if (!cv) return { error: 'File CV diperlukan' }

    const cvFile = await saveFile('member-cvs', cv)
    if (!cvFile) return { error: 'File CV tidak valid atau tidak bisa disimpan' }

    await prisma.member.update({
      where: { userId: id },
      data: { cv: cvFile.src },
    })

    return { success: 'CV berhasil diperbarui!' }
  } catch (err) {
    console.error('Terjadi kesalahan saat memperbarui CV:', err)
    return { error: 'Terjadi kesalahan tak terduga saat memperbarui CV profil.' }
  }
}

export const updateImageMember = async (
  id: string,
  idFile: string,
  image: File
) => {
  try {
    if (!image) return { error: 'File gambar diperlukan' }

    const imageFile = await saveFile('member-images', image)
    if (!imageFile) return { error: 'File gambar tidak valid atau tidak bisa disimpan' }

    const existingImage = await prisma.file.findUnique({ where: { id: idFile } })
    if (existingImage) {
      await prisma.file.delete({ where: { id: idFile } })
    }

    await prisma.user.update({
      where: { id },
      data: { imageId: imageFile.id },
    })

    return { success: 'Gambar profil berhasil diperbarui!' }
  } catch (err) {
    console.error('Terjadi kesalahan saat memperbarui gambar:', err)
    return { error: 'Terjadi kesalahan tak terduga saat memperbarui gambar profil.' }
  }
}
