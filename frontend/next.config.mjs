/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pubcdn.ivymoda.com",
            },
            {
                protocol: "https",
                hostname: "images.dmca.com",
            },
            {
                protocol: "https",
                hostname: "cotton4u.vn",
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: "https",
                hostname: "pagedone.io"
            }
        ]
    },
};

export default nextConfig;
