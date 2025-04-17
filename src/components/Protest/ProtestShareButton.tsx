'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { IoIosLink } from 'react-icons/io';

export const ProtestShareButton = ({ className }: { className?: string }) => {
  const [currentUrl, setCurrentUrl] = useState('');
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyUrl = () => {
    if (!currentUrl) return;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('클립보드에 복사되었습니다');
      })
      .catch(error => {
        console.error('클립보드 복사 실패!', error);
      });
  };

  return (
    <Button
      className={`w-9 bg-white text-black border-2 border-black rounded-full shadow-2xl flex items-center justify-center gap-2 ${className}`}
      onClick={handleCopyUrl}
    >
      <IoIosLink />
    </Button>
  );
};
