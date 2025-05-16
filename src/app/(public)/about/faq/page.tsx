'use client'

import React from 'react'

const faqs = [
  {
    question: 'Apa itu Career Center Unila?',
    answer: 'Career Center Unila adalah layanan yang disediakan oleh Universitas Lampung untuk membantu mahasiswa dan alumni dalam pengembangan karier, pencarian kerja, magang, dan pelatihan kerja.'
  },
  {
    question: 'Siapa saja yang bisa menggunakan layanan Career Center?',
    answer: 'Layanan Career Center dapat digunakan oleh mahasiswa aktif dan alumni Universitas Lampung.'
  },
  {
    question: 'Bagaimana cara mendaftar lowongan pekerjaan?',
    answer: 'Kamu bisa mendaftar lowongan dengan login ke portal Career Center, memilih lowongan yang tersedia, dan mengikuti instruksi pendaftaran yang tertera.'
  },
  {
    question: 'Apakah Career Center menyediakan pelatihan atau seminar?',
    answer: 'Ya, kami rutin mengadakan seminar, pelatihan soft skill, dan workshop yang mendukung kesiapan karier mahasiswa dan alumni.'
  },
  {
    question: 'Bagaimana cara menghubungi tim Career Center?',
    answer: 'Kamu dapat menghubungi kami melalui email di careercenter@unila.ac.id atau datang langsung ke kantor Career Center di kampus Unila.'
  }
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">FAQ - Career Center Unila</h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{faq.question}</h2>
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
