import { Badge } from '@/components/ui/badge';
import VerificationNumber from '@/lib/API/VerificationNumber';
import { useEffect, useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import clsx from 'clsx';

export default function VerificationBadge({ protestId }: { protestId: string }) {
    const [verifiedNumber, setVerifiedNumber] = useState(0);
    const date = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const verifyNumber = async () => {
            const result = await VerificationNumber({
                protestId: protestId,
                date: date,
            });
            setVerifiedNumber(result.verifiedNum);
        };
        verifyNumber();
    }, []);

    const maxVerified = 5000;
    const baseZIndex = 10;
    const maxZIndex = 100;

    const dynamicZIndex = Math.min(maxZIndex, baseZIndex + (verifiedNumber / maxVerified) * maxZIndex);

    return (
        <div className={clsx('flex gap-1 text-[#D44646] items-center', ` z-${dynamicZIndex}`)}>
            <IoPerson />
            <Badge variant={'destructive'}>{verifiedNumber}</Badge>
        </div>
    );
}
