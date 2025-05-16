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
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '../ui/card'
  import { useSearchParams } from 'next/navigation'
  import {
    getDetailJobApplicant,
    updateDetailJobApplicant,
  } from '@/actions/company-action'
  import Image from 'next/image'
  import { Badge } from '../ui/badge'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '../ui/select'

  const DetailApplicant = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [detailData, setDetailData] = useState<any>()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [isClickSetButton, setIsClickSetButton] = useState<boolean>(false)
    const [displayNotes, setDisplayNotes] = useState<string>('')
    const token = useSearchParams().get('token')
    const form = useForm<z.infer<typeof JobApplicationSchema>>({
      resolver: zodResolver(JobApplicationSchema),
      defaultValues: {
        notes: detailData?.notes || '',
        resumeMember: detailData?.resumeMember || '',
      },
    })

    const handleClickSetButton = (val: boolean) => {
      setIsClickSetButton(!val)
    }

    useEffect(() => {
      const fetchAndSetData = async () => {
        if (token) {
          const response = await getDetailJobApplicant(token)
          if (response?.data) {
            const job = response.data
            setDetailData(job)
          }
        }
      }
      fetchAndSetData()
    }, [token])

    useEffect(() => {
      if (detailData) {
        form.reset({
          notes: detailData.notes || '',
          resumeMember: detailData.resumeMember || '',
        })
      }
      setDisplayNotes(detailData?.notes || '')
    }, [detailData, form])
    const onSubmit = (data: z.infer<typeof JobApplicationSchema>) => {
      setErrorMessage('')
      setSuccessMessage('')
      startTransition(() => {
        setIsPending(true)
        updateDetailJobApplicant(data, token || '').then((res) => {
          setSuccessMessage(res?.success ?? '')
          setErrorMessage(res?.error ?? '')
          setDisplayNotes(res?.data ?? '')
          setIsPending(false)
        })
      })
    }
    const notesData = ['seleksi berkas', 'dalam komunikasi', 'belum sesuai']
    const getAge = (birthDate: string | Date): number => {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
    
      // Jika belum lewat bulan ulang tahun, kurangi usia satu tahun
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
    
      return age;
    };
    
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-6'>
              <div className='relative w-36 h-36'>
                <Image
                  src={detailData?.member?.user?.image?.src || '/profile.png'}
                  alt='Profile'
                  className='rounded-full object-cover'
                  fill
                />
              </div>
              <div>
                <CardTitle className='text-xl font-bold text-green-800 mb-3'>
                  {detailData?.member.user.fullname || 'Fullname'}
                </CardTitle>
                <CardDescription className='text-sm text-gray-500'>
                  {detailData?.member.about || 'about me'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter className='w-full flex flex-col items-center justify-between'>
            <div className='w-full flex items-center justify-between'>
              <Badge className='text-sm ml-4'>{displayNotes}</Badge>
              <Button
                size={'sm'}
                variant={'outline'}
                onClick={() => handleClickSetButton(isClickSetButton)}
              >
                Set Notes
              </Button>
            </div>
            <div
              className={`${isClickSetButton ? 'block' : 'hidden'} w-full p-2 mt-4 `}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
                >
                  <div className='space-y-6'>
                    <FormField
                      control={form.control}
                      name='notes'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Catatan</FormLabel>
                          <FormControl>
                            <Select
                              disabled={isPending}
                              onValueChange={field.onChange}
                              value={field.value || ''}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder='Pilih Catatan' />
                              </SelectTrigger>
                              <SelectContent>
                                {notesData.map((note) => (
                                  <SelectItem
                                    key={note}
                                    value={note.toLowerCase()}
                                  >
                                    {note}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                        'Perbarui Catatan'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardFooter>
        </Card>

        <Card className='mb-6'>
  <CardHeader>
    <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
      Informasi Pribadi
    </CardTitle>
  </CardHeader>
  <CardContent className='mb-3 text-sm font-semibold text-gray-800'>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Nama Lengkap:</span>
      <span className='text-gray-600'>
        {detailData?.member.user.fullname || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Email:</span>
      <span className='text-gray-600'>
        {detailData?.member.user.email || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Peran:</span>
      <span className='text-gray-600'>
        {detailData?.member.user.role || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Status:</span>
      <span className='text-gray-600'>
        {detailData?.member.memberType.toLowerCase() || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>NIM:</span>
      <span className='text-gray-600'>
        {detailData?.member.nim || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Nomor Telepon:</span>
      <span className='text-gray-600'>
        {detailData?.member.phone || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Alamat:</span>
      <span className='text-gray-600'>
        {detailData?.member.address || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Kota:</span>
      <span className='text-gray-600'>
        {detailData?.member.city || '-'}
      </span>
    </div>
    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Tanggal Lahir:</span>
      <span className='text-gray-600'>
        {detailData?.member?.birthDate
          ? `${new Date(detailData?.member.birthDate).toLocaleDateString('id-ID')} (${getAge(detailData?.member.birthDate)} tahun)`
          : '-'}
      </span>
    </div>

    <div className='flex items-center gap-3 mb-2'>
      <span className='text-gray-900'>Jenis Kelamin:</span>
      <span className='text-gray-600'>
        {detailData?.member.gender || '-'}
      </span>
    </div>
  </CardContent>
</Card>




<Card className='mb-6'>
  <CardHeader>
    <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
      Keahlian
    </CardTitle>
  </CardHeader>
  <CardContent>
    {detailData?.member?.skills?.length > 0 ? (
      <ul className='list-disc space-y-2 pl-6 text-gray-700'>
        {detailData?.member?.skills?.map((skill: string) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    ) : (
      <p>Tidak ada keahlian</p>
    )}
  </CardContent>
</Card>

<Card className='mb-6'>
  <CardHeader>
    <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
      Ketertarikan
    </CardTitle>
  </CardHeader>
  <CardContent>
    {detailData?.member?.interests?.length > 0 ? (
      <ul className='list-disc space-y-2 pl-6 text-gray-700'>
        {detailData?.member?.interests?.map((interest: string) => (
          <li key={interest}>{interest}</li>
        ))}
      </ul>
    ) : (
      <p>Tidak ada ketertarikan</p>
    )}
  </CardContent>
</Card>

<CardFooter className='text-center pt-6 border-t'>
  <Link
    href={`/company/detail-job?token=${detailData?.jobId || ''}`}
    className='text-lg font-medium text-green-600 hover:text-green-700 hover:underline'
  >
    Kembali ke Detail Lowongan
  </Link>
</CardFooter>

      </div>
    )
  }

  export default DetailApplicant
