import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChevronRightIcon,
  InstagramIcon,
  MessageSquareIcon,
  YoutubeIcon,
} from 'lucide-react'
import Link from 'next/link'

const ContactSection = () => {
  const socialLinks = [
    {
      platform: 'YouTube',
      url: 'https://www.youtube.com/@cced_unila',
      icon: <YoutubeIcon className='h-5 w-5' />,
      color: 'hover:bg-red-100 dark:hover:bg-red-900',
    },
    {
      platform: 'WhatsApp',
      url: 'https://api.whatsapp.com/send?phone=6285769510880&text=Tabik%20Pun!!!%20Halo%20Ibu%20Shinta,%20perkenalkan%20Nama%20Saya%20',
      icon: <MessageSquareIcon className='h-5 w-5' />,
      color: 'hover:bg-green-100 dark:hover:bg-green-900',
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/cced_unila',
      icon: <InstagramIcon className='h-5 w-5' />,
      color: 'hover:bg-pink-100 dark:hover:bg-pink-900',
    },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MessageSquareIcon className='h-6 w-6' />
          Hubungi Kami
        </CardTitle>
        <CardDescription>
          Terhubung dengan kami melalui berbagai platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 md:grid-cols-3'>
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className='block'
            >
              <Button
                variant='outline'
                className={`group w-full justify-between ${link.color} transition-all duration-300`}
              >
                <span className='flex items-center gap-2'>
                  {link.icon}
                  {link.platform}
                </span>
                <ChevronRightIcon className='h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactSection
