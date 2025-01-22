import Script from 'next/script';
import './globals.css';
import { ReactNode } from 'react';
import HeightSetter from '@/components/HeightSetter';

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: ReactNode;
}>) {
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
    return (
        <html lang="kr">
            <body>
                <Script
                    strategy="beforeInteractive"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`}
                ></Script>
                <HeightSetter>
                    <main>{children}</main>
                </HeightSetter>
                {modal}
            </body>
        </html>
    );
}
