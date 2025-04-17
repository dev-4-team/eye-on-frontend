'use client';

import { useRouter } from 'next/navigation';
import { useUserInfoStore } from '@/store/useUserInfoStore';

export default function KakaoLogin() {
  const accessToken = useUserInfoStore(state => state.userInfo.accessToken);
  const { deleteUserInfo } = useUserInfoStore();
  const router = useRouter();

  const onLoginClick = async () => {
    const previous_page = window.location.href;

    if (!previous_page.includes('oauth2/callback')) {
      localStorage.setItem('previous_page', previous_page);
    }

    const LOCAL_DEV_URL = process.env.NEXT_PUBLIC_LOCAL_DEV_URL;

    window.location.replace(`${LOCAL_DEV_URL}/oauth2/authorization/kakao`);
  };

  const onLogoutClick = () => {
    deleteUserInfo();
    router.push('/');
  };

  return (
    <div className='absolute top-2 right-0 z-50'>
      {accessToken === '' ? (
        <button onClick={onLoginClick} className='p-2 text-[#D44646]'>
          login
        </button>
      ) : (
        <button onClick={onLogoutClick} className='p-2 text-[#D44646]'>
          logout
        </button>
      )}
    </div>
  );
}
