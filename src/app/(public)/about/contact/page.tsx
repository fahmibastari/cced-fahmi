    'use client'

import React from 'react'

export default function KontakPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
        Kontak Career Center Unila
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Kontak Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informasi Kontak</h2>
          <p className="mb-2"><span className="font-semibold">Alamat:</span> Jl. Prof. Dr. Sumantri Brojonegoro No.1, Gedong Meneng, Bandar Lampung</p>
          <p className="mb-2"><span className="font-semibold">Telepon:</span> (0721) 123456</p>
          <p className="mb-2"><span className="font-semibold">Email:</span> careercenter@unila.ac.id</p>
          <p><span className="font-semibold">Jam Operasional:</span> Senin - Jumat, 08.00 - 16.00 WIB</p>

          {/* Google Maps */}
          <div className="mt-6">
            <iframe
              title="Career Center Unila Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63745.00652747078!2d105.20452928220164!3d-5.3763434478743135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c4cfb4da7c07%3A0x44ab84ab5a2d88a1!2sUniversitas%20Lampung!5e0!3m2!1sen!2sid!4v1712314123456"
              width="100%"
              height="250"
              className="rounded-lg border"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Form Kontak */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Formulir Kontak</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nama lengkap"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email aktif"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pesan</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Tulis pesan Anda di sini..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
