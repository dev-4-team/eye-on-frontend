'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Login() {
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
