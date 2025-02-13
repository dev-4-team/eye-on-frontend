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

    try {
        const response = await fetch(`${SERVER_URL}/api/protest/${paramId}/participate/verify`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJleWUtb24iLCJpYXQiOjE3MzkwNjcxMDQsInN1YiI6IjEiLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MjA5OTA2NzEwNH0.vMA_V9j_7-B-GDkk_Cwkr4mXgCJ9U-5lB7y0sxYtiXE`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ longitude, latitude }),
        });
        if (!response.ok) {
            throw new Error('서버 요청 실패');
        }
        const verification = await response.json();
        return { success: verification.success, message: verification.message };
    } catch (error) {
        console.error('verify location 에러: ', error);
        return { success: false, message: '인증 오류' };
    }
}
