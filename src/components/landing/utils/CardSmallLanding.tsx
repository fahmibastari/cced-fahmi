import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface CardSmallLandingProps {
  title: string
  description: string
  styleCard: string
  styleTitle: string
  styleDescription: string
}

const CardSmallLanding = ({
  title,
  description,
  styleCard,
  styleTitle,
  styleDescription,
}: CardSmallLandingProps) => {
  return (
    <div>
      <Card className={styleCard}>
        <CardHeader className={styleTitle}>{title}</CardHeader>
        <CardContent className={styleDescription}>{description}</CardContent>
      </Card>
    </div>
  )
}
export default CardSmallLanding
