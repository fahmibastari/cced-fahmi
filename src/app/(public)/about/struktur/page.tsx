'use client'

import React from 'react'

interface Member {
  name: string
  role: string
  image?: string
}

const members: Member[] = [
  {
    name: 'Dr. Andi Wijaya, M.Pd.',
    role: 'Ketua Career Center Unila',
  },
  {
    name: 'Siti Lestari, M.Psi.',
    role: 'Sekretaris',
  },
  {
    name: 'Rahmat Hidayat, M.T.',
    role: 'Koordinator Divisi Pelatihan & Pengembangan Karier',
  },
  {
    name: 'Fitriani, S.Psi., M.Psi.',
    role: 'Koordinator Divisi Konseling Karier',
  },
  {
    name: 'Ahmad Fauzan, M.M.',
    role: 'Koordinator Divisi Kemitraan & Hubungan Industri',
  },
  {
    name: 'Dewi Sartika, M.Kom.',
    role: 'Koordinator Divisi Tracer Study & Alumni',
  }
]

export default function StrukturPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
        Struktur Organisasi Career Center Unila
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold mb-4">
              {member.name.split(' ').map(w => w[0]).join('').substring(0, 2)}
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{member.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
