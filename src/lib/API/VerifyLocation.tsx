export default async function VerifyLocation({
    paramId,
    longitude,
    latitude,
    accessToken,
}: {
    paramId: string;
    longitude: number;
    latitude: number;
    accessToken: string;
}) {
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
    try {
        const response = await fetch(`${SERVER_URL}/api/protest/${paramId}/participate/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ latitude, longitude }),
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
