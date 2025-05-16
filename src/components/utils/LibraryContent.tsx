import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const LibraryContent = () => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {[
        'Kategori Lowongan',
        'Bidang Industri',
        'Kota',
        'Skills',
        'Institusi Pendidikan',
        'Jurusan',
      ].map((library) => (
        <Card key={library}>
          <CardHeader>
            <CardTitle>{library}</CardTitle>
            <CardDescription>
              Kelola data {library.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className='rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700'>
              Tambah Data
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default LibraryContent
