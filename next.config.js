/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
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
