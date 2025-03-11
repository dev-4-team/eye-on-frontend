import { Badge } from '@/components/ui/badge';
import VerificationNumber from '@/lib/API/VerificationNumber';
import { useEffect, useState } from 'react';
import { IoPerson } from 'react-icons/io5';

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

    return (
        <div className='flex gap-1 text-[#D44646] items-center'>
            <IoPerson />
            <Badge variant={'destructive'} className=''>
                {verifiedNumber}
            </Badge>
        </div>
    );
}
