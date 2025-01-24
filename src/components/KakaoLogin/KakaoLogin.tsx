'use client';

export default function KakaoLogin() {
    const onLoginClick = async () => {
        const previous_page = window.location.href;
        localStorage.setItem('previous_page', previous_page);

        const LOCAL_DEV_URL = process.env.NEXT_PUBLIC_LOCAL_DEV_URL;

        window.location.replace(`${LOCAL_DEV_URL}/oauth2/authorization/kakao`);
    };

    return (
        <div className="absolute bottom-0 right-0 z-50">
            <button onClick={onLoginClick} className="p-5 bg-yellow-500">
                login
            </button>
        </div>
    );
}
