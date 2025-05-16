import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaFacebook, FaTwitter, FaMapMarkerAlt } from 'react-icons/fa'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white text-sm pt-16 pb-10 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & Deskripsi */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/LOGO-CCED.png"
              alt="Logo CCED"
              width={200}
              height={200}
              className="rounded-md"
            />
            {/* <h2 className="text-xl font-bold">CCED UNILA</h2> */}
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Pusat pengembangan karier & kewirausahaan Universitas Lampung. Platform resmi untuk pencari kerja dan perekrut di lingkungan UNILA.
          </p>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Hubungi Kami</h3>
          <ul className="space-y-2 text-neutral-300">
            <li className="flex items-center gap-2">
              <HiOutlineMail className="text-lg" />
              <Link href="mailto:fahmibastari549@gmail.com" className="hover:underline">fahmibastari549@gmail.com</Link>
            </li>
            <li className="flex items-center gap-2">
              <HiOutlinePhone className="text-lg" />
              <Link href="tel:+6281271662745" className="hover:underline">+62 812 7166 2745</Link>
            </li>
          </ul>
        </div>

        {/* Lokasi */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Alamat</h3>
          <div className="flex items-start gap-2 text-neutral-300">
            <FaMapMarkerAlt className="text-lg mt-1" />
            <p>
              UPT Pengembangan Karier & Kewirausahaan<br />
              Universitas Lampung
            </p>
          </div>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Ikuti Kami</h3>
          <div className="flex space-x-4 text-neutral-300">
            <Link href="https://www.instagram.com/" target="_blank" aria-label="Instagram" className="hover:text-white">
              <FaInstagram className="text-2xl" />
            </Link>
            <Link href="https://www.facebook.com/" target="_blank" aria-label="Facebook" className="hover:text-white">
              <FaFacebook className="text-2xl" />
            </Link>
            <Link href="https://twitter.com/" target="_blank" aria-label="Twitter" className="hover:text-white">
              <FaTwitter className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-700 mt-12 pt-6 text-center text-neutral-500">
        © 2025 CCED Universitas Lampung. Semua Hak Dilindungi. | <Link href="/privacy" className="hover:underline">Kebijakan Privasi</Link>
      </div>
    </footer>
  )
}

export default Footer
