'use client'

import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-succsess'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { changePassword } from '@/actions/change-password'
import { CardWrapper } from '../card-wrapper'

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const token = useSearchParams().get('token')

  const onSubmitForm = (data: z.infer<typeof resetPasswordSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      changePassword(data, token)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
        .catch(() => {
          setError('Terjadi kesalahan!')
        })
    })
  }
  return (
    <CardWrapper
      headerLabel='Reset Password'
      description='Reset Password Anda'
      paragraphSwitchButton='Pastikan Anda telah mereset password Anda'
      switchButtonLabel='Kembali ke Login'
      switchButtonHref='/login'
    >
      <Form {...form}>
        <form
          action=''
          onSubmit={form.handleSubmit(onSubmitForm)}
          className='space-y-6 flex flex-col gap-4'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='********'
                      type='password'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button
            variant={'default'}
            className='w-full text-center mx-auto'
            type='submit'
            disabled={isPending}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default ResetPasswordForm
