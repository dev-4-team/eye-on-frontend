'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCallback } from 'react';

export const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
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
      <DialogContent className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4/5 max-w-lg bg-white rounded-lg shadow-lg overflow-y-auto'>
        <DialogHeader className='hidden'>
          <DialogTitle>Protest detail dialog</DialogTitle>
          <DialogDescription>Protest detail dialog</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
