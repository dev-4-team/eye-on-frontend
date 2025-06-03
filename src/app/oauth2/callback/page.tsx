'use client';

import { Suspense } from 'react';
import Login from '@/components/Login/Login';

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <Login />
    </Suspense>
  );
}
