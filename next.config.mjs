/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['image.tmdb.org', 'lh3.googleusercontent.com', 'images.remotePatterns'],
    },
    env: {
        API_KEY: process.env.API_KEY,
    },
};

export default nextConfig;
