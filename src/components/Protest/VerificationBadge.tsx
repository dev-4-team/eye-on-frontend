import { Badge } from '@/components/ui/badge';
import { IoPerson } from 'react-icons/io5';



export const VerificationBadge = ({ verifiedNumber }: { verifiedNumber: number }) => {
    return (
        <div className={'flex gap-1 text-[#D44646] items-center'}>
            <IoPerson />
            <Badge variant={'destructive'}>{verifiedNumber}</Badge>
        </div>
    );
};
