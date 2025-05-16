import { Button } from '@/components/ui/button'

const FooterProfileApp = () => {
  return (
    <footer className='mt-8 bg-primary/5 py-8 w-full'>
      <div className='container space-y-4 text-center'>
        <p className='text-sm text-muted-foreground'>
          &copy; 2024 UPT Pengembangan Karir dan Kewirausahaan
        </p>
        <div className='flex justify-center space-x-4'>
          <Button variant='ghost' size='sm'>
            Kebijakan Privasi
          </Button>
          <Button variant='ghost' size='sm'>
            Syarat & Ketentuan
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default FooterProfileApp
