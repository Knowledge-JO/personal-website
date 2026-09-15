/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The project screenshots are PNGs in the 30-210 KB range; AVIF typically
    // halves them again over WebP for this kind of flat UI capture.
    formats: ["image/avif", "image/webp"],
  },
}

module.exports = nextConfig
