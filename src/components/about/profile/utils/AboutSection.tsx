import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GraduationCapIcon } from 'lucide-react'

const AboutSection = () => {
  return (
    <Card className='overflow-hidden'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <GraduationCapIcon className='h-6 w-6' />
          Tentang Kami
        </CardTitle>
        <CardDescription>
          Mengenal lebih dekat UPT Pengembangan Karir dan Kewirausahaan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type='single' collapsible>
          <AccordionItem value='description'>
            <AccordionTrigger>Deskripsi</AccordionTrigger>
            <AccordionContent>
              <p className='leading-7 text-muted-foreground'>
                UPT Pengembangan Karir dan Kewirausahaan adalah unit kerja yang
                bertujuan untuk membantu penyerapan lulusan oleh dunia kerja,
                mempunyai tugas menyiapkan lulusan sesuai dengan kompetensi, dan
                menumbuhkan minat serta budaya kewirausahaan mahasiswa dan
                alumni.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='functions'>
            <AccordionTrigger>Fungsi Kami</AccordionTrigger>
            <AccordionContent>
              <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
                <li>
                  Perencanaan, pelaksanaan, pengendalian, dan pelaporan
                  penelusuran dan pendataan lulusan (tracer study).
                </li>
                <li>
                  Perencanaan, pelaksanaan, pengendalian, dan pelaporan
                  pembinaan mahasiswa melalui pelatihan untuk meningkatkan
                  kewirausahaan.
                </li>
                <li>
                  Perencanaan, pelaksanaan, dan pengendalian perekrutan,
                  pembinaan, dan konsultasi karir.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default AboutSection
