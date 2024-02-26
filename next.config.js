/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    experimental: {
        windowHistorySupport: true
    },
    productionBrowserSourceMaps: true, // For the curious
}

module.exports = nextConfig
