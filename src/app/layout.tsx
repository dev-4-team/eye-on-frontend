import Script from 'next/script';
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';
import { Metadata } from 'next';

export const metadata: Metadata = {
    verification: {
        google: 'C7IMZBZEv09U7b7X4-rcEn7Fe1hpK5yE0EfGgNgxRPE',
    },
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: ReactNode;
    modal: ReactNode;
}>) {
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

    return (
        <html lang="kr">
            <body>
                {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
                )}
                <Header />
                <Script
                    strategy="lazyOnload"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`}
                />
                <Script strategy="lazyOnload" src="https://unpkg.com/heatmap.js" />
                <main>{children}</main>
                {modal}
                <Toaster />
                <Footer />
            </body>
        </html>
    );
}
