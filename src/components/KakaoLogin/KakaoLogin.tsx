'use client';

import { useRouter } from 'next/navigation';
import { useUserInfoStore } from '@/store/useUserInfoStore';

const KakaoLogin = () => {
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
    <div>
      {accessToken === '' ? (
        <button onClick={onLoginClick} className=' text-[#D44646] text-xl sm:text-2xl md:text-3xl'>
          login
        </button>
      ) : (
        <button onClick={onLogoutClick} className='text-[#D44646] text-xl sm:text-2xl md:text-3xl'>
          logout
        </button>
      )}
    </div>
  );
};

export default KakaoLogin;
