'use client';

export default function KakaoLogin() {
    const onLoginClick = async () => {
        // const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
        const response = await fetch('/api/kakao');

        if (!response.ok) {
            console.error('오류:', response.status);
            return <div>오류 발생</div>;
        }

        const authorizationHeader = response.headers.get('Authorization');

        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const accessToken = authorizationHeader.split(' ')[1];
            console.log('Access Token: ', accessToken);
            localStorage.setItem('accessToken', accessToken);
        } else {
            console.error('Access token not found in header');
        }
    };

    return (
        <div className="absolute bottom-0 right-0 z-50">
            <button onClick={onLoginClick} className="p-5 bg-yellow-500">
                login
            </button>
        </div>
    );
}
