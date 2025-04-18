import { IoPerson } from 'react-icons/io5';
import { Badge } from '@/components/ui/badge';

interface Props {
  verifiedNumber: number;
}

const VerificationBadge = ({ verifiedNumber }: Props) => {
  return (
    <div className={'flex gap-1 text-[#D44646] items-center'}>
      <IoPerson />
      <Badge variant={'destructive'}>{verifiedNumber}</Badge>
    </div>
  );
};

export default VerificationBadge;
