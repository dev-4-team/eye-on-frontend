import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { GiHamburgerMenu } from 'react-icons/gi';
import ProtestCard from './protest-card';
import ProtestInfos from '@/lib/API/ProtestInfos';
import { ProtestData } from '@/types';

export default async function ProtestList() {
    const date = new Date().toISOString().split('T')[0];
    const protests = await ProtestInfos({ date: date });
    return (
        <Sheet>
            <SheetTrigger className='absolute top-12 right-0 p-2 rounded-s-md bg-[#D44646] text-2xl text-background-white z-10'>
                <GiHamburgerMenu />
            </SheetTrigger>
            <SheetContent className='w-[80%] h-5 p-3 bg-transparent border-transparent '>
                <SheetHeader className='mt-11 gap-1 overflow-hidden'>
                    <SheetTitle className='hidden'>ProtestList</SheetTitle>
                    <SheetDescription className='hidden'>ProtestList</SheetDescription>
                    {protests?.map((protest: ProtestData, idx: number) => (
                        <ProtestCard key={idx} {...protest} />
                    ))}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
