import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Location } from '@/types/location';
import { useUserInfoStore } from '@/store/useUserInfoStore';
import { getVerificationResponse, getVerifyLocation } from '@/api/verification';
import { useRouter } from 'next/navigation';

interface Props {
  agreed: boolean;
  curLocation?: Location;
  protestId: string;
}

export const useLocationVerification = ({ agreed, curLocation, protestId }: Props) => {
  const [verificationResult, setVerificationResult] = useState<getVerificationResponse | null>(
    null,
  );

  const router = useRouter();

  const accessToken = useUserInfoStore(state => state.userInfo.accessToken);

  useEffect(() => {
    if (!agreed || !curLocation || !accessToken || !protestId) return;
    const verifyUserLocation = async () => {
      const result = await VerifyLocation({
        paramId: protestId,
        longitude: curLocation.longitude,
        latitude: curLocation.latitude,
        accessToken: accessToken,
      });
      setVerificationResult(result);
      toast(result.message);
    };
    verifyUserLocation();
  }, [agreed, curLocation, accessToken, protestId]);

  useEffect(() => {
    if (verificationResult?.success === true) {
      sessionStorage.setItem('fromValidRoute', 'true');
      router.replace(`/verified`);
    } else if (verificationResult?.success === false) {
      sessionStorage.removeItem('fromValidRoute');
      router.replace(`/protest/${protestId}`);
    }
  }, [verificationResult]);

  const VerifyLocation = async ({
    paramId,
    longitude,
    latitude,
    accessToken,
  }: {
    paramId: string;
    longitude: number;
    latitude: number;
    accessToken: string;
  }): Promise<{ success: boolean; message: string; status?: number; code?: string }> => {
    try {
      const data = await getVerifyLocation({ paramId, longitude, latitude, accessToken });

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
            status: data.status,
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
  };
};
