/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: ['image.tmdb.org', 'lh3.googleusercontent.com', 'images.remotePatterns', 'images.remotePatterns.com'],

    },
    env: {
        API_KEY: process.env.API_KEY,
    },
};

export default nextConfig;
