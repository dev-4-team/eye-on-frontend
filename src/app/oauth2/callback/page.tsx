'use client';

import Login from '@/components/Login/Login';
import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <Login />
        </Suspense>
    );
}
