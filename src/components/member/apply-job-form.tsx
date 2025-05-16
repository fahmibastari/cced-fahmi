/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { JobApplicationSchema } from '@/lib/zod'
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
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { useSearchParams } from 'next/navigation'
import { Textarea } from '../ui/textarea'
import { getJob } from '@/actions/company-action'
import { applyJob } from '@/actions/member-action'

const ApplyJobForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const token = useSearchParams().get('token')
  const user = useSearchParams().get('user')
  const [job, setJob] = useState<any>(null)

  const form = useForm<z.infer<typeof JobApplicationSchema>>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      resumeMember: 'null',
    },
  })

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (token) {
        const response = await getJob(token)
        if (response?.data) {
          const job = response.data
          setJob(job)
        }
      }
    }
    fetchAndSetData()
  }, [token])

  const onSubmit = (data: z.infer<typeof JobApplicationSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    startTransition(() => {
      setIsPending(true)
      applyJob(token || '', user || '', data).then((res) => {
        setSuccessMessage(res?.success ?? '')
        setErrorMessage(res?.error ?? '')
        setIsPending(false)
      })
    })
  }

  if (!token || !user) {
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
          <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start'>
              <h2 className='text-5xl font-bold text-green-800'>
                {job?.title}
              </h2>
              <p className='text-sm text-gray-500 pt-3'>
                Dibuat oleh : {job?.company?.companyName || 'Penyedia Kerja'}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-8'>
        <div className='space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-6 mb-7'>
          <div className='space-y-6'>
            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Deskripsi Pekerjaan
              </h3>
              <p className='text-gray-600 whitespace-pre-wrap'>{job?.description || 'Deskripsi'}</p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Gaji Pekerjaan
              </h3>
              <p className='text-gray-600'>{job?.salary || 'Deskripsi'}</p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Lokasi
              </h3>
              <p className='text-gray-600'>{job?.location || 'Lokasi'}</p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Persyaratan
              </h3>
              <ul className='list-disc space-y-2 pl-6 text-gray-700'>
                {job?.requirements ? (
                  job?.requirements.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <p>Tidak ada persyaratan</p>
                )}
              </ul>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Keahlian
              </h3>
              <ul className='list-disc space-y-2 pl-6 text-gray-700'>
                {job?.skills ? (
                  job?.skills.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <p>Tidak ada keahlian</p>
                )}
              </ul>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Tenggat Waktu
              </h3>
              <p className='text-gray-600'>
                {job?.deadline?.toLocaleDateString('id-ID') || 'Tenggat Waktu'}
              </p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Status
              </h3>
              <p className='text-gray-600'>
                {job?.status || 'Tidak ada status'}
              </p>
            </section>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-6'>

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
                  'Lamar lowongan!'
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
export default ApplyJobForm
