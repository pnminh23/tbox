/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['phimimg.com', 'phimapi.com', 'bizweb.dktcdn.net'], // Thêm domain ảnh API
    },
    reactStrictMode: true,
};

module.exports = nextConfig;
