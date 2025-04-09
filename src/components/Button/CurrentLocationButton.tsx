import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { MdGpsFixed } from 'react-icons/md';

export const CurrentLocationButton = ({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <Button
      className='absolute bottom-7 left-3 z-30'
      variant={'gps'}
      size={'gps'}
      onClick={onClick}
    >
      {isLoading ? <Loader2 className='animate-spin' /> : <MdGpsFixed />}
    </Button>
  );
};
