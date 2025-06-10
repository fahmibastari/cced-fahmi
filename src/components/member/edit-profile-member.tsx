'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { startTransition, useEffect, useRef, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { Button } from '../ui/button'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { updateMemberSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '../ui/input'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  updateImageMember,
  updateCvMember,
  updateMemberPersonalInformation,
} from '@/actions/member-action'
import { Textarea } from '../ui/textarea'

interface EditProfileMemberProps {
  data: any
}

const EditProfileMember = ({ data }: EditProfileMemberProps) => {
  const [errorMessageImage, setErrorMessageImage] = useState('')
  const [successMessageImage, setSuccessMessageImage] = useState('')
  const [errorMessagePersonal, setErrorMessagePersonal] = useState('')
  const [successMessagePersonal, setSuccessMessagePersonal] = useState('')
  const [errorMessageResume, setErrorMessageResume] = useState('')
  const [successMessageResume, setSuccessMessageResume] = useState('')
  const [errorMessageSkills, setErrorMessageSkills] = useState('')
  const [successMessageSkills, setSuccessMessageSkills] = useState('')
  const [errorMessageInterests, setErrorMessageInterests] = useState('')
  const [successMessageInterests, setSuccessMessageInterests] = useState('')
  const [errorMessageCv, setErrorMessageCv] = useState('')
  const [successMessageCv, setSuccessMessageCv] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [srcImage, setSrcImage] = useState<string | null>(data?.image?.src || null)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [srcCv, setSrcCv] = useState<string | null>(data?.cv?.src || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const gender = ['Laki-laki', 'Perempuan']
 
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2 MB = 2 * 1024 * 1024 bytes
      const validTypes = ['image/png', 'image/webp', 'image/jpeg', 'image/jpg'];
  
      // Periksa tipe file
      if (!validTypes.includes(file.type)) {
        setErrorMessageImage('Hanya file PNG, WebP, JPEG, dan JPG yang diperbolehkan.');
        setSuccessMessageImage('');
        return;
      }
  
      // Periksa ukuran file
      if (file.size > maxSize) {
        setErrorMessageImage('Ukuran file maksimal 2 MB.');
        setSuccessMessageImage('');
        return;
      }
  
      // Jika file valid, reset error dan set success
      setErrorMessageImage('');
      setSuccessMessageImage('File berhasil diunggah!');
  
      // Simpan file dan tampilkan gambar
      setImageFile(file);
      setSrcImage(URL.createObjectURL(file));
    }
  }
  

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const maxSize = 2 * 1024 * 1024 // 2 MB
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ]

      if (!validTypes.includes(file.type)) {
        setErrorMessageCv('Hanya file PDF dan Word yang diperbolehkan.')
        setSuccessMessageCv('')
        return
      }

      if (file.size > maxSize) {
        setErrorMessageCv('Ukuran file maksimal 2 MB.')
        setSuccessMessageCv('')
        return
      }

      setErrorMessageCv('')
      setSuccessMessageCv('File berhasil diunggah!')
      setCvFile(file)
      setSrcCv(URL.createObjectURL(file))
    }
  }

  const handleEditCv = async () => {
    if (!cvFile) {
      setErrorMessageCv('Tidak ada file yang dipilih.')
      return
    }

    setIsPending(true)
    try {
      const response = await updateCvMember(data.id, cvFile)
      if (response?.error) {
        setErrorMessageCv(response.error)
        setSuccessMessageCv('')
      } else {
        setErrorMessageCv('')
        setSuccessMessageCv(response?.success || 'CV berhasil diperbarui!')
      }
    } catch (err) {
      console.error('Error updating CV:', err)
      setErrorMessageCv('Terjadi kesalahan saat memperbarui CV.')
      setSuccessMessageCv('')
    } finally {
      setIsPending(false)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleEditImage = async () => {
    if (!imageFile) {
      setErrorMessageImage('Tidak ada file yang dipilih.')
      return
    }

    setIsPending(true)
    try {
      const response = await updateImageMember(
        data.id,
        data.imageId || '',
        imageFile
      )
      if (response?.error) {
        setErrorMessageImage(response.error)
        setSuccessMessageImage('')
      } else {
        setErrorMessageImage('')
        setSuccessMessageImage(response?.success || 'Gambar berhasil diperbarui!')
      }
    } catch (err) {
      console.error('Error updating image:', err)
      setErrorMessageImage('Terjadi kesalahan saat memperbarui gambar.')
      setSuccessMessageImage('')
    } finally {
      setIsPending(false)
    }
  }

  const formPersonal = useForm<z.infer<typeof updateMemberSchema>>({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      username: '',
      fullname: '',
      memberType: '',
      nim: '',
      phone: '',
      address: '',
      city: '',
      birthDate: null,
      gender: '',
      about: '',
      studyLevel: data.member?.studyLevel || '', // Tambah ini
      major: data.member?.major || '',           // Tambah ini
    },
  })  
  
  const mapDbMemberTypeToString = (type?: string) => {
    if (!type) return ''
    return type.toLowerCase()
  }
  
  
  const mapDbGenderToString = (gender?: string) => {
    if (!gender) return ''
    return gender.toLowerCase()
  }
  
  
  
  useEffect(() => {
    if (data) {
      formPersonal.reset({
        username: data.username || '',
        fullname: data.fullname || '',
        memberType: data.member?.memberType || '',
        nim: data.member?.nim || '',
        phone: data.member?.phone || '',
        address: data.member?.address || '',
        city: data.member?.city || '',
        birthDate: data.member?.birthDate || null,
        gender: data.member?.gender || '',
        about: data.member?.about || '',
        studyLevel: data.member?.studyLevel || '',
        major: data.member?.major || '',
      })
    }
  }, [data, formPersonal])
  
  
  

  const formResume = useForm<z.infer<typeof updateMemberSchema>>({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      resume: data.resume || '',
    },
  })

  const formSkills = useForm<z.infer<typeof updateMemberSchema>>({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      skills: data.skills || [],
    },
  })
  
  useEffect(() => {
    if (data.skills) {
      formSkills.reset({ skills: data.skills })
    }
  }, [data.skills, formSkills])
  

  const formInterests = useForm<z.infer<typeof updateMemberSchema>>({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      interests: data.interests || [],
    },
  })
  console.log('Interests dari data:', data.interests)
console.log('Skills dari data:', data.skills)

  
  useEffect(() => {
    if (data.interests) {
      formInterests.reset({ interests: data.interests })
    }
  }, [data.interests, formInterests])
  

  const onSubmitPersonal = (value: z.infer<typeof updateMemberSchema>) => {
    setErrorMessagePersonal('')
    setSuccessMessagePersonal('')
    startTransition(() => {
      setIsPending(true)
      updateMemberPersonalInformation(value, data.id, data.member.id)
        .then((response) => {
          setSuccessMessagePersonal(response?.success ?? '')
          setErrorMessagePersonal(response?.error ?? '')
          setIsPending(false)
        })
        .catch((err) => {
          console.error('Terjadi kesalahan saat memperbarui informasi pribadi:', err)
          setErrorMessagePersonal(
            'Terjadi kesalahan saat memperbarui informasi pribadi.'
          )
          setSuccessMessagePersonal('')
          setIsPending(false)
        })
    })
  }
  
  const onSubmitResume = (value: z.infer<typeof updateMemberSchema>) => {
    setErrorMessageResume('')
    setSuccessMessageResume('')
    startTransition(() => {
      setIsPending(true)
      updateMemberPersonalInformation(value, data.id, data.member.id)
        .then((response) => {
          setSuccessMessageResume(response?.success ?? '')
          setErrorMessageResume(response?.error ?? '')
          setIsPending(false)
        })
        .catch((err) => {
          console.error('Terjadi kesalahan saat memperbarui informasi resume:', err)
          setErrorMessageResume(
            'Terjadi kesalahan saat memperbarui informasi resume.'
          )
          setSuccessMessageResume('')
          setIsPending(false)
        })
    })
  }
  

  const onSubmitSkills = (value: z.infer<typeof updateMemberSchema>) => {
    setErrorMessageSkills('')
    setSuccessMessageSkills('')
    startTransition(() => {
      setIsPending(true)
      updateMemberPersonalInformation(value, data.id, data.member.id)
        .then((response) => {
          setSuccessMessageSkills(response?.success ?? '')
          setErrorMessageSkills(response?.error ?? '')
          setIsPending(false)
        })
        .catch((err) => {
          console.error('Terjadi kesalahan saat memperbarui informasi keahlian:', err)
          setErrorMessageSkills(
            'Terjadi kesalahan saat memperbarui informasi keahlian.'
          )
          setSuccessMessageSkills('')
          setIsPending(false)
        })
    })
  }
  

  const onSubmitInterests = (value: z.infer<typeof updateMemberSchema>) => {
    setErrorMessageInterests('')
    setSuccessMessageInterests('')
    startTransition(() => {
      setIsPending(true)
      updateMemberPersonalInformation(value, data.id, data.member.id)
        .then((response) => {
          setSuccessMessageInterests(response?.success ?? '')
          setErrorMessageInterests(response?.error ?? '')
          setIsPending(false)
        })
        .catch((err) => {
          console.error('Terjadi kesalahan saat memperbarui informasi ketertarikan:', err)
          setErrorMessageInterests(
            'Terjadi kesalahan saat memperbarui informasi ketertarikan.'
          )
          setSuccessMessageInterests('')
          setIsPending(false)
        })
    })
  }  

  return (
    <div className='max-w-6xl mx-auto p-8 w-full'>
      <h1 className='text-3xl font-bold text-green-700 mb-6'>
        Edit Profil Pencari Kerja
      </h1>

      {/* section edit image */}
      <Card className='shadow-lg'>
        <CardHeader>
          <p className='text-lg font-semibold text-green-700 mb-4'>
            Edit Foto Profil
          </p>
          {errorMessageImage && <FormError message={errorMessageImage} />}
          {successMessageImage && <FormSuccess message={successMessageImage} />}
        </CardHeader>
        <CardContent>
          <div>
            <div className='mb-4 flex justify-between'>
              <p className='text-md font-medium text-gray-700 mb-4'>
                Foto Profil
              </p>
              <Button onClick={handleEditImage} disabled={isPending}>
                Simpan Perubahan
              </Button>
            </div>
            <div className='cursor-pointer rounded-lg border-2 border-dashed p-6 text-center h-80 flex flex-col gap-4 items-center justify-center'>
              <input
                type='file'
                accept='.png,.webp'
                className='hidden'
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className='flex flex-col items-center w-full h-full justify-center gap-4'>
                {srcImage ? (
                  <Image
                    src={srcImage}
                    width={100}
                    height={100}
                    alt='Profile Image'
                    className='rounded-md shadow'
                  />
                ) : (
                  <div className='flex flex-col items-center'>
                    <ImagePlus className='h-12 w-12 text-gray-400' />
                    <p className='text-sm text-gray-600'>Tidak ada gambar terpilih.</p>
                  </div>
                )}
                {imageFile && (
                  <p className='text-sm text-green-600'>
                    File Terpilih: {imageFile.name}
                  </p>
                )}
                <Button
                  variant='outline'
                  className='w-full hover:bg-green-100 hover:border-green-700 transition'
                  onClick={handleButtonClick}
                >
                  Pilih File
                </Button>

              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* section personal data */}
      <Card className='shadow-lg'>
        <CardHeader>
          <p className='text-lg font-semibold text-green-700 mb-4'>
            Edit Informasi Personal
          </p>
          {errorMessagePersonal && <FormError message={errorMessagePersonal} />}
          {successMessagePersonal && (
            <FormSuccess message={successMessagePersonal} />
          )}
        </CardHeader>

        <CardContent>
          <Form {...formPersonal}>
            <form
              onSubmit={formPersonal.handleSubmit(onSubmitPersonal)}
              className='space-y-6'
            >
              <div className='mb-4 flex justify-between'>
                <p className='text-md font-medium text-gray-700 mb-4'>
                  Informasi Personal
                </p>
                <Button type='submit' disabled={isPending}>
                  Simpan Perubahan
                </Button>
              </div>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='space-y-4'>
                <FormField
  control={formPersonal.control}
  name="memberType"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Status Pencari Kerja</FormLabel>
      <FormControl>
        <select
          {...field}
          disabled={formPersonal.formState.isSubmitting}
          className="border-2 border-gray-100 shadow-sm rounded px-3 py-2 w-full"
        >
          <option value="">Pilih Status</option>
          <option value="alumni unila">Alumni UNILA</option>
          <option value="mahasiswa unila">Mahasiswa UNILA</option>
          <option value="alumni non unila">Alumni Non UNILA</option>
          <option value="mahasiswa non unila">Mahasiswa Non UNILA</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
                  <FormField
                    control={formPersonal.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='Username'
                            className='border-2 border-gray-100 shadow-sm'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPersonal.control}
                    name='fullname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='Nama Lengkap'
                            className='border-2 border-gray-100 shadow-sm'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
  control={formPersonal.control}
  name="nim"
  render={({ field }) => {
    // Ambil nilai memberType dari form
    const memberTypeValue = formPersonal.watch('memberType')
    // Disable jika memberType termasuk non UNILA
    const isDisabled =
      memberTypeValue === 'alumni non unila' || memberTypeValue === 'mahasiswa non unila'

    return (
      <FormItem>
        <FormLabel>NPM Unila</FormLabel>
        <FormControl>
          <Input
            {...field}
            disabled={formPersonal.formState.isSubmitting || isDisabled}
            placeholder="NPM Unila"
            className="border-2 border-gray-100 shadow-sm"
            type="text"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )
  }}
/>

                  <FormField
  control={formPersonal.control}
  name="studyLevel"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Jenjang Studi</FormLabel>
      <FormControl>
        <select
          {...field}
          disabled={formPersonal.formState.isSubmitting}
          className="border-2 border-gray-100 shadow-sm rounded px-3 py-2 w-full"
        >
          <option value="">Pilih Jenjang Studi</option>
          <option value="SMP">SMP</option>
          <option value="SMA">SMA/SMK Sederajat</option>
          <option value="D3">D3</option>
          <option value="S1">S1</option>
          <option value="S2">S2</option>
          <option value="S3">S3</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


<FormField
  control={formPersonal.control}
  name="major"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Jurusan</FormLabel>
      <FormControl>
        <Input
          {...field}
          disabled={formPersonal.formState.isSubmitting}
          placeholder="Masukkan jurusan"
          className="border-2 border-gray-100 shadow-sm"
          type="text"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

                  <FormField
                    control={formPersonal.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='Nomor Telepon'
                            className='border-2 border-gray-100 shadow-sm'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
  control={formPersonal.control}
  name="gender"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Jenis Kelamin</FormLabel>
      <FormControl>
        <select
          {...field}
          disabled={formPersonal.formState.isSubmitting}
          className="border-2 border-gray-100 shadow-sm rounded px-3 py-2 w-full"
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="laki-laki">Laki-laki</option>
          <option value="perempuan">Perempuan</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
                </div>
                <div className='space-y-4'>
                  <FormField
                    control={formPersonal.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='Alamat Anda'
                            className='border-2 border-gray-100 shadow-sm'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPersonal.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kota</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='Kota Anda'
                            className='border-2 border-gray-100 shadow-sm'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPersonal.control}
                    name='about'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tentang Anda</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='Tentang Anda'
                            className='border-2 border-gray-100 shadow-sm h-[216px]'
                            
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPersonal.control}
                    name='birthDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Lahir Anda</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                            disabled={formPersonal.formState.isSubmitting}
                            className='border-2 border-gray-100 shadow-sm'
                            type='date'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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

      {/* section Interets data */}
      <Card className='shadow-lg'>
        <CardHeader>
          <p className='text-lg font-semibold text-green-700 mb-4'>
            Edit Minat Anda
          </p>
          {errorMessageInterests && (
            <FormError message={errorMessageInterests} />
          )}
          {successMessageInterests && (
            <FormSuccess message={successMessageInterests} />
          )}
        </CardHeader>

        <CardContent>
          <Form {...formInterests}>
            <form
              onSubmit={formInterests.handleSubmit(onSubmitInterests)}
              className='space-y-6'
            >
              <div className='mb-4 flex justify-between'>
                <p className='text-md font-medium text-gray-700 mb-4'>Minat</p>
                <Button type='submit' disabled={isPending}>
                  Simpan Perubahan
                </Button>
              </div>
              <div>
                <FormField
                  control={formInterests.control}
                  name='interests'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tambahkan Minat Anda</FormLabel>
                      {/* Input untuk menambahkan skill manual */}
                      <FormControl>
                        <Input
                          placeholder='Tulis disini dan tekan enter untuk menambahkan minat anda'
                          disabled={isPending}
                          onKeyDown={(e) => {
                            if (
                              e.key === 'Enter' &&
                              e.currentTarget.value.trim() !== ''
                            ) {
                              const newSkill = e.currentTarget.value.trim()
                              if (!field.value?.includes(newSkill)) {
                                field.onChange([
                                  ...(field.value || []),
                                  newSkill,
                                ])
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
       {/* section resume data */}
       <Card className='shadow-lg'>
        <CardHeader>
          <p className='text-lg font-semibold text-green-700 mb-4'>
            Edit Resume Anda
          </p>
          {errorMessageResume && <FormError message={errorMessageResume} />}
          {successMessageResume && (
            <FormSuccess message={successMessageResume} />
          )}
        </CardHeader>

        <CardContent>
          <Form {...formResume}>
            <form
              onSubmit={formResume.handleSubmit(onSubmitResume)}
              className='space-y-6'
            >
              <div className='mb-4 flex justify-between'>
                <p className='text-md font-medium text-gray-700 mb-4'>
                  Personal Information
                </p>
                <Button type='submit' disabled={isPending}>
                  Simpan Perubahan
                </Button>
              </div>
              <div>
                <FormField
                  control={formResume.control}
                  name='resume'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={formResume.formState.isSubmitting}
                          placeholder='Resume Anda'
                          className='border-2 border-gray-100 shadow-sm h-[216px]'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='text-center pt-6 border-t'>
          <Link
            href='/dashboard'
            className='text-green-600 hover:text-green-700 font-medium'
          >
            Back to Dashboard
          </Link>
        </CardFooter>
      </Card>
      {/* section Skills data */}
      <Card className='shadow-lg'>
        <CardHeader>
          <p className='text-lg font-semibold text-green-700 mb-4'>
            Edit Keahlian Anda
          </p>
          {errorMessageSkills && <FormError message={errorMessageSkills} />}
          {successMessageSkills && (
            <FormSuccess message={successMessageSkills} />
          )}
        </CardHeader>

        <CardContent>
          <Form {...formSkills}>
            <form
              onSubmit={formSkills.handleSubmit(onSubmitSkills)}
              className='space-y-6'
            >
              <div className='mb-4 flex justify-between'>
                <p className='text-md font-medium text-gray-700 mb-4'>Skils</p>
                <Button type='submit' disabled={isPending}>
                  Simpan Perubahan
                </Button>
              </div>
              <div>
                <FormField
                  control={formSkills.control}
                  name='skills'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tambahkan Keahlian Anda</FormLabel>
                      {/* Input untuk menambahkan skill manual */}
                      <FormControl>
                        <Input
                          placeholder='Tulis disini dan tekan enter untuk menambahkan Keahlian'
                          disabled={isPending}
                          onKeyDown={(e) => {
                            if (
                              e.key === 'Enter' &&
                              e.currentTarget.value.trim() !== ''
                            ) {
                              const newSkill = e.currentTarget.value.trim()
                              if (!field.value?.includes(newSkill)) {
                                field.onChange([
                                  ...(field.value || []),
                                  newSkill,
                                ])
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
    </div>
  )
}

export default EditProfileMember
