import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChartIcon, GraduationCapIcon, UsersIcon } from 'lucide-react'

const ActivitiesSection = () => {
  const activities = [
    {
      title: 'Pendataan',
      description:
        'Perencanaan, pelaksanaan, pengendalian, dan pelaporan penelusuran dan pendataan lulusan.',
      icon: <BarChartIcon className='h-6 w-6' />,
      color: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      title: 'Menyiapkan Alumni',
      description:
        'Menyiapkan lulusan untuk dapat berkompetisi di dunia kerja, baik sebagai pelaku usaha ataupun sebagai pelaksana.',
      icon: <GraduationCapIcon className='h-6 w-6' />,
      color: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'Menyukseskan Program',
      description:
        'Membantu program pemerintah dalam rangka memetakan dan menyelaraskan kebutuhan dunia kerja dengan pendidikan tinggi di Indonesia.',
      icon: <UsersIcon className='h-6 w-6' />,
      color: 'bg-purple-100 dark:bg-purple-900',
    },
  ]
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      {activities.map((activity, index) => (
        <Card
          key={index}
          className='group transition-all duration-300 hover:shadow-lg'
        >
          <CardHeader>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg ${activity.color} mb-4`}
            >
              {activity.icon}
            </div>
            <CardTitle className='text-lg'>{activity.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm leading-relaxed text-muted-foreground'>
              {activity.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ActivitiesSection
