
/** @type {import('next').NextConfig} */
const nextConfig = {


    compress: true,
    reactStrictMode: true,

    experimental: {
        missingSuspenseWithCSRBailout: false,
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    images: {
        minimumCacheTTL: 31536000,
        domains: [
            'image.tmdb.org',
            'lh3.googleusercontent.com',
            'images.remotePatterns.com',
            'img.youtube.com',
            'images.unsplash.com',
            'movie-project-gilt.vercel.app',
        ],
        loader: 'default',
        path: '/_next/image',

        deviceSizes: [320, 420, 768, 1024, 1200,],
        imageSizes: [
            320,
            420,
            768,
            300,
            1024,

        ],
        formats: ['image/avif', 'image/webp'],
        unoptimized: false

    },
    env: {
        NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    },

};

export default nextConfig;
