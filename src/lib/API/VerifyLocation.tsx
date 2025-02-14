export default async function VerifyLocation({
    paramId,
    longitude,
    latitude,
}: {
    paramId: string;
    longitude: number;
    latitude: number;
}) {
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await fetch(`${SERVER_URL}/api/protest/${paramId}/participate/verify`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ longitude, latitude }),
        });
        if (!response.ok) {
            console.log(response);
            throw new Error('서버 요청 실패');
        }
        const verification = await response.json();
        return { success: verification.success, message: verification.message };
    } catch (error) {
        console.error('verify location 에러: ', error);
        return { success: false, message: '인증 오류' };
    }
}
