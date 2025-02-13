import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { GiHamburgerMenu } from 'react-icons/gi';
import ProtestCard from './protest-card';
import ProtestInfos from '@/lib/API/ProtestInfos';
import { ProtestData } from '@/types';
import { useEffect } from 'react';

export default async function ProtestList() {
    const protests = await ProtestInfos({ date: '123' });
    console.log(protests);

    return (
        <div>
            <Sheet>
                <SheetTrigger className='absolute top-4 right-0 p-2 rounded-s-md bg-amber-500 text-2xl text-background-white z-10'>
                    <GiHamburgerMenu />
                </SheetTrigger>
                <SheetContent className='w-[80%] p-3 bg-transparent border-transparent overflow-auto'>
                    <SheetHeader className='mt-11 gap-1 '>
                        <SheetTitle className='hidden'>ProtestList</SheetTitle>
                        <SheetDescription className='hidden'>ProtestList</SheetDescription>
                        {protests?.map((protest: ProtestData, idx: number) => (
                            <ProtestCard key={idx} {...protest} />
                        ))}
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}
