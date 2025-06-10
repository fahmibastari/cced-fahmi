'use client'

import { JobSchema } from '@/lib/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { BeatLoader } from 'react-spinners'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormSuccess } from '@/components/auth/form-succsess'
import { FormError } from '@/components/auth/form-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { addNewJob } from '@/actions/company-action'
import { X } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import FormTextArea from '@/components/ui/FormTextArea'

function formatRupiah(value: string) {
  // Menghapus semua karakter selain angka
  value = value.replace(/\D/g, '');

  // Memformat angka menjadi format rupiah dengan titik sebagai pemisah ribuan
  if (value === '') return '';
  const number = parseInt(value, 10);
  return 'Rp ' + number.toLocaleString('id-ID'); // Format angka dengan titik
}

const AddJob = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [applyType, setApplyType] = useState<'internal' | 'external'>('internal')
  const [externalUrl, setExternalUrl] = useState('')
  const [posterType, setPosterType] = useState<'none' | 'url' | 'file'>('none')



  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: '',
  description: '',
  salary: '',
  requirements: [],
  location: ' ',
  deadline: new Date(),
  employmentType: '',
  workTime: '',
  skills: [],
  posterUrl: '', // ✅ ini sekarang aman
  type: '',
    },
  })

  const onSubmit = async (data: any) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value))
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString())
      } else if (typeof value === 'string' || typeof value === 'number') {
        formData.append(key, value.toString())
      } else {
        formData.append(key, '')
      }
    })
    

const fileInput = document.querySelector('input[name="posterFile"]') as HTMLInputElement
formData.append('posterType', posterType)

if (posterType === 'file' && fileInput?.files?.length) {
  formData.append('posterFile', fileInput.files[0])
}

formData.append('posterUrl', data.posterUrl ?? '')



    
  
    const result = await addNewJob(formData)
    setSuccessMessage(result?.success ?? '')
    setErrorMessage(result?.error ?? '')
  }
  

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship']
  const jobStatus = ['Aktif', 'NonAktif', 'Selesai', 'Draft']

  return (
    <Card className='mx-auto my-8 w-full max-w-3xl bg-white shadow-lg'>
      <CardHeader className='text-center space-y-2 pb-8 border-b'>
        <CardTitle className='text-3xl font-bold text-green-700'>
          Buat Lowongan Pekerjaan Baru
        </CardTitle>
        <CardDescription className='text-gray-600'>
          Isi detail berikut untuk membuat peluang pekerjaan baru
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-8'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Masukkan judul untuk pekerjaan'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokasi</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Masukkan lokasi pekerjaan'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                        value={field.value ?? ' '}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
      control={form.control}
      name="salary"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Gaji</FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={form.formState.isSubmitting}
              placeholder="Masukkan kisaran gaji untuk pekerjaan"
              className="border-2 border-gray-100 shadow-sm"
              type="text"
              value={field.value ?? ''}
              onChange={(e) => {
                // Memformat nilai input saat ada perubahan
                field.onChange(formatRupiah(e.target.value));
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

<FormTextArea
  name="description"
  label="Deskripsi Pekerjaan"
  placeholder="Contoh:\n- Bertanggung jawab membuat laporan\n- Komunikatif dan teliti"
  control={form.control}
/>




              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Lowongan</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih status pekerjaan' />
                      </SelectTrigger>
                      <SelectContent>
                        {jobStatus.map((status) => (
                          <SelectItem key={status} value={status.toLowerCase()}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
  control={form.control}
  name="employmentType"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Status Pegawai</FormLabel>
      <Select
        disabled={form.formState.isSubmitting}
        onValueChange={field.onChange}
        value={field.value || ''}
      >
        <SelectTrigger>
          <SelectValue placeholder="Pilih status pegawai" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pekerja Tetap">Pekerja Tetap</SelectItem>
          <SelectItem value="Kontrak">Kontrak</SelectItem>
          <SelectItem value="Magang">Magang</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="workTime"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Waktu Kerja</FormLabel>
      <Select
        disabled={form.formState.isSubmitting}
        onValueChange={field.onChange}
        value={field.value || ''}
      >
        <SelectTrigger>
          <SelectValue placeholder="Pilih waktu kerja" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Full Time">Full Time</SelectItem>
          <SelectItem value="Part Time">Part Time</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>


              <FormField
                control={form.control}
                name='skills'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keterampilan yang Dibutuhkan</FormLabel>
                    {/* Input untuk menambahkan keterampilan manual */}
                    <FormControl>
                      <Input
                        placeholder='Ketik keterampilan dan tekan Enter'
                        disabled={isPending}
                        onKeyDown={(e) => {
                          if (
                            e.key === 'Enter' &&
                            e.currentTarget.value.trim() !== ''
                          ) {
                            const newSkill = e.currentTarget.value.trim()
                            if (!field.value?.includes(newSkill)) {
                              field.onChange([...(field.value || []), newSkill])
                            }
                            e.currentTarget.value = '' // Reset input
                            e.preventDefault() // Prevent form submission
                          }
                        }}
                        className='border-2 border-gray-100 shadow-sm mb-2'
                      />
                    </FormControl>
                    {/* Menampilkan daftar keterampilan */}
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {field.value?.map((skill) => (
                        <div
                          key={skill}
                          className='bg-gray-100 px-2 py-1 rounded-md flex items-center gap-2'
                        >
                          {skill}
                          <Button
                            variant={'ghost'}
                            type='button'
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((s) => s !== skill)
                              )
                            }
                            className='text-gray-500 hover:text-gray-700 w-4 h-4'
                          >
                            <X className='h-4 w-4 text-red-600 hover:text-red-700' />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='requirements'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persyaratan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ketik persyaratan dan tekan Enter'
                        disabled={isPending}
                        onKeyDown={(e) => {
                          if (
                            e.key === 'Enter' &&
                            e.currentTarget.value.trim() !== ''
                          ) {
                            const newSkill = e.currentTarget.value.trim()
                            if (!field.value?.includes(newSkill)) {
                              field.onChange([...(field.value || []), newSkill])
                            }
                            e.currentTarget.value = '' // Reset input
                            e.preventDefault() // Prevent form submission
                          }
                        }}
                        className='border-2 border-gray-100 shadow-sm mb-2'
                      />
                    </FormControl>
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {field.value?.map((skill) => (
                        <div
                          key={skill}
                          className='bg-gray-100 px-2 py-1 rounded-md flex items-center gap-2'
                        >
                          {skill}
                          <Button
                            variant={'ghost'}
                            type='button'
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((s) => s !== skill)
                              )
                            }
                            className='text-gray-500 hover:text-gray-700 w-4 h-4'
                          >
                            <X className='h-4 w-4 text-red-600 hover:text-red-700' />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
  control={form.control}
  name="deadline"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Tanggal</FormLabel>
      <FormControl>
        <Input
          {...field}
          value={
            field.value
              ? new Date(field.value).toISOString().split("T")[0] // Pastikan field.value adalah tanggal yang valid
              : ""
          }
          onChange={(e) => {
            // Pastikan nilai yang dimasukkan valid sebagai tanggal sebelum diproses
            const newDate = new Date(e.target.value);
            if (!isNaN(newDate.getTime())) {
              field.onChange(newDate);
            }
          }}
          disabled={form.formState.isSubmitting}
          className="border-2 border-gray-100 shadow-sm"
          type="date"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

    <FormItem>
      <FormLabel>Tipe Apply</FormLabel>
      <Select
        onValueChange={(value) => {
          setApplyType(value as 'internal' | 'external')
        }}
        value={applyType || 'internal'}
        disabled={isPending}
      >
        <SelectTrigger>
          <SelectValue placeholder='Pilih tipe apply' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='internal'>Internal</SelectItem>
          <SelectItem value='external'>External</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>

{applyType === 'external' && (
<FormField
  control={form.control}
  name='type'
  render={({ field }) => (
    <FormItem>
    <FormLabel>URL External</FormLabel>
    <Textarea
    {...field}
    disabled={form.formState.isSubmitting}
      placeholder='Masukkan URL untuk apply pekerjaan'
      className='border-2 border-gray-100 shadow-sm'

      onChange={(e) => {
        field.onChange(e.target.value);
      }}
      value={field.value ?? ''}
    />
      <FormMessage />
  </FormItem>
  )}
/>

)}
{/* Form Pilihan Tipe Poster */}
<FormItem>
  <FormLabel>Tipe Poster</FormLabel>
  <Select
    value={posterType}
    onValueChange={(val) => setPosterType(val as 'none' | 'url' | 'file')}
    disabled={form.formState.isSubmitting}
  >
    <SelectTrigger>
      <SelectValue placeholder="Pilih metode poster" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="none">Tanpa Poster</SelectItem>
      <SelectItem value="url">Link Poster (URL)</SelectItem>
      <SelectItem value="file">Upload File Poster</SelectItem>
    </SelectContent>
  </Select>
</FormItem>

{/* Jika memilih Link Poster */}
{posterType === 'url' && (
  <FormField
    control={form.control}
    name="posterUrl"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Link Poster (URL)</FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder="https://example.com/poster.jpg"
            disabled={form.formState.isSubmitting}
            className="border-2 border-gray-100 shadow-sm"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)}

{/* Jika memilih Upload File Poster */}
{posterType === 'file' && (
  <div className="space-y-2">
    <FormLabel>Upload Poster</FormLabel>
    <input
      type="file"
      name="posterFile"
      accept="image/*"
      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      required
    />
    <p className="text-sm text-gray-500">File gambar (.jpg, .png, dll)</p>
  </div>
)}



              {errorMessage && <FormError message={errorMessage} />}
              {successMessage && <FormSuccess message={successMessage} />}

              <Button
                type='submit'
                disabled={isPending}
                className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition-colors'
              >
                {isPending ? (
                  <div className='flex items-center justify-center gap-2'>
                    <BeatLoader />
                    Memproses...
                  </div>
                ) : (
                  'Buat Lowongan'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='text-center pt-6 border-t'>
        <Link
          href='/dashboard'
          className='text-green-600 hover:text-green-700 font-medium'
        >
          Kembali ke Dashboard
        </Link>
      </CardFooter>
    </Card>
  )
}
export default AddJob
