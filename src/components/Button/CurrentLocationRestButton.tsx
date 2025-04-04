import { Button } from '@/components/ui/button';
import { BiReset } from 'react-icons/bi';

export const CurrentLocationRestButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button className='absolute bottom-20 left-3 z-30' variant={'reset'} size={'gps'} onClick={onClick}>
            <BiReset />
        </Button>
    );
};
