'use client'

import { Button } from '@/components/ui/button'
import { CardWrapper } from '../card-wrapper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormSuccess } from '../form-succsess'
import { FormError } from '../form-error'
import { Input } from '@/components/ui/input'
import { BeatLoader } from 'react-spinners'
import { userSchema } from '@/lib/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { registerAdmin } from '@/actions/register'

const RegisterAdminForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: 'ADMIN',
      username: '',
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }
  const handleSubmit = (data: z.infer<typeof userSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    startTransition(() => {
      setIsPending(true)
      // todo implementation
      registerAdmin(data).then((res) => {
        setIsPending(false)
        setSuccessMessage(res?.success ?? '')
        setErrorMessage(res?.error ?? '')
      })
    })
  }
  return (
    <CardWrapper
  headerLabel='Daftar'
  description='Isi formulir di bawah ini untuk membuat akun'
  paragraphSwitchButton='Sudah punya akun? '
  switchButtonLabel='Masuk'
  switchButtonHref='/login'
>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <div className='space-y-6'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder='Masukkan Username'
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
              name='fullname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder='Masukkan nama lengkap kamu'
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder='Masukkan alamat email'
                      className='border-2 border-gray-100 shadow-sm'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='relative'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='********'
                        className='border-2 border-gray-100 shadow-sm'
                        type={showPassword ? 'text' : 'password'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-2 top-3/4 -translate-y-1/2'
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <EyeOffIcon className='h-4 w-4' />
                ) : (
                  <EyeIcon className='h-4 w-4' />
                )}
              </Button>
            </div>
            <div className='relative'>
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='********'
                        className='border-2 border-gray-100 shadow-sm'
                        type={showPassword ? 'text' : 'password'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-2 top-3/4 -translate-y-1/2'
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <EyeOffIcon className='h-4 w-4' />
                ) : (
                  <EyeIcon className='h-4 w-4' />
                )}
              </Button>
            </div>
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
                  Processing...
                </div>
              ) : (
                'Daftar'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterAdminForm
