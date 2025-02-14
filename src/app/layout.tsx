import Script from 'next/script';
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: ReactNode;
    modal: ReactNode;
}>) {
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

    return (
        <html lang='kr'>
            <body>
                <Header />
                <Script
                    strategy='beforeInteractive'
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`}
                ></Script>
                <main>{children}</main>
                {modal}
                <Footer />
            </body>
        </html>
    );
}
