import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { GiHamburgerMenu } from 'react-icons/gi';
import ProtestCard from '@/components/Protest/ProtestCard';
import { getProtestList } from '@/api/protest';
import type { Protest } from '@/types/protest';

const ProtestList = async () => {
  const protests = await getProtestList();
  return (
    <Sheet>
      <SheetTrigger className='fixed top-24 sm:top-16 md:top-32 lg:top-64 right-0 p-2 rounded-s-md bg-[#D44646] text-2xl text-background-white z-10'>
        <GiHamburgerMenu />
      </SheetTrigger>
      <SheetContent className='w-[80%] p-3 overflow-y-auto'>
        <SheetHeader className='gap-1'>
          <SheetTitle className='hidden'>ProtestList</SheetTitle>
          <SheetDescription className='hidden'>ProtestList</SheetDescription>
          {protests?.map((protest: Protest, idx: number) => <ProtestCard key={idx} {...protest} />)}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ProtestList;
