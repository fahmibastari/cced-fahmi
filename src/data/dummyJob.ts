// import { Job } from '@prisma/client';

interface Job {
  companyLogo?: string
  company: string
  title: string
  location: string
  deadline: string
  salary?: string
  isBookmarked?: boolean
  image?: string
  requirements?: string[]
  skills?: string[]
  description?: string
}

export const dummyJobs: Job[] = [
  {
    companyLogo: 'https://github.com/shadcn.png',
    company: 'CV Nexus Technology',
    title: 'Fullstack Developer',
    location: 'Bandar Lampung',
    salary: 'Rp 15j - 20j',
    deadline: '7 Juni 2024',
    isBookmarked: false,
    image:
      'https://images.unsplash.com/photo-1731343887664-e82d73dcefa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
    requirements: [
      'Pengalaman minimal 2 tahun di bidang Fullstack Development',
      'Menguasai JavaScript, TypeScript, dan Node.js',
      'Pengalaman dengan framework React atau Next.js',
      'Mengerti konsep REST API dan GraphQL',
      'Dapat bekerja secara tim dan individu',
    ],
    skills: ['JavaScript', 'TypeScript', 'Node.js', 'React', 'Next.js'],
    description:
      'Posisi ini membutuhkan Fullstack Developer yang berpengalaman dalam mengembangkan aplikasi web menggunakan teknologi modern.',
  },
  {
    companyLogo: 'https://github.com/shadcn.png',
    company: 'PT Bank DKI',
    title: 'Teller',
    location: 'Bandar Lampung',
    salary: 'Gaji tidak ditampilkan',
    deadline: '21 Juni 2024',
    isBookmarked: false,
    image:
      'https://images.unsplash.com/photo-1731331203151-a7e914e02d23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8',
    requirements: [
      'Lulusan minimal D3 semua jurusan',
      'Memiliki kemampuan komunikasi yang baik',
      'Mampu mengoperasikan komputer dan Microsoft Office',
      'Teliti dan cekatan dalam bekerja',
      'Pengalaman minimal 1 tahun di posisi yang sama (diutamakan)',
    ],
    skills: ['Komunikasi', 'Microsoft Office', 'Pelayanan Nasabah'],
    description:
      'Sebagai Teller, Anda akan bertanggung jawab dalam melayani nasabah dengan baik serta melakukan transaksi keuangan dengan tepat.',
  },
  {
    companyLogo: 'https://github.com/shadcn.png',
    company: 'Superimpose Group',
    title: 'Creative Designer & Social Media Specialist',
    location: 'Bandar Lampung',
    salary: 'Rp 4j - 6,2j',
    deadline: '25 Juni 2024',
    isBookmarked: false,
    image:
      'https://images.unsplash.com/photo-1720048171527-208cb3e93192?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
    requirements: [
      'Pengalaman minimal 1 tahun dalam bidang desain grafis dan media sosial',
      'Menguasai software desain seperti Adobe Photoshop, Illustrator, dan Figma',
      'Memahami tren media sosial dan strategi konten',
      'Kreatif, inovatif, dan memiliki portofolio yang menarik',
      'Mampu bekerja dalam tim dan memenuhi deadline yang ketat',
    ],
    skills: ['Desain Grafis', 'Media Sosial', 'Adobe Photoshop', 'Figma'],
    description:
      'Kami mencari seorang Creative Designer yang mampu membuat konten kreatif dan menarik untuk berbagai platform media sosial.',
  },
]
