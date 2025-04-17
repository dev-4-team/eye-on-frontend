'use client';

import { useGeoLocation } from '@/hooks/useGeoLocation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { toast } from 'sonner';
import { getIsMobile, isDesktopOS } from '@/lib/utils';
import { ProtestActionButton } from '@/components/Button';
import { getVerificationResponse, getVerifyLocation } from '@/api/verification';
import { useUserInfoStore } from '@/store/useUserInfoStore';

export default function Verification({ paramId }: { paramId: string }) {
  const [agreed, setAgreed] = useState(false);
  const [open, setOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState<getVerificationResponse | null>(
    null,
  );
  const { curLocation, isLoading, errorMsg } = useGeoLocation(agreed);
  const accessToken = useUserInfoStore(state => state.userInfo.accessToken);
  const isMobile = getIsMobile() && !isDesktopOS();

  const onVerificationClick = () => {
    if (!isMobile) {
      alert('모바일에서만 인증이 가능합니다.');
      return;
    }
    if (!accessToken)
      window.location.replace(
        `${process.env.NEXT_PUBLIC_LOCAL_DEV_URL}/oauth2/authorization/kakao`,
      );
    else setOpen(true);
    setOpen(true);
  };

  const handleAgree = () => {
    setAgreed(true);
    setOpen(false);
  };

  useEffect(() => {
    if (!agreed || !curLocation) return;

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
    };

    const verifyUserLocation = async () => {
      const result = await VerifyLocation({
        paramId: paramId,
        longitude: curLocation.longitude,
        latitude: curLocation.latitude,
        accessToken: accessToken,
      });
      setVerificationResult(result);
      toast(result.message);
    };
    verifyUserLocation();
  }, [agreed, curLocation]);

  if (agreed && errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <div className="w-['45%'] flex flex-col items-center max-w-md">
      <ProtestActionButton variant={'signature'} className='w-full' onClick={onVerificationClick}>
        {isLoading ? <Loader2 className='animate-spin' /> : <div>시위참여 인증하기</div>}
      </ProtestActionButton>
      <Drawer open={open} onOpenChange={setOpen}>
        {open && (
          <DrawerContent>
            <DrawerHeader className='p-0 flex items-center justify-center flex-col text-center'>
              <DrawerTitle>위치동의 drawer</DrawerTitle>
              <DrawerDescription className='whitespace-pre-line text-center'>
                <span className='text-center'>
                  시위 참여 인증을 위해 현재 위치 정보 사용 동의를 눌러주세요.
                </span>
                <br />
                <span className='text-center'>
                  아래의 정보만 부정인증 방지를 위해 저장되며, 다음날 00시에 삭제됩니다.
                </span>
              </DrawerDescription>
            </DrawerHeader>
            <div className='p-4 flex justify-center gap-4'>
              <Button variant={'signature'} onClick={handleAgree}>
                동의
              </Button>
              <DrawerClose asChild>
                <Button variant='outline'>취소</Button>
              </DrawerClose>
            </div>
            <DrawerFooter className='hidden'>footer</DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </div>
  );
}
