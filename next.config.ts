/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'loremflickr.com', 'picsum.photos'], // Allow images from Unsplash
  },
}

// Export the configuration using ES module syntax
export default nextConfig
