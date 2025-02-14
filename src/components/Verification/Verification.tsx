'use client';

import { useGeoLocation } from '@/hooks/useGeoLocation';
import VerifyLocation from '@/lib/API/VerifyLocation';
import { useEffect, useState } from 'react';

interface VerificationResult {
    success: boolean;
    message: string;
}

export default function Verification({ paramId }: { paramId: string }) {
    const [agreed, setAgreed] = useState(false);
    const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
    const { curLocation, isLoading, errorMsg } = useGeoLocation(agreed);
    const onVerificationClick = () => {
        console.log('동의한대');
        setAgreed(true);
    };

    useEffect(() => {
        if (!agreed || !curLocation) return;

        const verifyUserLocation = async () => {
            const result = await VerifyLocation({
                paramId: paramId,
                longitude: curLocation.longitude,
                latitude: curLocation.latitude,
            });
            setVerificationResult(result);
        };
        verifyUserLocation();
    }, [agreed, curLocation]);

    if (agreed && isLoading) {
        return <div>Loading...</div>;
    }

    if (agreed && errorMsg) {
        return <div>{errorMsg}</div>;
    }

    console.log(verificationResult);

    return (
        <div>
            <button onClick={onVerificationClick}>인증하기</button>
        </div>
    );
}
