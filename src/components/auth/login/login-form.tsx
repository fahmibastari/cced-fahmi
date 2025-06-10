'use client'

import { login } from '@/actions/login'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormSuccess } from '../form-succsess'
import { FormError } from '../form-error'
import { CardWrapper } from '../card-wrapper'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    startTransition(() => {
      setIsPending(true)
      login(data).then((data) => {
        setSuccessMessage(data?.success ?? '')
        setErrorMessage(data?.error ?? '')
        setIsPending(false)
      })
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <CardWrapper
        headerLabel="Selamat Datang!"
        description="Masuk menggunakan akun yang sudah kamu daftarkan"
        paragraphSwitchButton="Belum punya akun? "
        switchButtonLabel="Daftar"
        switchButtonHref="/register"
        className="max-w-md w-full"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="Masukkan alamat email"
                      type="email"
                      className="border-2 border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2 w-full">

<FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <div className="flex items-center w-[350px] space-x-2">
        <FormControl>
          <Input
            {...field}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="flex-grow" // input memenuhi sisa ruang
          />
        </FormControl>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleClickShowPassword}
          aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
        >
          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </Button>
      </div>
      <FormMessage />
    </FormItem>
  )}
/>


            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                Lupa Password?
              </Link>
            </div>

            {errorMessage && <FormError message={errorMessage} />}
            {successMessage && <FormSuccess message={successMessage} />}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting || isPending}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md shadow-sm transition"
            >
              {isPending ? 'Loading...' : 'Masuk'}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}