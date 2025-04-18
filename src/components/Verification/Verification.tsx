'use client';

import { useGeoLocation } from '@/hooks/useGeoLocation';
import VerifyLocation from '@/lib/API/VerifyLocation';
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
import useUserInfo from '@/hooks/useUserInfo';
import { toast } from 'sonner';
import { VerificationResponse } from '@/lib/API/VerifyLocation';
import { getIsMobile, isDesktopOS } from '@/lib/utils';
import { ProtestActionButton } from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function Verification({ paramId }: { paramId: string }) {
  const [agreed, setAgreed] = useState(false);
  const [open, setOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResponse | null>(null);
  const { curLocation, isLoading, errorMsg } = useGeoLocation(agreed);
  const accessToken = useUserInfo(state => state.userInfo.accessToken);
  const isMobile = getIsMobile() && !isDesktopOS();
  const router = useRouter();

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

  useEffect(() => {
    if (verificationResult?.success === true) {
      router.replace(`/verified`);
    }
  }, [verificationResult]);

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
