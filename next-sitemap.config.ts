import type { IConfig, ISitemapField } from 'next-sitemap';

const config: IConfig = {
    siteUrl: process.env.NEXT_PUBLIC_SERVER_DEV_URL || 'https://eye-on.kr/',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ['/oauth2/*'],
    additionalPaths: async (config) => {
        const date = new Date().toISOString().split('T')[0];
        const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;

        try {
            const response = await fetch(`${SERVER_URL}/api/protest?date=${date}`, {
                next: { revalidate: 3600 },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch protest data');
            }

            const protestsData = await response.json();
            const protests = protestsData.data;

            const paths: ISitemapField[] = [
                {
                    loc: '/',
                    lastmod: new Date().toISOString(),
                    changefreq: 'daily' as const,
                    priority: 1.0,
                },
                ...protests.map((protest: any) => ({
                    loc: `/protests/${protest.id}`,
                    lastmod: new Date().toISOString(),
                    changefreq: 'daily' as const,
                    priority: 0.7,
                })),
            ];

            return paths;
        } catch (error) {
            console.error('Error generating sitemap:', error);
            return [];
        }
    },
};

export default config;
