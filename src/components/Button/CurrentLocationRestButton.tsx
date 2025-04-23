import { Button } from '@/components/ui/button';
import { BiReset } from 'react-icons/bi';

interface Props {
  onClick: () => void;
}
const CurrentLocationRestButton = ({ onClick }: Props) => {
  return (
    <Button
      className='absolute bottom-20 left-3 z-30'
      variant={'reset'}
      size={'gps'}
      onClick={onClick}
    >
      <BiReset />
    </Button>
  );
};

export default CurrentLocationRestButton;
