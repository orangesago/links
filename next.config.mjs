/** @type {import("next").NextConfig} */
const nextConfig = {
    basePath: '/links',
    output: 'export',
    distDir: './dist',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
