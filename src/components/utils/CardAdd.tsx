import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ReactNode } from 'react'

interface CardAddProps {
  title: string
  styleIcon: string
  styleButton: string
  buttonText: string
  icon: ReactNode
  HandleClick: (title: string) => void
}

const CardAdd = ({
  title,
  styleIcon,
  styleButton,
  buttonText,
  icon,
  HandleClick,
}: CardAddProps) => {
  return (
    <Card className='group transition-all duration-300 hover:shadow-lg'>
      <CardHeader>
        <CardTitle className='text-lg'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styleIcon}>{icon}</div>
      </CardContent>
      <CardFooter>
        <Button
          className={styleButton}
          onClick={() => {
            HandleClick(title)
          }}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardAdd
