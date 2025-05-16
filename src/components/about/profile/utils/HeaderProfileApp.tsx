import { Label } from '@/components/ui/label'

const HeaderProfileApp = () => {
  return (
    <header className='relative mb-4 flex w-full flex-1 flex-col items-center space-y-8 bg-[#025908] py-52 text-primary-foreground shadow-lg'>
      <div className='container w-full items-center'>
        <div className='flex flex-col gap-7 space-y-4 text-center'>
          <Label className='mb-4'>UPT PKK UNILA</Label>
          <h1 className='items-center text-3xl font-bold tracking-tight md:text-4xl'>
            UPT Pengembangan Karir dan Kewirausahaan
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-primary-foreground/80'>
            Membangun masa depan cemerlang melalui pengembangan karir dan jiwa
            kewirausahaan
          </p>
        </div>
      </div>
    </header>
  )
}

export default HeaderProfileApp
