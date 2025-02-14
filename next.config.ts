import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/login",
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/egi/:path", // 프록시 경로
                destination: "10.10.10.175/:path", // API 서버 URL
            },
        ];
    },
};

export default nextConfig;
