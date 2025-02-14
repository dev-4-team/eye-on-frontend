'use client';

import useUserInfo from '@/hooks/useUserInfo';

export default function KakaoLogin() {
    const accessToken = useUserInfo((state) => state.userInfo.accessToken);

    const onLoginClick = async () => {
        const previous_page = window.location.href;
        localStorage.setItem('previous_page', previous_page);

        const LOCAL_DEV_URL = process.env.NEXT_PUBLIC_LOCAL_DEV_URL;

        window.location.replace(`${LOCAL_DEV_URL}/oauth2/authorization/kakao`);
    };

    console.log(accessToken);

    return (
        <div className="absolute top-0 right-0 z-50">
            {accessToken === '' ? (
                <button onClick={onLoginClick} className="p-2 text-[#D44646]">
                    login
                </button>
            ) : (
                <button onClick={onLoginClick} className="p-2 text-[#D44646]">
                    logout
                </button>
            )}
        </div>
    );
}
