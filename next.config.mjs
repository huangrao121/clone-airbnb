/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'res.cloudinary.com',
        port: '',
      }
    ]
  },
  output:"standalone"
};

export default nextConfig;
