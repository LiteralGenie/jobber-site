/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    experimental: {
        windowHistorySupport: true
    }
}

module.exports = nextConfig
