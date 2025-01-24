'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const previous_page = localStorage.getItem('previous_page');

        const accessToken = searchParams.get('access_token');

        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
            router.replace(previous_page!);
        } else {
            console.error('Access token not found');
        }
    }, []);

    return <div>로그인 처리 중..</div>;
}
