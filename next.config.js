/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['phimimg.com', 'phimapi.com', 'bizweb.dktcdn.net'], // Thêm domain ảnh API
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '2911',
                pathname: '/uploads/**',
            },
        ],
    },
    env: {
        JWT_SECRET: process.env.JWT_SECRET,
    },
    reactStrictMode: true,
};

module.exports = nextConfig;
