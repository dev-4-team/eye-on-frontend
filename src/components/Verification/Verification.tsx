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

export default function Verification({ paramId }: { paramId: string }) {
    const [agreed, setAgreed] = useState(false);
    const [open, setOpen] = useState(false);
    const [verificationResult, setVerificationResult] = useState<VerificationResponse | null>(null);
    const { curLocation, isLoading, errorMsg } = useGeoLocation(agreed);
    const accessToken = useUserInfo((state) => state.userInfo.accessToken);
    const onVerificationClick = () => {
        if (!accessToken)
            window.location.replace(`${process.env.NEXT_PUBLIC_LOCAL_DEV_URL}/oauth2/authorization/kakao`);
        else setOpen(true);
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

    if (agreed && errorMsg) {
        return <div>{errorMsg}</div>;
    }

    return (
        <div className='w-full flex flex-col items-center'>
            {/* {verificationResult ? (
                <Button variant={'signature'} size={'sm'} onClick={onVerificationClick}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <div>인증하기</div>}
                </Button>
            ) : (
                <Button disabled variant={'signature'} size={'sm'} onClick={onVerificationClick}>
                    인증완료
                </Button>
            )} */}
            <Button variant={'signature'} className='w-full' onClick={onVerificationClick}>
                {isLoading ? <Loader2 className='animate-spin' /> : <div>인증하기</div>}
            </Button>
            <Drawer open={open} onOpenChange={setOpen}>
                {open && (
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>위치동의 drawer</DrawerTitle>
                            <DrawerDescription>위치 인증 동의 여부를 묻습니다</DrawerDescription>
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
