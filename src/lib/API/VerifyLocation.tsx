export type VerificationResponse = {
  success: boolean;
  message: string;
  status?: number;
  code?: string;
};

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
}): Promise<VerificationResponse> {
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

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message,
      };
    }

    switch (data.code) {
      case 'PROTEST_422_1':
        return {
          success: false,
          message: '현재 위치가 시위 참여 가능 범위를 벗어났습니다',
          status: data.status,
          code: data.code,
        };
      case 'PROTEST_400_1':
        return {
          success: false,
          message: '존재하지 않는 시위입니다',
          status: data.status,
          code: data.code,
        };
      case 'PROTEST_409_1':
        return {
          success: false,
          message: '한 개의 시위에 중복 인증은 불가능합니다',
          status: data.statis,
          code: data.code,
        };
      default:
        return {
          success: false,
          message: data.message || '알 수 없는 오류가 발생했습니다',
          status: data.status,
          code: data.code,
        };
    }
  } catch (error) {
    console.error('verify location 에러: ', error);
    return {
      success: false,
      message: '서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.',
    };
  }
}
