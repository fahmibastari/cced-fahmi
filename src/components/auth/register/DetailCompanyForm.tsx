'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { companySchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormSuccess } from '../form-succsess'
import { FormError } from '../form-error'
import { CardWrapper } from '../card-wrapper'
import { Role } from '@prisma/client'
import { registerCompany } from '@/actions/register'
import { ImagePlus } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import sector from '@/data/industrySector'

interface CompanyFormProps {
  onBack: () => void
  data: {
    role: Role
    username: string
    fullname: string
    email: string
    password: string
  }
}

const DetailCompanyForm = ({ onBack, data }: CompanyFormProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const router = useRouter()
  const [berkasFile, setBerkasFile] = useState<File | null>(null)
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      role: data.role || 'COMPANY',
      username: data.username || '',
      fullname: data.fullname || '',
      email: data.email || '',
      password: data.password || '',
      confirmPassword: data.password || '',
      companyName: '',
      industry: '',
      ownership: '',
      phone: '',
      companyPhone: '',
      website: '',
      publicMail: '',
      bio: '',
    },
  })

  const handleBerkasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
      ]
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Hanya PDF, Word, dan gambar yang diperbolehkan.')
        return
      }
  
      setErrorMessage('')
      setSuccessMessage('Berkas berhasil dipilih!')
      setBerkasFile(file)
    }
  }

  const handleSubmit = (data: z.infer<typeof companySchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    if (logoFile) {
      data.logo = logoFile
    }
    if (berkasFile) {
      data.berkas = berkasFile
    }
    startTransition(() => {
      setIsPending(true)
      registerCompany(data).then((response) => {
        if (response?.error) {
          setErrorMessage(response.error)
          setIsPending(false)
          return
        }
      
        setSuccessMessage(response?.message ?? '')
        setIsPending(false)
        setTimeout(() => {
          router.push('/login')
        }, 1000)
      })
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const maxSize = 2 * 1024 * 1024; // 2 MB = 2 * 1024 * 1024 bytes
      const validTypes = ['image/png', 'image/webp', 'image/jpeg', 'image/jpg']
  
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Hanya file PNG, WebP, JPG, dan JPEG yang diperbolehkan.')
        return
      }
  
      if (file.size > maxSize) {
        setErrorMessage('Ukuran file maksimal 2 MB.')
        return
      }
  
      setErrorMessage('')
      setSuccessMessage('File Berhasil di Upload!')
      setLogoFile(file)
    }
  }
  
  

  return (
    <CardWrapper
      headerLabel="Daftar Akun"
      description="Isi formulir di bawah ini untuk membuat akun penyedia kerja"
      paragraphSwitchButton="Sudah punya akun? "
      switchButtonLabel="Masuk"
      switchButtonHref="/login"
      className="max-w-4xl mx-auto px-4"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Logo Upload */}
          <div>
            <FormLabel>Logo Penyedia Kerja</FormLabel>
            <div className="mt-2 cursor-pointer rounded-lg border-2 border-dashed p-4 text-center hover:border-green-500 transition">
              <input
                type="file"
                accept=".png,.webp,.jpg,.jpeg"
                className="hidden"
                id="logo-upload"
                onChange={handleFileChange}
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="flex flex-col items-center w-full h-40 justify-center gap-8">
                  <ImagePlus className="h-10 w-10 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    Logo Penyedia Kerja. Hanya file *.png, *.webp, *.jpg, *.jpeg dengan maksimal 2 MB.
                  </div>
                  {logoFile && (
                    <div className="text-sm text-green-600">File terpilih: {logoFile.name}</div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Berkas Upload */}
          <div>
            <FormLabel>Berkas Penyedia Kerja (PDF/Word/Gambar)*</FormLabel>
            <div className="mt-2 cursor-pointer rounded-lg border-2 border-dashed p-4 text-center hover:border-green-500 transition">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                className="hidden"
                id="berkas-upload"
                onChange={handleBerkasChange}
              />
              <label htmlFor="berkas-upload" className="cursor-pointer">
                <div className="flex flex-col items-center w-full h-40 justify-center gap-8">
                  <ImagePlus className="h-10 w-10 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    Upload PDF, Word, atau Gambar (Berkas Penyedia Kerja Terverifikasi)
                  </div>
                  {berkasFile && (
                    <div className="text-sm text-green-600">File terpilih: {berkasFile.name}</div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Two Columns Form */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="space-y-4">
              {/* Nama Perusahaan */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Perusahaan*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder="Nama Penyedia Kerja"
                        className="w-full border-2 border-gray-100 rounded-md shadow-sm p-2"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Bidang Industri */}
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bidang Industri*</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={form.formState.isSubmitting}
                        className="w-full border-2 border-gray-100 bg-white shadow-sm rounded-md p-2"
                      >
                        <option value=''>Pilih Bidang Industri</option>
                        {sector.map((industry, idx) => (
                          <option key={idx} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Kepemilikan */}
              <FormField
                control={form.control}
                name="ownership"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kepemilikan Penyedia Kerja*</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={form.formState.isSubmitting}
                        className="w-full border-2 border-gray-100 bg-white shadow-sm rounded-md p-2"
                      >
                        <option value="">Pilih Kepemilikan</option>
                        <option value="Perusahaan kecil">Perusahaan Kecil</option>
                        <option value="Perusahaan menengah">Perusahaan Menengah</option>
                        <option value="Perusahaan besar">Perusahaan Besar</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Nomor Telepon */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder="Nomor Telepon"
                        className="w-full border-2 border-gray-100 rounded-md shadow-sm p-2"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Nomor Telepon Perusahaan */}
              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon Perusahaan*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder="Nomor Telepon Perusahaan"
                        className="w-full border-2 border-gray-100 rounded-md shadow-sm p-2"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              {/* Website */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Penyedia Kerja</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder="Website Penyedia Kerja"
                        className="w-full border-2 border-gray-100 rounded-md shadow-sm p-2"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email Publik */}
              <FormField
                control={form.control}
                name="publicMail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Publik</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder="Alamat Email Publik"
                        className="w-full border-2 border-gray-100 rounded-md shadow-sm p-2"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Biodata */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biodata Penyedia Kerja</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder="Biodata Penyedia Kerja"
                        className="w-full border-2 border-gray-100 rounded-md shadow-sm p-2 h-48 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Error and Success */}
          {errorMessage && <FormError message={errorMessage} />}
          {successMessage && <FormSuccess message={successMessage} />}

          {/* Buttons */}
          <div className="flex space-x-6 pt-6">
            <Button
              type="button"
              disabled={form.formState.isSubmitting || isPending}
              className="flex-1 bg-slate-500 text-white hover:bg-slate-600"
              onClick={onBack}
            >
              {isPending ? "Loading..." : "Kembali"}
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || isPending}
              className="flex-1 bg-green-500 text-white hover:bg-green-600"
            >
              {isPending ? "Loading..." : "Daftar"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default DetailCompanyForm
