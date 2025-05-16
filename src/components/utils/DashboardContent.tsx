import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const DashboardContent = () => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <Card>
        <CardHeader>
          <CardTitle>Total Perusahaan</CardTitle>
          <CardDescription>Perusahaan terdaftar</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-bold'>1,234</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Lowongan</CardTitle>
          <CardDescription>Lowongan aktif</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-bold'>567</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Pelamar</CardTitle>
          <CardDescription>Pengguna terdaftar</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-bold'>8,901</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardContent
