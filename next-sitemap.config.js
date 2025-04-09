const config = {
  siteUrl: process.env.NEXT_PUBLIC_SERVER_DEV_URL || 'https://eye-on.kr/',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/oauth2/*'],
  additionalPaths: async config => {
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

      const paths = [
        {
          loc: '/',
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 1.0,
        },
        ...protests.map(protest => ({
          loc: `/protests/${protest.id}`,
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
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

module.exports = config;
