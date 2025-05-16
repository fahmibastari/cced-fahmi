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
import { startTransition, useEffect, useState } from 'react'
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
import { getJob, updateJob } from '@/actions/company-action'
import { X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Job } from '@prisma/client'
import { Textarea } from '../ui/textarea'

const EditJob = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const token = useSearchParams().get('token')
  const [applyType, setApplyType] = useState<'internal' | 'external'>('internal')
  const [externalUrl, setExternalUrl] = useState('')

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
  type: '',
    },
  })

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (token) {
        const response = await getJob(token)
        if (response?.data) {
          const job: Job = response.data
          form.reset({
            title: job.title || '',
            salary: job.salary || '',
            description: job.description || '',
            requirements: job.requirements || [],
            location: job.location || '',
            deadline: job.deadline || new Date(),
            status: job.status || '',
            skills: job.skills || [],
            type: job.type || '',
            employmentType: job.employmentType || '',
            workTime: job.workTime || '',
          })
        }
      }
    }
    fetchAndSetData()
  }, [token, form])

  const onSubmit = (data: z.infer<typeof JobSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    startTransition(() => {
      setIsPending(true)
      updateJob(data, token || '').then((data) => {
        setSuccessMessage(data?.success ?? '')
        setErrorMessage(data?.error ?? '')
        setIsPending(false)
      })
    })
  }

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship']
  const jobStatus = ['Aktif', 'NonAktif', 'Selesai', 'Draft']

  if (!token) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='flex items-center justify-center'>
          <BeatLoader color='#22c55e' />
        </div>
      </div>
    )
  }

  return (
    <Card className='mx-auto my-8 w-full max-w-3xl bg-white shadow-lg'>
      <CardHeader className='text-center space-y-2 pb-8 border-b'>
        <CardTitle className='text-3xl font-bold text-green-700'>
          Edit Lowongan Pekerjaan
        </CardTitle>
        <CardDescription className='text-gray-600'>
        Lengkapi informasi berikut untuk memperbarui lowongan pekerjaan
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
                    <FormLabel>Judul Pekerjaan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Masukkan judul pekerjaan'
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
                name='salary'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gaji</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Masukkan kisaran gaji'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                        value={field.value ?? ''}
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
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Pekerjaan</FormLabel>
                    <FormControl>
                    <textarea
  {...field}
  value={field.value ?? ''}
  disabled={form.formState.isSubmitting}
  placeholder='Masukkan deskripsi pekerjaan'
  className='border-2 border-gray-100 shadow-sm w-full rounded-md p-2 h-32 resize-y'
/>

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                        <SelectValue placeholder='Status Lowongan' />
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
                    <FormLabel>Keahlian yang dibutuhkan</FormLabel>
                    {/* Input untuk menambahkan skill manual */}
                    <FormControl>
                      <Input
                        placeholder='Ketik keahlian lalu tekan Enter'
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
                    {/* Menampilkan daftar skill */}
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

              {/* <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Pekerjaan</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih Jenis Pekerjaan' />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name='requirements'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persyaratan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ketik persyaratan lalu tekan Enter'
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
      <FormLabel>Tenggat Waktu</FormLabel>
      <FormControl>
        <Input
          {...field}
          value={
            field.value
              ? new Date(field.value).toISOString().split('T')[0] // Convert if valid
              : '' // Set to empty string if invalid or empty
          }
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            if (!isNaN(newDate.getTime())) {
              field.onChange(newDate); // Ensure the date is valid
            } else {
              field.onChange(null); // If invalid date, set to null
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
                  'Perbarui Lowongan'
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
export default EditJob
