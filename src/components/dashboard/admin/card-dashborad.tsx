import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

interface DashboardCardProps {
  title: string
  description: string
  content: number
  href: string
}

const DasboardCard = ({
  title,
  description,
  content,
  href,
}: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-3xl font-bold'>{content}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className='w-full bg-green-200 hover:bg-green-600 hover:text-white'
          variant='outline'
        >
          <Link href={href}>Lihat Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default DasboardCard
