/** @type {import('next').NextConfig} */

const nextConfig = {
    compress: true,
    reactStrictMode: true,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: [
            'image.tmdb.org',
            'lh3.googleusercontent.com',
            'images.remotePatterns.com',
            'img.youtube.com',
            'images.unsplash.com',
        ],
        loader: 'default',
        path: '/_next/image',

        deviceSizes: [320, 420, 768, 1024, 1200,],
        imageSizes: [
            320,
            420,
            768,
            1024,
            1200,
            1920,
            2560,
            3840,
            5120,
            7680,

            921
        ], // Các kích thước hình ảnh được tối ưu hóa
        formats: ['image/avif', 'image/webp'],




    },
    env: {
        NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    },
};

export default nextConfig;
