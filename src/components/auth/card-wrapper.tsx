import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  description: string
  switchButtonLabel: string
  switchButtonHref: string
  paragraphSwitchButton: string
  size?: string
  className?: string
}

export const CardWrapper = ({
  children,
  headerLabel,
  description,
  switchButtonLabel,
  switchButtonHref,
  paragraphSwitchButton,
  size,
}: CardWrapperProps) => {
  return (
    <Card
      className={`w-fullbg-white p-4 my-16 ${!!size ? size : 'w-full max-w-2xl'} `}
    >
      <CardHeader className='space-y-1 flex flex-col gap-3 items-center mb-14 text-center'>
        <CardTitle className='mb-0 pb-0 font-semibold text-4xl text-[#025908]'>
          {headerLabel}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className='flex justify-center'>
        <p className='mx-0 mt-0 pt-0 text-sm text-gray-600'>
          {paragraphSwitchButton}
        </p>
        <Link
          href={switchButtonHref}
          className={`${buttonVariants({ variant: 'link' })} mx-0 p-0 text-sm text-green-500 hover:text-green-600`}
        >
          {switchButtonLabel}
        </Link>
      </CardFooter>
    </Card>
  )
}
