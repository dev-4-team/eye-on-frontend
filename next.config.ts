import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return [
            {
                source: '/api/kakao',
                destination: 'http://localhost:8080/oauth2/authrization/kakao',
            },
        ];
    },
};

export default nextConfig;
