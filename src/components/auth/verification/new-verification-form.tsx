'use client'

import { newVerification } from '@/actions/new-verification'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-succsess'
import { CardWrapper } from '../card-wrapper'

const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing Token!')
      return
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something Went Wrong!')
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])
  return (
    <CardWrapper
      headerLabel='Verification Token'
      description='Verif Your Account'
      paragraphSwitchButton='Email successfully verified?'
      switchButtonLabel='Back to Login'
      switchButtonHref='/login'
    >
      <div className='flex flex-col items-center w-full justify-center'>
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        {!error && !success && (
          <BeatLoader size={30} color={'#025908'} className='my-4' />
        )}
      </div>
    </CardWrapper>
  )
}

export default NewVerificationForm
