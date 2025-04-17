'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserInfoStore } from '@/store/useUserInfoStore';

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUserInfo } = useUserInfoStore();

  useEffect(() => {
    const previous_page = localStorage.getItem('previous_page');
    const accessToken = searchParams.get('access_token');

    if (accessToken) {
      setUserInfo({ accessToken });
      router.replace('/');

      setTimeout(() => {
        router.push(previous_page!);
      }, 200);
    } else {
      console.error('Access token not found');
    }
  }, []);

  return <div>로그인 처리 중..</div>;
};

export default Login;
