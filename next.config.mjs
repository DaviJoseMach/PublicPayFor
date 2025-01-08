/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'logospng.org',
      'encrypted-tbn0.gstatic.com',
      'static-00.iconduck.com',
      'companieslogo.com',
      'cdn1.iconfinder.com',
      'mira.au',
      'cdn-icons-png.flaticon.com',
      'avatars.githubusercontent.com'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
};

export default nextConfig;
