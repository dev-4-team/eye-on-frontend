'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  children: React.ReactNode;
}

const ModalWrapper = ({ children }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
      if (!open) {
        router.back();
      }
    },
    [router],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden break-words bg-white rounded-lg shadow-lg p-2 sm:p-4 md:p-6'>
        <DialogHeader className='hidden'>
          <DialogTitle>Protest detail dialog</DialogTitle>
          <DialogDescription>Protest detail dialog</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;
